import React, { useState, useEffect } from "react";
import { LocaleConfig, Calendar } from "react-native-calendars";
import { NativeBaseProvider, ScrollView } from "native-base";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, Box, HStack, VStack, Image, Actionsheet } from "native-base";
import DailyImageView from "../../components/dailyImageView/DailyImageView";
import { LinearGradient } from "expo-linear-gradient";
import getDailyHomeData from "../../server/daily/getDailyHomeData";
import getDailyCalendarData from "../../server/daily/getDailyCalendarData";
import dailyHomeData from "../../data/daily/dailyHomeData";

export default function Daily({ navigation }) {
  //홈 데이터 저장
  const [homeData, setHomeData] = useState(dailyHomeData.data);
  const dailyImgList = homeData.dailyImgList;
  const uploadCnt = homeData.uploadCnt;
  const monthlyBarcodeInfo = homeData.monthlyBarcodeInfo;
  const isUploadToday = homeData.isUploadToday;
  var barcodeUrl = null;
  var fixedModalText = null;
  var changedModalText = null;
  if (monthlyBarcodeInfo !== null) {
    barcodeUrl = homeData.monthlyBarcodeInfo.photoUrl;
    fixedModalText = homeData.monthlyBarcodeInfo.fixedModalText;
    changedModalText = homeData.monthlyBarcodeInfo.changedModalText;
  }
  const [isOpen, setIsOpen] = useState(homeData.isMonthlyModal);
  const onClose = () => setIsOpen(false);
  //업로드한 날짜 문자열 배열
  const [uploadDateListArray, setUploadDateListArray] = useState(
    homeData.uploadDateList
  );
  //업로드한 날짜 캘린더 marked 스타일 적용을 위한 배열
  const [uploadDateList, setUploadDateList] = useState(
    homeData.uploadDateList.reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: "white",
            borderRadius: 50,
          },
          text: {
            color: "black",
            fontWeight: "bold",
          },
        },
      };
      return acc;
    }, {})
  );

  //오늘 날짜 - 데일리 업로드에서 사용
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;

  useEffect(() => {
    const getHomeData = async () => {
      const result = await getDailyHomeData();
      if (result !== null) {
        // 결과가 null이 아닐 때만 상태 업데이트
        setHomeData(result);
        setUploadDateListArray(result.uploadDateList);
        setUploadDateList(
          (result.uploadDateList || []).reduce((acc, date) => {
            acc[date] = {
              customStyles: {
                container: {
                  backgroundColor: "white",
                  borderRadius: 50,
                },
                text: {
                  color: "black",
                  fontWeight: "bold",
                },
              },
            };
            return acc;
          }, {})
        );
      } else {
        // result가 null일 때의 처리 로직, 필요한 경우
      }
    };
    getHomeData();
  }, []);

  //캘린더를 넘길때 업로드
  useEffect(() => {
    setUploadDateList(
      (uploadDateListArray || []).reduce((acc, date) => {
        acc[date] = {
          customStyles: {
            container: {
              backgroundColor: "white",
              borderRadius: 50,
            },
            text: {
              color: "black",
              fontWeight: "bold",
            },
          },
        };
        return acc;
      }, {})
    );
  }, [uploadDateListArray]);

  //캘린더 데이터
  const [calendarData, setCalendarData] = useState({});
  const getCalendarData = async (date) => {
    const result = await getDailyCalendarData(date);
    if (result !== null) {
      setCalendarData(result);
      setUploadDateListArray(result.uploadDateList);
      setUploadDateList(
        (result.uploadDateList || []).reduce((acc, date) => {
          acc[date] = {
            customStyles: {
              container: {
                backgroundColor: "white",
                borderRadius: 50,
              },
              text: {
                color: "black",
                fontWeight: "bold",
              },
            },
          };
          return acc;
        }, {})
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box
            w="100%"
            h={60}
            px={4}
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="16" color="black" fontWeight="bold">
              {changedModalText}
            </Text>
          </Box>
          <Box w="70%" px={4} mb={4}>
            <Text fontSize="14" color="black">
              {fixedModalText}
            </Text>
          </Box>
          <Box
            w="100%"
            px={4}
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <Image
              key="barcodeImage"
              source={{ uri: barcodeUrl }}
              style={{ width: 320, height: 120 }}
              alt="바코드 이미지"
            />
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
      <ScrollView backgroundColor="black" padding="16px">
        <VStack space={1} alignItems="center" safeArea>
          {!isUploadToday && (
            <LinearGradient
              colors={["#63495C", "#2C5665"]}
              style={styles.gradientBox}
            >
              <VStack space={3} alignItems="center">
                <Text color="white" fontSize="20px" marginTop="20px">
                  오늘의 일상을 기록하세요
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DailyUpload", { date: dateString });
                  }}
                  style={styles.navigateDailyContainer}
                >
                  <Box style={styles.navigateDailyBox}>
                    <Text color="white" fontSize="14px">
                      데일리 기록으로 이동하기
                    </Text>
                  </Box>
                </TouchableOpacity>
              </VStack>
            </LinearGradient>
          )}
          {dailyImgList && dailyImgList.length !== 0 && (
            <>
              <Text color="white" fontSize="81">
                TODAY
              </Text>
              <DailyImageView images={dailyImgList}></DailyImageView>
            </>
          )}
          <Text color="white" fontSize="52">
            CALENDAR
          </Text>
          <View style={styles.calendarContainer}>
            <Calendar
              // 캘린더 스타일링을 위한 테마 객체
              theme={{
                backgroundColor: "black", // 캘린더의 배경색
                calendarBackground: "black", // 캘린더 내부의 배경색
                monthTextColor: "white", // 헤더 글자색
                arrowColor: "white",
                dayTextColor: "white",
                textSectionTitleColor: "white",
                todayTextColor: "white",
                // ... 다른 테마 관련 속성들을 추가
              }}
              // 기본 월 및 연도 타이틀을 사용자 정의 타이틀로 대체
              //renderHeader={(date) => {
              /* 여기에 사용자 정의 헤더 반환 */

              // 캘린더 타이틀의 월 포맷
              monthFormat={"yyyy MMMM"}
              // 날짜를 눌렀을 때 실행되는 함수
              onDayPress={(date) => {
                if (
                  uploadDateListArray &&
                  uploadDateListArray.includes(date.dateString)
                ) {
                  navigation.navigate("DailyPost", { date: date.dateString });
                }
              }}
              // 보이는 월이 바뀔 때 실행되는 함수
              onMonthChange={(date) => {
                switch (date.month) {
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                  case 9:
                    getCalendarData(date.year + "-" + "0" + date.month + "-01");
                    break;
                  case 10:
                  case 11:
                  case 12:
                    getCalendarData(date.year + "-" + date.month + "-01");
                    break;
                }
              }}
              markedDates={uploadDateList}
              markingType={"custom"}
            />
          </View>
          <HStack width="92%" justifyContent="space-between" marginTop="24px">
            <Box style={styles.monthUploadTextBox}>
              <Text color="black" fontSize="14px">
                이번달 기록 횟수
              </Text>
            </Box>
            <Box style={styles.monthUploadCntBox}>
              <Text color="white" fontSize="14px">
                {uploadCnt}
              </Text>
            </Box>
          </HStack>
          <Text color="white" marginTop="24px">
            이번 달에 기록한 데일리는
          </Text>
          <Text color="white" marginBottom="50px">
            다음 달 1일에 꺼내볼 수 있어요
          </Text>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  calendarContainer: {
    width: "98%", // 캘린더의 가로 크기를 92%로 설정
    alignSelf: "center", // 캘린더를 중앙에 배치
  },
  gradientBox: {
    width: "98%",
    borderRadius: 10,
    padding: 15,
    justifyContent: "space-between",
  },
  navigateDailyContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navigateDailyBox: {
    width: "95%",
    borderRadius: 20,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 4,
    backgroundColor: "none",
    alignItems: "center",
    marginBottom: "10px",
  },
  monthUploadTextBox: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: "white",
    alignItems: "center",
  },
  monthUploadCntBox: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "none",
    alignItems: "center",
  },
});
const pic = {
  uri: "https://via.placeholder.com/100.jpg/via.placeholder.com/300x200",
};
LocaleConfig.locales.en = {
  monthNames:
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
  monthNamesShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  dayNames: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
    "_"
  ),
  dayNamesShort: "S_M_T_W_T_F_S".split("_"),
  today: "Today",
};
LocaleConfig.defaultLocale = "en";
