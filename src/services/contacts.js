import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  console.log('Contacts found:', contacts);
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  console.log('Contact found:', contact);
  return contact;
};
