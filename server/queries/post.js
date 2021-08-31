import Post from '../models/Post.js';

// 연산 작성법 => 1. save() 2. query / 각각을 사용했을 때 차이점이 있다 (casting / middleware / validation)
const getFilter = () => { // 필터 조건을 받아 쿼리를 위한 필터를 생성
};

const insertPosts = async (data) => {
  Post.insertMany(data, (err) => {
    if (err) console.log(err);
    else console.log('succefully save post');
  });
};

/**
 * 해당 키워드 그리고 작성자에 해당하는 포스트 반환
 */
const findPost = async (keyword, writerId) => {
   // json > query builder, query builder 사용 시 체인이 많이 필요할 경우 가독성이 떨어진다

   // 데이터를 페이징 하며 가져오도록 추후 변경 (무한 스크롤 구현 기능 시)
  try {
    if (!keyword) return [];
    const filter = { title: { $regex: '.*' + keyword + '.*' } };
    if (writerId) filter.writerId = writerId;

    console.log('db connection');
    
    const doc = await Post.find(filter).exec();
    return doc;
  } catch (err) {
    console.log(err);
  }
};

/**
 * 키워드의 연관된 전체 포스트를 카운팅
 */
const countPosts = async (keyword, writerId) => { 
 try {
  if (!keyword) return [];
  const filter = { title: { $regex: '.*' + keyword + '.*' } };
  if (writerId) filter.writerId = writerId;

  const doc = await Post.find(filter).exec();
  return doc.length;
 } catch (err) {
   console.log(err);
 }
}

const updatePosts = async () => {
  try {
    const res = await Post.updateMany({ platform: "백준" }, { platform: "baekjoon" })
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { insertPosts, findPost, countPosts, updatePosts };