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
import Biography from "../../screens/HeroDetail/Biography"
import Skills from "../../screens/HeroDetail/Skills"
import Category from "../../screens/Category";
import Ionicons from 'react-native-vector-icons/Ionicons';



 const HeroDetailStack = createStackNavigator(
  {
    HeroDetail: HeroDetail,
  }
);

const BiographyStack = createStackNavigator(
  {
    Biography: Biography,
  }
);

const SkillsStack = createStackNavigator(
  {
    Skills: Skills,
  }
);



HeroDetailStack.navigationOptions = {
  title: "Main",
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
    Biography: BiographyStack,
    Skills: SkillsStack,
},


{
  tabBarOptions: {
    activeTintColor: '#333333',
    activeBackgroundColor: '#eee',
    inactiveTintColor: 'gray',
    labelStyle:{flex:2, fontWeight:'bold',fontSize:14},
  },
}

);


export default TabNavigatorExportAll;

