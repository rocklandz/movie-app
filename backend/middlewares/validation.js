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

const validateMovie = () => {
  return [
    check('title', 'Title length must be 1-100 characters').isLength({
      min: 1,
      max: 100,
    }),
    check('overview', 'Overview must be less than 500 characters').isLength({
      max: 500,
    }),
    check('release_date', 'You must provide a valid date').isDate(),
    check('country', 'Country is not valid').isString(),
    check('adult', 'Adult must be boolean').isBoolean(),
    check('actors', 'Actors must be an array').isArray(),
    check('genres', 'Genres must be an array').isArray(),
    check('url_path', 'Movie url must be a string').isString(),
    check('url_path', 'Movie url can not be empty').not().isEmpty(),
  ];
};

export { validateRegister, validateUpdateUser, validateMovie };
