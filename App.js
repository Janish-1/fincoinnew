// HomeScreen.js
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const webViewRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("home");
  const [showNavBar, setShowNavBar] = useState(false); // Initialize to false
  const [loginActivated, setLoginActivated] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const onNavigationStateChange = (navState) => {
    const { url } = navState;
    const tab = url.split("/").pop();

    // Show navbar only after /login is activated and not on /login page
    setShowNavBar(
      loginActivated &&
        !url.includes("/login") &&
        !url.includes("/register") &&
        !url.includes("/terms")
    );

    setSelectedTab(tab || "home");

    // Activate login when user is on the /login page
    if (url.includes("/login")) {
      setLoginActivated(true);
    }
  };

  const goToUrl = (tab) => {
    let url;
    if (tab === "home") {
      url = "https://fincoin.swastikcredit.in";
    } else if (tab === "Payment") {
      url = "https://fincoin.swastikcredit.in/investment";
    } else {
      url = `https://fincoin.swastikcredit.in/${tab}`;
    }

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.location.href = '${url}';`);
    }
    setSelectedTab(tab);
  };

  const renderIcon = (tab, iconName, iconSize) => (
    <TouchableOpacity
      key={tab}
      onPress={() => goToUrl(tab)}
      style={styles.navItem}
    >
      <Ionicons
        name={selectedTab === tab ? `${iconName}` : `${iconName}-outline`}
        size={iconSize}
        style={[styles.whiteIcon, { textAlign: "center" }]}
      />
      <Text
        style={[
          styles.navText,
          { color: selectedTab === tab ? "yellow" : "white" },
        ]}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.container}>
          <WebView
            ref={webViewRef}
            source={{ uri: "https://fincoin.swastikcredit.in/" }}
            style={styles.webview}
            onNavigationStateChange={onNavigationStateChange}
            onError={(error) => console.error("WebView error:", error)}
          />
        </View>
      </KeyboardAvoidingView>
      {showNavBar && (
        <View style={styles.bottomNavContainer}>
          {renderIcon("home", "home", 25)}
          {renderIcon("Payment", "card", 24)}
          {renderIcon("account", "wallet", 24)}
          {renderIcon("profile", "person", 24)}
        </View>
      )}
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
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 10,
    position: "fixed",
  },
  navItem: {
    alignItems: "center",
  },

  navText: {
    color: "white", // Set text color to white
    marginTop: 3,
  },

  // Assuming you have a style for white icons
  whiteIcon: {
    color: "white", // Set icon color to white
  },
});

export default HomeScreen;
