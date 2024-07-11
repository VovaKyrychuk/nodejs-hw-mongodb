import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateId } from '../middlewares/validateId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.use('/:contactId', validateId('contactId'));
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
