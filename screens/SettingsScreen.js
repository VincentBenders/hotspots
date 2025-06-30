import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const onPressFunction = () => {
    alert("darkmode on");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressFunction}>
        <Text>I'm pressable!</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
