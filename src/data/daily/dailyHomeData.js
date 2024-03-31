const dailyHomeData = {
  success: true,
  data: {
    uploadCnt: 0,
    uploadDateList: [], //있는 날짜만 보내고 없는 날짜는 안보냄
    dailyImgList: null,
    isMonthlyModal: false,
    //이 값은 데일로 사진을 등록했을때 보여주는 사진리스트인데
    //없으면 유저가 데일리 사진을 등록 안한거라 null 있으면 등록한거라
    //메인뷰에서 띄워주시면 됩니다.
    isUploadToday: false,
    // 이 값은 매달 첫 접속시 모달을 띄우냐 마냐의 값인데
    // true 라면 monthlyBarcodeInfo의 정보를 띄우면 되고 아니면 무시하면 됩니다
    monthlyBarcodeInfo: null,
  },
  error: {
    code: 404,
    message: "데일리 홈 데이터 에러",
  },
};
export default dailyHomeData;
