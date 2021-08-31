import User from '../models/User.js';

const createUser = async (data, callback) => {
  const newUser = new User(data);
  newUser.save((error) => {
    if (error) console.log(error.errors['nickname'].message);
    else console.log('succefully save user');
  })
};

export { createUser };