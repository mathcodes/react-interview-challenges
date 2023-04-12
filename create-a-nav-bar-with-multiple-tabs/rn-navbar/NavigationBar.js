import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const TABS = [
  { title: 'Tab 1', component: <View><Text>Content of Tab 1</Text></View> },
  { title: 'Tab 2', component: <View><Text>Content of Tab 2</Text></View> },
  { title: 'Tab 3', component: <View><Text>Content of Tab 3</Text></View> },
];

const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My App</Text>
      </View>
      <View style={styles.tabs}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === index && styles.activeTab,
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabTitle,
                activeTab === index && styles.activeTabTitle,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {TABS[activeTab].component}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  tab: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#333',
  },
  tabTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  activeTabTitle: {
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
});

export default NavigationBar;
