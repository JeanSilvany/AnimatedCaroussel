import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  ListRenderItemInfo,
} from "react-native";

import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListItem } from "@/components/ListItem";

const data = new Array(30)
  .fill("https://picsum.photos/1920/1080")
  .map((imageUrl, index) => ({
    imageUrl,
    id: index,
  }));

export default function HomeScreen() {
  const onViewedItems = useSharedValue<ViewToken[]>([]);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<{ imageUrl: string; id: number }>) => (
    <ListItem item={item} onViewedItems={onViewedItems} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          onViewableItemsChanged={({ viewableItems }) => {
            onViewedItems.value = viewableItems;
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </SafeAreaView>
  );
}
