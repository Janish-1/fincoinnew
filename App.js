// HomeScreen.js
import React, { useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import WebView from "react-native-webview";

const HomeScreen = () => {
  const webViewRef = useRef(null);
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <WebView
            ref={webViewRef}
            source={{ uri: "https://fincoin.swastikcredit.in/" }}
            style={styles.webview}
            onError={(error) => console.error("WebView error:", error)}
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
  flex: {
    flex: 1,
  },
});

export default HomeScreen;
