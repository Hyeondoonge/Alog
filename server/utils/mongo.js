/**
 * mongoDB와 연결
 * @param {objcet} mongoose
 * @param {String} user 사용자 아이디
 * @param {String} pass 사용자 비밀번호
 */

 const connectDB = (mongoose, uri, user, pass) => {
  try {
    mongoose.connect(uri, { // options
      auth: { authSource: 'admin' },
      user,
      pass,
      useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodbbb'));
  } catch (error) {
    console.log(error);
    // handleError(error);
  }
}

export { connectDB };