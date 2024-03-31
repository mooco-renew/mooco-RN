const dailyImageData = {
  success: true,
  data: {
    visible: true, //false면 모자이크 처리하기, true면 보여주기
    memo: "",
    photos: ["https://via.placeholder.com/150"],
  },
  error: {
    code: 404,
    message: "에러 발생",
  },
};
export default dailyImageData;
