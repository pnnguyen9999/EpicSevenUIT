import React from 'react';
import { Image } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {ThemeProvider} from 'react-native-ui-kitten/theme'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ArtifactsList from "../../screens/ArtifactsList";




 const ArtifactsListStack = createStackNavigator(
  {
    ArtifactsList: ArtifactsList,
  }
);



ArtifactsListStack.navigationOptions = {
  title: "Artifacts",
}



const TabNavigatorExportAll = createBottomTabNavigator(
  {
    Artifacts: ArtifactsListStack,
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

