import React from "react";
import { LocaleConfig, Calendar } from "react-native-calendars";
import { NativeBaseProvider, ScrollView } from "native-base";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {
  Text,
  Box,
  HStack,
  VStack,
  Center,
  AlertDialog,
  Button,
} from "native-base";
import DailyImageView from "../../components/dailyImageView/DailyImageView";
import { LinearGradient } from "expo-linear-gradient";

export default function Daily() {
  // 날짜 배열
  const datesArray = ["2024-02-03", "2024-02-07", "2024-02-15"];
  const [isOpen, setIsOpen] = React.useState(true);
  const Header =
    "이번달은 몇개의 사진을 업로드했고 몇개의 날짜에 업로드를 했습니다!";
  const Content = "더 노력하세요!";
  const Btn1 = "닫기";
  const Btn1Event = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  // 배열에서 객체로 변환
  const markedDates = datesArray.reduce((acc, date) => {
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
  }, {});
  return (
    <NativeBaseProvider>
      {isOpen && (
        <Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <AlertDialog.Content backgroundColor="black">
              <AlertDialog.Header borderColor="black" bgColor="black">
                <Text color="white" fontSize="18px" fontWeight="700">
                  {Header}
                </Text>
              </AlertDialog.Header>
              <AlertDialog.Body borderColor="black" bgColor="black">
                <Text color="white" fontSize="16px" fontWeight="400">
                  {Content}
                </Text>
              </AlertDialog.Body>
              <AlertDialog.Footer borderColor="black" bgColor="black">
                <Button.Group space={2}>
                  <Button
                    bgColor="#FFFFFF80"
                    onPress={Btn1Event}
                    ref={cancelRef}
                  >
                    <Text color="black" fontSize="16px" fontWeight="700">
                      {Btn1}
                    </Text>
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      )}
      <ScrollView backgroundColor="black" padding="16px">
        <VStack space={1} alignItems="center" safeArea>
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
                  console.log("데일리 기록으로 이동");
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
          <Text color="white" fontSize="81">
            TODAY
          </Text>
          <DailyImageView
            images={[
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
            ]}
          ></DailyImageView>
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
                // ... 다른 테마 관련 속성들을 추가
              }}
              // 기본 월 및 연도 타이틀을 사용자 정의 타이틀로 대체
              //renderHeader={(date) => {
              /* 여기에 사용자 정의 헤더 반환 */

              // 캘린더 타이틀의 월 포맷
              monthFormat={"yyyy MMMM"}
              // 날짜를 눌렀을 때 실행되는 함수
              onDayPress={(day) => {
                console.log("선택된 날짜", day);
              }}
              // 보이는 월이 바뀔 때 실행되는 함수
              onMonthChange={(month) => {
                console.log("월 변경됨", month);
              }}
              markedDates={markedDates}
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
                9
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
    height: "100%", // Set the image height accordingly
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
