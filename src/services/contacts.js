import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  console.log('Contacts found:', contacts);
  return contacts;
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
