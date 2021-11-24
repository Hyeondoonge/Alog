import Post from '../models/Post.js';

// 연산 작성법 => 1. save() 2. query / 각각을 사용했을 때 차이점이 있다 (casting / middleware / validation)
const getFilter = () => { // 필터 조건을 받아 쿼리를 위한 필터를 생성
};

const insertPost = async (data) => {
  try {
    const result = await Post.create(data);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const findPost = async (id) => {
 try {
   const doc = await Post.findById(id);
   return doc;
 } catch (err) {
   console.log(err);
 }
};

const updatePost = async (id, data) => {
  try {
    await Post.updateOne({ _id: id }, data);
    console.log('succefully update post');
    return await findPost(id);
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (id, writerId) => {
  try {
    await Post.deleteOne({ _id: id, writerId });
    console.log('succefully delete post');
  } catch (err) {
    console.log(err);
  }
};

/**
 * 해당 키워드 그리고 작성자에 해당하는 포스트 반환
 */
const findPosts = async (keyword, language, cursor, size, writerId) => {
   // json > query builder, query builder 사용 시 체인이 많이 필요할 경우 가독성이 떨어진다

   // 데이터를 페이징 하며 가져오도록 추후 변경 (무한 스크롤 구현 기능 시)
  try {
    if (!keyword) return [];
    const filter = { title: { $regex: '.*' + keyword + '.*' }};
    if (cursor) filter._id = { $lt: cursor };
    if (language) filter.language = { $in: language };
    if (writerId) filter.writerId = writerId;

    const doc = await Post.find(filter).sort('field -_id').limit(parseInt(size)).exec();
    return doc;
  } catch (err) {
    console.log(err);
  }
};

/**
 * 키워드의 연관된 전체 포스트를 카운팅
 */
const countPosts = async (keyword, language, writerId) => {
 try {
  if (!keyword) return [];
  const filter = { title: { $regex: '.*' + keyword + '.*' }};
  if (language) filter.language = { $in: language };
  if (writerId) filter.writerId = writerId;

  console.log(filter);
  const doc = await Post.find(filter).exec();
  return doc.length;
 } catch (err) {
   console.log(err);
 }
}


/**
 * 키워드의 연관된 전체 포스트를 카운팅
 */
 const leftPosts = async (keyword, language, cursor, writerId) => { 
  try {
    if (!keyword) return [];
    const filter = { title: { $regex: '.*' + keyword + '.*' }};
    if (cursor) filter._id = { $lt: cursor };
    if (language) filter.language = { $in: language };
    if (writerId) filter.writerId = writerId;

    const doc = await Post.find(filter).sort('field -_id').exec();
    return doc.length;
  } catch (err) {
    console.log(err);
  }
 }

export { insertPost, updatePost, deletePost, findPost, findPosts, countPosts, leftPosts };