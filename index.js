import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './modules/user.js';

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.hxx21sl.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('connection DB'))
  .catch((error) => console.log('connection error', error));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Привет');
});

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({ ...req.body, passwordHash });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const userData = { ...user._doc };
    delete userData.passwordHash;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка при регистрации',
    });
  }
});

app.listen(4444, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('server start');
});
