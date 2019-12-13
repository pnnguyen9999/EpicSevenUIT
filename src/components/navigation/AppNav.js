import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';
import HeroMain from './Hero';
import HeroInfo from './HeroInfo';



const DrawerCustom = (props) => (
  <View style={{paddingTop: 60, flex: 1, backgroundColor: "#3c8da8"}}>
    <DrawerItems {...props} />
  </View>
)

const Hero = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  HeroMain: {
    screen: HeroMain,
  },
  HeroInfo: {
    screen: HeroInfo,
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 })

 const drawer = createDrawerNavigator(
  {
    Main: {
      screen: Hero,
    },
    Main2: {
      screen: HeroMain,
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

