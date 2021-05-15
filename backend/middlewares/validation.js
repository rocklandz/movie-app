import { check } from 'express-validator';

const validateRegister = () => {
  return [
    check('email', 'Must use a valid email.').isEmail(),
    check('name', 'Please enter your name').not().isEmpty(),
    check('name', 'Name must be longer than 6 characters').isLength({ min: 6 }),
    check('password', 'Password must be longer than 6 characters').isLength({
      min: 6,
    }),
  ];
};

const validateUpdateUser = () => {
  return [
    check('email', 'Must use a valid email.').isEmail(),
    check('name', 'Please enter your name').not().isEmpty(),
    check('name', 'Name must be longer than 6 characters').isLength({ min: 6 }),
  ];
};

export { validateRegister, validateUpdateUser };
