import React, { useRef, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, BackHandler, ToastAndroid } from "react-native";
import WebView from "react-native-webview";

const HomeScreen = () => {
  const webViewRef = useRef(null);
  let lastBackPressed = 0;

  const handleBackButton = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }

    const currentTime = new Date().getTime();

    if (currentTime - lastBackPressed < 2000) {
      // If back button is pressed twice within 2 seconds, exit the app
      BackHandler.exitApp();
      return false;
    } else {
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
      lastBackPressed = currentTime;
      return true;
    }
  };

  const handleNavigationStateChange = (navState) => {
    console.log("Current URL:", navState.url);
    console.log("Can go back:", navState.canGoBack);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: "https://fincoin.swastikcredit.in/" }}
          style={styles.webview}
          onError={(error) => console.error("WebView error:", error)}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});

export default HomeScreen;
