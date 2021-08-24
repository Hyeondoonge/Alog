var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('users.js');
// });

// 동일 경로에 여러 메소드를 사용하는 경우,
// 체인 형식으로 코드 작성 가능

router.route('/')
  .get(function(req, res) {
    res.send('users.js');
  });

module.exports = router;
