const dailyHomeData = {
  success: true,
  data: {
    uploadCnt: "int",
    uploadDateList: ["2024-01-11", "2024-01-12"], //있는 날짜만 보내고 없는 날짜는 안보냄
    dailyImgList: [],
    //이 값은 데일로 사진을 등록했을때 보여주는 사진리스트인데
    //없으면 유저가 데일리 사진을 등록 안한거라 null 있으면 등록한거라
    //메인뷰에서 띄워주시면 됩니다.
    isMonthlyModal: true,
    // 이 값은 매달 첫 접속시 모달을 띄우냐 마냐의 값인데
    // true 라면 monthlyBarcodeInfo의 정보를 띄우면 되고 아니면 무시하면 됩니다
    monthlyBarcodeInfo: {
      photoUrl: "String",
      //고정텍스트 => 이번달은 몇개의 사진을 업로드했고 몇개의 날짜에 업로드를 했습니다!
      fixedModalText:
        "이번달은 몇개의 사진을 업로드했고 몇개의 날짜에 업로드를 했습니다!",
      //유동텍스트 => ex) 더 노력하세요!, 꽉채웠어요!! -> 이런느낌으로 백에서 나눠서 보냄
      changedModalText: "더 노력하세요!",
    },
  },
  error: {
    code: 404,
    message: "데일리 홈 데이터 에러",
  },
};
