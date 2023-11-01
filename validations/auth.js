import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Некорректный пароль').isLength({ min: 5, max: 30 }),
  body('fullName', 'Некорректное имя').isLength({ min: 3 }),
  body('avatarUrl', 'Некорректная ссылка на аватарку').optional().isURL(),
];
