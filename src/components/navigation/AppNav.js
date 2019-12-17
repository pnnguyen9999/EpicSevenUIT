import React from 'react';
import { Text, View, Image } from 'react-native';
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
      navigationOptions: {
        drawerLabel: "Hero List",
        drawerIcon: ({ tintColor }) => (
          <Image
            source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/shield-outline.png' }}
            resizeMode="contain"
            style={{ width: 22, height: 22, tintColor: tintColor }}
          />
        )
      }
    },
    Catalyst: {
      screen: Hero,
      navigationOptions: {
        drawerLabel: "Catalyst",
        drawerIcon: ({ tintColor }) => (
          <Image
            source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/pantone-outline.png' }}
            resizeMode="contain"
            style={{ width: 22, height: 22, tintColor: tintColor }}
          />
        )
      }
    },
    Artifacts: {
      screen: Hero,
      navigationOptions: {
        drawerLabel: "Artifacts",
        drawerIcon: ({ tintColor }) => (
          <Image
            source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/smartphone-outline.png' }}
            resizeMode="contain"
            style={{ width: 22, height: 22, tintColor: tintColor }}
          />
        )
      }
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

