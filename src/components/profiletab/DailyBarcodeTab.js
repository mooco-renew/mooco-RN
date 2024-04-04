import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import getDailyData from "../../server/profile/getDailyData";

export default function DailyBarcodeTab({ profileData }) {
  const navigation = useNavigation();
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const responseData = await getDailyData(page);
      console.log(responseData);
      if (
        responseData.dayBarcodeDtoList &&
        responseData.dayBarcodeDtoList.length > 0
      ) {
        setDailyData((prevData) => [
          ...prevData,
          ...responseData.dayBarcodeDtoList,
        ]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
        console.log("더 이상 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("API 호출 에러", error);
      Alert.alert("API 호출 에러", "데이터를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (isEndReached && !loading) {
      fetchData();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ffffff"]}
            progressBackgroundColor="#000000"
          />
        }
      >
        {dailyData.length === 0 ? (
          <Text style={styles.alertText}>아직 생성된 무드 바코드가 없어요</Text>
        ) : (
          dailyData.map((item, index) => (
            <View key={index} style={styles.dailyItemContainer}>
              <View style={styles.dailyItem}>
                <Text
                  style={styles.dateText}
                >{`${item.year} ${item.month}`}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DailyBarcodeDetail", {
                      barcodeUrl: item.barcodeUrl,
                      year: item.year,
                      month: item.month,
                      barcodeId: item.barcodeId,
                      isPrivate: item.isPrivate,
                      nickname: profileData.nickname,
                      profileImgUrl: profileData.profileImgUrl,
                    })
                  }
                >
                  <Image
                    source={{ uri: item.barcodeUrl }}
                    style={styles.image}
                  />
                </TouchableOpacity>
                <View style={styles.countContainer}>
                  <Text style={styles.countText}>{`${item.photoCnt}장`}</Text>
                </View>
              </View>
            </View>
          ))
        )}
        {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  alertText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  dailyItemContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  dailyItem: {
    marginTop: 16,
    marginBottom: 16,
  },
  dateText: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "700",
    textAlign: "left",
  },
  countContainer: {
    borderWidth: 1,
    borderColor: "#ffffff",
    marginTop: 10,
    paddingHorizontal: 6,
    paddingVertical: 9,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  countText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "right",
  },
  image: {
    width: 320,
    height: 140,
    resizeMode: "cover",
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "center",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});
