import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("darkmode", JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };
  const [darkmode, setDarkmode] = useState(false);

  const fetchTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("darkmode");
      if (value !== null) {
        // We have data!!
        console.log(value);
        setDarkmode(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const onPressFunction = () => {
    alert(`darkmode on, darkmode: ${darkmode}`);
    if (darkmode == false) {
      setDarkmode(true);
    }
    if (darkmode == true) {
      setDarkmode(false);
    }

    storeData(darkmode);
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("darkmode");
      if (value !== null) {
        // value previously stored
        if (value == "true") setDarkmode(true);
        if (value == "false") setDarkmode(false);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
    fetchTheme();
  }, []);

  return (
    <View style={styleslight.container}>
      <Text style={styleslight.text}>darkmode: </Text>
      <Pressable style={styleslight.press} onPress={onPressFunction}>
        <Text style={styleslight.presstext}>darkmode</Text>
      </Pressable>
    </View>
  );
}
const styleslight = StyleSheet.create({
  container: {
    // if (darkmode = true){
    // flex: 1
    // backgroundColor: '#black'
    // color: 'red'
    // },
    // if (darkmode = false){
    //   flex: 1
    //   backgroundColor: '#FFFFFF'
    //   color: 'red'
    // }
  },
  text: {
    color: "red",
  },
  press: {
    width: 100,
    padding: 5,
    backgroundColor: "#363636",
  },
  presstext: {
    color: "#FFFFFF",
  },
});
