import React from 'react';
import { Image } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {ThemeProvider} from 'react-native-ui-kitten/theme'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HeroDetail from "../../screens/HeroDetail/Main";
import Category from "../../screens/Category";
import Ionicons from 'react-native-vector-icons/Ionicons';



 const HeroDetailStack = createStackNavigator(
  {
    HeroDetail: HeroDetail,
  }
);



HeroDetailStack.navigationOptions = {
  title: "alo12345",
  // headerStyle: {
  //     backgroundColor: '#e5101d',
  //     color:'#fff',
  // },
  // headerTitleStyle: {
  //     color: 'white'
  //   },
  // headerTintColor: '#fff'
}


const TabNavigatorExportAll = createBottomTabNavigator(
  {
    HeroDetail: HeroDetailStack,
},


{
  tabBarOptions: {
    activeTintColor: '#006079',
    activeBackgroundColor: '#eee',
    inactiveTintColor: 'gray',
    labelStyle:{flex:2, fontWeight:'bold',fontSize:13},
  },
}

);


export default TabNavigatorExportAll;

