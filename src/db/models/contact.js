import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          // Перевірка на валідність email
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} не є коректним email!`,
      },
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = model('contact', contactSchema);

export const ContactsCollection = model('contacts', contactSchema);
