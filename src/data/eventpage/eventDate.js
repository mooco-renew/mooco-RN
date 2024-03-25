const eventData = {
  success: true,
  data: {
    eventCnt: 0,
    eventList: [
      {
        startDate: "2024-03-20", // 2024-01-11
        endDate: "2024-03-27", // 2024-01-23
      },
    ], //있는 날짜만 보내고 없는 날짜는 안보냄
  },
  error: {
    code: 404,
    message: "이벤트 캘린더 데이터 에러",
  },
};
export default eventData;
