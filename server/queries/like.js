import Like from "../models/Like.js";

const findLiker = async (postId) => {
  try {
    const doc = await Like.find({ postId }, 'userId');
    return doc;
  } catch (err) {
    throw new Error(err);
  }
};

const createLike = async (postId, userId) => {
  try {
    await Like.create({ postId, userId });
    console.log('successfully liked!')
  } catch (err) {
    throw new Error(err);
  }
};


const deleteLike = async (postId, userId) => {
  try {
    await Like.deleteOne({ postId, userId });
    console.log('successfully unliked!')
  } catch (err) {
    throw new Error(err);
  }
};

export { findLiker, createLike, deleteLike };