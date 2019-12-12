import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import BottomNavigation from './BottomNavigation';
import HeroInfo from './HeroInfo';



const DrawerCustom = (props) => (
  <View style={{paddingTop: 25, flex: 1, backgroundColor: "#3c8da8"}}>
    <DrawerItems {...props} />
  </View>
)

const Hero = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: BottomNavigation,
  HeroInfo: HeroInfo,
})

 const drawer = createDrawerNavigator(
  {
    Main: {
      screen: Hero,
    },
    Main2: {
      screen: BottomNavigation,
    },
  },
  {
    contentComponent: DrawerCustom,
    contentOptions: {
      activeTintColor:"#fff",
      inactiveTintColor:"#fff",
      activeBackgroundColor: "#006079"
    }
  }
)

const App = createAppContainer(drawer);
export default App;

