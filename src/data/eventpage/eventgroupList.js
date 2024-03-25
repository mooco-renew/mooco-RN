const EventgroupList = {
  success: "success",
  data: {
    groupList: [
      {
        id: null,
        name: null,
        groupUserCnt: 0,
        userIdList: [
          {
            userId: null,
            profileImg: null,
            nickname: null,
            identifierId: null,
          },
        ],
        eventList: [
          {
            eventId: null,
            eventTitle: null,
            startDate: null,
            endDate: null,
          },
        ],
      },
    ],
  },
  error: {
    code: 404,
    message: "3-1 그룹 조회 에러",
  },
};
export default EventgroupList;
