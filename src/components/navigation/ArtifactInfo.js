import React from 'react';
import { Image } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {ThemeProvider} from 'react-native-ui-kitten/theme'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ArtifactDetail from "../../screens/ArtifactsDetail/ArtifactInfo";



 const ArtifactStack = createStackNavigator(
  {
    ArtifactDetail: ArtifactDetail,
  }
);



ArtifactStack.navigationOptions = {
  title: "Info",
}


const TabNavigatorExportAll = createBottomTabNavigator(
  {
    ArtifactDetail: ArtifactStack,
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

