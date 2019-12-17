import React from 'react';
import { Image } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {ThemeProvider} from 'react-native-ui-kitten/theme'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HeroList from "../../screens/HeroList";
import Category from "../../screens/Category";
import Ionicons from 'react-native-vector-icons/Ionicons';



 const HeroListStack = createStackNavigator(
  {
    HeroList: HeroList,
  }
);

const CategoryStack = createStackNavigator(
  {
    Category: Category,
  }
);


HeroListStack.navigationOptions = {
  title: "Heroes list",
  // headerStyle: {
  //     backgroundColor: '#e5101d',
  //     color:'#fff',
  // },
  // headerTitleStyle: {
  //     color: 'white'
  //   },
  // headerTintColor: '#fff'
}


CategoryStack.navigationOptions = {
  title: "Category",
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
    HeroList: HeroListStack,
    Category: CategoryStack,
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

