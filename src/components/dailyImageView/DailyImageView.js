import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Text } from "native-base";
export default function DailyImageView({ images }) {
  const renderImages = () => {
    const imageViews = images.map((image, index) => (
      <Image
        key={index}
        source={{ uri: image }}
        style={getImageStyle(images.length, index)}
        resizeMode="cover"
      />
    ));
    if (imageViews.length !== 3) {
      return (
        <>
          {
            <>
              <Text color="white" fontSize="81px">
                TODAY
              </Text>
              <View style={styles.container}>
                <View
                  style={imageViews.length === 2 ? styles.row2 : styles.row}
                >
                  {imageViews.slice(0, 2)}
                </View>
                {images.length > 2 && (
                  <View style={styles.row}>{imageViews.slice(2)}</View>
                )}
              </View>
            </>
          }
        </>
      );
    }
    if (imageViews.length === 3) {
      return (
        <>
          {
            <View style={styles.Tcontainer}>
              <View style={styles.TinnerContainer}>
                <>{imageViews[0]}</>
                <>{imageViews[2]}</>
              </View>
              <View style={styles.Trow}>{imageViews[1]}</View>
            </View>
          }
        </>
      );
    }
  };

  const getImageStyle = (count, index) => {
    switch (count) {
      case 1:
        return styles.fullImage;
      case 2:
        return [
          styles.halfImage,
          index % 2 === 0 ? styles.leftImage : styles.rightImage,
        ];
      case 3:
        return styles.middleImage;
      case 4:
        return styles.quarterImage;
      default:
        return {};
    }
  };

  return renderImages();
}

const styles = StyleSheet.create({
  Tcontainer: {
    flexDirection: "row",
    width: 300,
  },
  TinnerContainer: {
    flexDirection: "column",
    width: 150,
  },
  container: {
    width: 300,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  Trow: {
    flexDirection: "row",
    width: 150,
    height: 300,
    alignItems: "center",
    margin: 2,
  },
  fullImage: {
    width: "100%",
    height: 300, // Set the image height accordingly
    borderRadius: 20,
    overflow: "hidden",
    margin: 2,
  },
  halfImage: {
    width: "50%",
    height: 150, // Set the image height accordingly
    borderRadius: 20,
    overflow: "hidden",
    margin: 2,
  },
  middleImage: {
    width: "100%",
    height: 150, // Set the image height accordingly
    borderRadius: 20,
    margin: 2,
  },
  quarterImage: {
    width: "50%",
    height: 150, // Set the image height accordingly
    borderRadius: 20,
    overflow: "hidden",
    margin: 2,
  },
  leftImage: {
    marginRight: 150, // Adjust the space between images
  },
  rightImage: {
    marginLeft: 150, // Adjust the space between images
  },
});
