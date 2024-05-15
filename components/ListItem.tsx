import React, { FC } from "react";
import { Dimensions, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface IListItem {
  item: {
    imageUrl: string;
    id: number;
  };
  onViewedItems: SharedValue<ViewToken[]>;
}

export const ListItem: FC<IListItem> = ({ item, onViewedItems }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = onViewedItems.value
      .filter((item) => item.isViewable)
      .some((viewableItem) => viewableItem.item.id === item.id);

    return {
      opacity: withTiming(isVisible ? 1 : 0.5),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.5),
        },
        {
          translateX: withTiming(isVisible ? 0 : 200),
        },
      ],
    };
  });

  return (
    <Animated.Image
      source={{ uri: item.imageUrl }}
      style={[animatedStyle, { width, height: 300 }]}
    />
  );
};
