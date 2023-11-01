import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/check-auth.js';
import { login, getMe, register } from './controllers/user-controller.js';

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

app.get('/auth/me', checkAuth, getMe);

app.post('/auth/login', login);

app.post('/auth/register', registerValidation, register);

app.listen(4444, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('server start');
});
