import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// export const getAllContacts = async (page, perPage) => {
//   const skip = (page - 1) * perPage;
//   const data = await ContactsCollection.find().skip(skip).limit(perPage);
//   const totalItems = await ContactsCollection.countDocuments();

//   return { data, totalItems };
// };

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (filter.type) {
    query.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    query.where('isFavourite').equals(filter.isFavourite);
  }
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  try {
    const contact = await ContactsCollection.findById(contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    console.log('Contact found:', contact);
    return contact;
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    throw error;
  }
};

export const createContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  console.log('Contact created:', newContact);
  return newContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, updateData) => {
  try {
    const updatedContact = await ContactsCollection.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true },
    );
    if (!updatedContact) {
      throw new Error('Contact not found');
    }
    console.log('Contact updated:', updatedContact);
    return updatedContact;
  } catch (error) {
    console.error('Error updating contact by ID:', error);
    throw error;
  }
};
