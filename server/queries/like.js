import Like from "../models/Like.js";

const findLiker = async (postId) => {
  try {
    const doc = await Like.find({ postId }, 'userId');
    return doc;
  } catch (err) {
    console.log(err);
  }
};

const createLike = async ({postId, userId}) => {
  try {
    console.log(postId, userId);
    await Like.create({ postId, userId });
    console.log('successfully liked!')
  } catch (err) {
    console.log(err);
  }
};


const deleteLike = async ({postId, userId}) => {
  try {
    await Like.deleteOne({ postId, userId });
    console.log('successfully unliked!')
  } catch (err) {
    console.log(err);
  }
};

export { findLiker, createLike, deleteLike };