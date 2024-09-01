import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import CircularCarouselListItem, {
  ListItemWidth,
} from "./CircularCarouselListItem";
import { useSharedValue } from "react-native-reanimated";

export default function CircularCarousel({ data }) {
  const contentOffset = useSharedValue(0);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      pagingEnabled
      snapToInterval={ListItemWidth}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16} // 60FPS -> 16ms ( 1000 / 60fps )
      onScroll={(event) => {
        contentOffset.value = event.nativeEvent.contentOffset.x;
      }}
      style={{ position: "absolute", top: 0, height: 300 }}
      contentContainerStyle={{
        paddingRight: 3 * ListItemWidth,
        justifyContent: "center",
        alignItems: "center",
      }}
      horizontal
      renderItem={({ item, index }) => {
        return (
          <CircularCarouselListItem
            contentOffset={contentOffset}
            imageSrc={item}
            index={index}
          />
        );
      }}
    />
  );
}
