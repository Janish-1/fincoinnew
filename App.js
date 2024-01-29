import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import WebView from "react-native-webview";
import { Ionicons } from '@expo/vector-icons';

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
          onError={(error) => console.error("WebView error:", error)}
        />
        {showNavBar && (
          <View style={styles.bottomNavContainer}>
            <TouchableOpacity
              onPress={() => goToUrl("https://fincoin.swastikcredit.in/")}
            >
              <Ionicons  name="home-outline" size={25} style={[styles.whiteIcon, { textAlign: 'center' }]} />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                goToUrl("https://fincoin.swastikcredit.in/payment")
              }
            >
              <Ionicons  name="card-outline" size={24} style={[styles.whiteIcon, { textAlign: 'center' }]} />
              <Text style={styles.navText}>Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                goToUrl("https://fincoin.swastikcredit.in/account")
              }
            >
              <Ionicons  name="wallet-outline" size={24} style={[styles.whiteIcon, { textAlign: 'center' }]} />
              <Text style={styles.navText}>Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                goToUrl("https://fincoin.swastikcredit.in/profile")
              }
            >
              <Ionicons  name="person-outline" size={24} style={[styles.whiteIcon, { textAlign: 'center' }]} />
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
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  
  navText: {
    color: 'white',  // Set text color to white
    marginTop: 3,
  },
  
  // Assuming you have a style for white icons
  whiteIcon: {
    color: 'white',  // Set icon color to white
  },
  });

export default HomeScreen;
