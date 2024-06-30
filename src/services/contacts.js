import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async (page, perPage) => {
  const skip = (page - 1) * perPage;
  const data = await ContactsCollection.find().skip(skip).limit(perPage);
  const totalItems = await ContactsCollection.countDocuments();

  return { data, totalItems };
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
