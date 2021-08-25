import Post from '../models/Post.js';

// 연산 작성법 => 1. save() 2. query / 각각을 사용했을 때 차이점이 있다 (casting / middleware / validation)

const insertPosts = async (data) => {
  Post.insertMany(data, (err) => {
    if (err) console.log(err);
    else console.log('succefully save post');
  });
};

// find
const findPost = async (keyword, writerId) => {
   // json > query builder, query builder 사용 시 체인이 많이 필요할 경우 가독성이 떨어진다
  try {
    if (!keyword) return [];
    const filter = { title: { $regex: '.*' + keyword + '.*' } };
    if (writerId) filter.writerId = writerId;

    const doc = await Post.find(filter).exec();
    return doc;
  } catch (err) {
    console.log(err);
  }
};

const countPosts = async () => {
 try {
   const res = await Post.countDocuments({});
   return res;
 } catch (err) {
   console.log(err);
 }
}

export { insertPosts, findPost, countPosts };