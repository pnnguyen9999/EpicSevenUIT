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

// const HomeIcon = () => (
//   <Image
//     style={{width:25,height}}
//     source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png'}}
//   />
// );

// const Category = (style) => (
//   <Image
//     style={style}
//     source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/list.png'}}
//   />
// );

// const Search = (style) => (
//   <Image
//     style={style}
//     source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/search.png'}}
//   />
// );

// const Personal = (style) => (
//   <Image
//     style={style}
//     source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/person.png'}}
//   />
// );

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// // cài đặt bottom navigator
// const themeBtt = {
//   activeTintColor: 'tomato',
//   inactiveTintColor: 'gray',
// };

// export const BottomNavigationShowcase = (props) => {

//   const onTabSelect = (selectedIndex) => {
//     const routes = props.navigation.state.routes;
//     const selectedRoute = routes[selectedIndex];
//     props.navigation.navigate(selectedRoute.routeName);
//   };
 
//   return (
//     <ThemeProvider theme={{}}>
//     <BottomNavigation
//       selectedIndex={props.navigation.state.index}
//       onSelect={onTabSelect}
//       indicatorStyle={{backgroundColor:"#ff5722"}}
//       >
//       <BottomNavigationTab title='Trang Chủ' icon={HomeIcon} />
//       <BottomNavigationTab title='Danh Mục' icon={Category}/>
//       <BottomNavigationTab title='Tìm Kiếm' icon={Search}/>
//       <BottomNavigationTab title='Cá Nhân' icon={Personal}/>
//     </BottomNavigation>
//     </ThemeProvider>
//    );
//  }
 
 // cài đặt bottom navigator

 // Cài đặt stack navigator

 const HeroListStack = createStackNavigator(
  {
    HeroList: HeroList,
  },
  config
);

// const TimKiemStack = createStackNavigator(
//   {
//     TimKiem: TimKiem,
//     KetQuaTimKiem: KetQuaTimKiem,
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     }
//    },
//   config
// );

// const DanhMucStack = createStackNavigator(
//   {
//     DanhMuc: DanhMuc,
//     DanhMucLv2:DanhMucLv2,
//     DanhMucLv3:DanhMucLv3,
//   },
//   {
//     defaultNavigationOptions: {
//       title: "Danh mục",
//       headerStyle: {
//           backgroundColor: '#e5101d',
//           color: '#fff',
//       },
//       headerTitleStyle: {
//           color: 'white'
//       },
//       headerTintColor: '#fff'
//     },
//    },
//   config
// );

// DanhMucStack.navigationOptions = {
//   title: "Danh Mục",
//   headerStyle: {
//       backgroundColor: '#e5101d',
//       color:'#fff',
//   },
//   headerTitleStyle: {
//       color: 'white'
//     },
//   headerTintColor: '#fff'
// }

// export default createBottomTabNavigator(
//   {
//     Home: HomeScreen,
//     Settings: SettingsScreen,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         return <IconComponent name={iconName} size={25} color={tintColor} />;
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//   }
// );

 // Cài đặt stack navigator

 const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'HeroList') {
    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    iconName = `ios-home`
    // We want to add badges to home tab icon

  } else if (routeName === 'DanhMuc') {
    // iconName = `ios-options${focused ? '' : '-outline'}`;
    iconName = `ios-list`
  } else if (routeName === 'TimKiem') {
    // iconName = `ios-options${focused ? '' : '-outline'}`;
    iconName = `ios-search`
  } else if (routeName === 'CaNhan') {
    // iconName = `ios-options${focused ? '' : '-outline'}`;
    iconName = `ios-contact`
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

HeroListStack.navigationOptions = {
  title: "All Heroes",
}
// DanhMucStack.navigationOptions = {
//   title: "Danh Mục",
// }
// TimKiemStack.navigationOptions = {
//   title: "Tìm Kiếm",
// }
// CaNhan.navigationOptions = {
//   title: "Cá Nhân",
// }

const TabNavigatorExportAll = createBottomTabNavigator(
  {
    HeroList: HeroListStack,
    Category: Category,
},
// {
//   initialRouteName: 'TrangChu',
//   tabBarComponent: BottomNavigationShowcase,
// },

{
  // defaultNavigationOptions: ({ navigation }) => ({
  //   tabBarIcon: ({ focused, tintColor }) =>
  //     getTabBarIcon(navigation, focused, tintColor),
  // }),
  tabBarOptions: {
    activeTintColor: '#006079',
    activeBackgroundColor: '#eee',
    inactiveTintColor: 'gray',
    // tabStyle: {height:10},
    labelStyle:{flex:2, fontWeight:'bold',fontSize:13},
    
  },
}

);


export default TabNavigatorExportAll;

