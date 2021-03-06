import jwt from 'jsonwebtoken';
import moment from 'moment';
import multer from 'multer';

/**
 * db에 저장된 date 데이터를 받아 YYYY-MM-YY hh:mm:ss 로 변환 
 */ 
const formatDate = (date) => {
  const today = moment(new Date());
  const writeDate = moment(date);

  if (!today.isSame(writeDate, 'years')) {
    return writeDate.format('YYYY년 MM월');
  }
   
  if (!today.isSame(writeDate, 'months') || !today.isSame(writeDate, 'days')) {
    return writeDate.format('MM월 DD일'); 
  }

  return `오늘 ${writeDate.format('H:mm')}`;
};

/**
 * doc 타입의 요소들에 대해 값을 조작
 * @param {Array} docs Mongoose Document 타입 배열
 * @param {function} callback 각 요소에 수행할 함수 
 * @returns 각 요소에 수행한 callback 결과를 모은 새ㅗㄹ운 배열
 */
const docsMap = (docs, callback) => (
  docs.map((doc) => callback({ ...doc.toObject() })
));

const generateAccessToken = (userId, userNumber, platform) => {
  try {
    const token = jwt.sign({ userId, userNumber, platform }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: '30m'
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const generateRefreshToken = (userId, userNumber, platform) => {
  try {
    const token = jwt.sign({ userId, userNumber, platform }, process.env.REFRESH_SECRET_KEY);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY); // getAccessToken 해준다.
  } catch (error) {
    return null; // access token 다시발급해야함.
  }
}

const getUploader = (destination) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination)
    },
    filename: function (req, file, cb) {
      var extArray = file.mimetype.split("/");
      var extension = extArray[extArray.length - 1];
      cb(null, file.originalname + Date.now()+ '.' +extension)
    }
  });
  return multer({ storage });
}

export { formatDate, docsMap, generateAccessToken, generateRefreshToken, verifyToken, getUploader };