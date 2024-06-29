import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  //   const contact = await getContactById(contactId);
  //   if (!contact) {
  //     next(createHttpError(404, 'Contact not found'));
  //     return;
  //   }
  const contact = await getContactById(contactId).catch((error) => {
    if (error.name === 'CastError') {
      next(createHttpError(404, 'Contact not found'));
    } else {
      next(error);
    }
  });

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
