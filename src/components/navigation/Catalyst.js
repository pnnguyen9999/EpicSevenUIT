import React from 'react';
import { Image } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {ThemeProvider} from 'react-native-ui-kitten/theme'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CatalystList from "../../screens/CatalystList";




 const CatalystListStack = createStackNavigator(
  {
    CatalystList: CatalystList,
  }
);



CatalystListStack.navigationOptions = {
  title: "Catalyst",
}



const TabNavigatorExportAll = createBottomTabNavigator(
  {
    Catalyst: CatalystListStack,
},


{
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#367f97',
    inactiveTintColor: '#eee',
    inactiveBackgroundColor: '#3c8da8',
    labelStyle:{flex:2, fontWeight:'bold',fontSize:14},
  },
}

);


export default TabNavigatorExportAll;

