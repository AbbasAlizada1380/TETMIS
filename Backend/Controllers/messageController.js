import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Message from '../models/MessageModel.js';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  const verificationToken = crypto.randomBytes(20).toString('hex');

  try {
    console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS );
    const savedMessage = await Message.create({ name, email, message, verificationToken });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `verification token is  ${verificationToken}`,
    });

    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving message.' });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;

  try {
    console.log(verificationCode);
    const message = await Message.findOne({ where: { verificationToken: verificationCode } });
    if (!message) return res.status(400).json({ message: 'Invalid or expired token.' });

    message.verified = true;
    await message.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Message',
      text: `New message from ${message.name} (${message.email}): ${message.message}`,
    });

    res.status(200).json({ message: 'Your message has been sent to the admin.' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email.' });
  }
};
export const fetchVerifiedMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { verified: true } });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages.' });
  }
};