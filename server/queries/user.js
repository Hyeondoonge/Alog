import User from '../models/User.js';

const createUser = async (data) => {
  try {
    const newUser = new User(data);
    const result = await newUser.save();
    return result;
  } catch (error) {
    console.log('error while creating user');
  }
};

const findUser = async (data) => {
  try {
    const doc = await User.findOne(data);
    return doc;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const hasDuplicatedUserId = async (userId) => {
  try {
    const doc = await User.findOne({ userId });
    return doc;
  } catch(error) {
    console.log(error);
  }
}

const hasDuplicatedUser = async ({ platform, userNumber }) => {
  try {
    const doc = await User.findOne({ platform, userNumber });
    return doc;
  } catch(error) {
    console.log(error);
  }
}

export { createUser, findUser, hasDuplicatedUserId, hasDuplicatedUser };