import moment from 'moment';

/**
 * db에 저장된 date 데이터를 받아 YYYY-MM-YY hh:mm:ss 로 변환 
 */ 
const formatDate = (date) => {
  const today = moment(new Date());
  const writeDate = moment(date);

  if (today.diff(writeDate, 'years')) {
    return writeDate.format('YYYY년 MM월');
  }
   
  if (today.diff(writeDate, 'months') || today.diff(writeDate, 'days')) {
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

export { formatDate, docsMap };