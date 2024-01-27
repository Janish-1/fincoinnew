import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Home as HomeIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as AccountIcon,
  Person as ProfileIcon,
} from "@mui/icons-material";
import WebView from "react-native-webview";

const HomeScreen = () => {
  const webViewRef = useRef(null);
  const [showNavBar, setShowNavBar] = useState(true);

  const onNavigationStateChange = (navState) => {
    const { url } = navState;
    // Check if the URL contains /login, /register, or /term
    const shouldShowNavBar = !url.includes("/login") && !url.includes("/register") && !url.includes("/term");
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
        />
        {showNavBar && (
          <View style={styles.bottomNavContainer}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => goToUrl("/home")}
            >
              <HomeIcon style={{ fontSize: 24, color: "tomato" }} />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => goToUrl("/payment")}
            >
              <PaymentIcon style={{ fontSize: 24, color: "tomato" }} />
              <Text style={styles.navText}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => goToUrl("/account")}
            >
              <AccountIcon style={{ fontSize: 24, color: "tomato" }} />
              <Text style={styles.navText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => goToUrl("/profile")}
            >
              <ProfileIcon style={{ fontSize: 24, color: "tomato" }} />
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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
