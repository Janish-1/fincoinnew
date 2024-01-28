import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Replace with the desired icon library
import WebView from "react-native-webview";
Icon.loadFont();

const HomeScreen = () => {
  const webViewRef = useRef(null);
  const [showNavBar, setShowNavBar] = useState(true);

  const onNavigationStateChange = (navState) => {
    const { url } = navState;
    const shouldShowNavBar =
      !url.includes("/login") &&
      !url.includes("/register") &&
      !url.includes("/term");
    setShowNavBar(shouldShowNavBar);
  };

  const goToUrl = (url) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.location.href = '${url}';`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: "https://fincoin.swastikcredit.in/" }}
          style={styles.webview}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        {showNavBar && (
          <View style={styles.bottomNavContainer}>
            <TouchableOpacity onPress={() => goToUrl("https://fincoin.swastikcredit.in/home")}>
              <Icon name="home-outline" size={25} />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => goToUrl("https://fincoin.swastikcredit.in/payment")}>
              <Icon name="card-outline" size={24} />
              <Text style={styles.navText}>Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => goToUrl("https://fincoin.swastikcredit.in/account")}>
              <Icon name="wallet-outline" size={24} />
              <Text style={styles.navText}>Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => goToUrl("https://fincoin.swastikcredit.in/profile")}>
              <Icon name="person-outline" size={24} />
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
        )}
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
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5a5966',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 3,
  },
});

export default HomeScreen;
