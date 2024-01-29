import React, { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import WebView from "react-native-webview";
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const webViewRef = useRef(null);
  const [showNavBar, setShowNavBar] = useState(true);
  const [selectedTab, setSelectedTab] = useState('home');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
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
    const shouldShowNavBar =
      !url.includes("/login") &&
      !url.includes("/register") &&
      !url.includes("/terms");
    setShowNavBar(shouldShowNavBar);

    // Extract the tab from the URL and update the selected tab
    const tab = url.split("/").pop();
    setSelectedTab(tab);
  };

  const goToUrl = (url, tab) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.location.href = '${url}/${tab}';`);
    }
    setSelectedTab(tab);
  };

  const renderIcon = (tab, iconName, iconSize) => {
    if (tab === 'home') {
      return (
        <TouchableOpacity
          key={tab}
          onPress={() => goToUrl('https://fincoin.swastikcredit.in',"/")}
          style={styles.navItem}
        >
          <Ionicons
            name={selectedTab === tab ? `${iconName}` : `${iconName}-outline`}
            size={iconSize}
            style={[styles.whiteIcon, { textAlign: 'center' }]}
          />
          <Text style={[styles.navText, { color: selectedTab === tab ? 'yellow' : 'white' }]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={tab}
          onPress={() => goToUrl(`https://fincoin.swastikcredit.in`, tab)}
          style={styles.navItem}
        >
          <Ionicons
            name={selectedTab === tab ? `${iconName}` : `${iconName}-outline`}
            size={iconSize}
            style={[styles.whiteIcon, { textAlign: 'center' }]}
          />
          <Text style={[styles.navText, { color: selectedTab === tab ? 'yellow' : 'white' }]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      );
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
            {renderIcon('home', 'home', 25)}
            {renderIcon('payment', 'card', 24)}
            {renderIcon('account', 'wallet', 24)}
            {renderIcon('profile', 'person', 24)}
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
