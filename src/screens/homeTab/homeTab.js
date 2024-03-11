import React from "react";
import { Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Daily from "../daily/Daily";
import { Box, useColorModeValue } from "native-base";
const HomeTab = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "데일리 캘린더" },
    { key: "second", title: "그룹 캘린더" },
  ]);
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("white", "black")
              : useColorModeValue("white", "black");
          const borderColor = index === i ? "white" : "black";
          return (
            <Box
              bgColor="black"
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };
  const FirstRoute = () => <Daily navigation={navigation} />;
  const SecondRoute = () => <></>;
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

export default HomeTab;
