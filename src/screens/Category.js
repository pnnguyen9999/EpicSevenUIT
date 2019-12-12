import React from 'react';
// import Intl from 'react-native-intl';
import { StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Input,
  Layout,
  List,
  Text,
  ListItem,
  Button
} from 'react-native-ui-kitten';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {height: 60},
      title: "Category",
      headerStyle: {
          backgroundColor: '#3c8da8',
          color: '#fff',
      },
      headerTitleStyle: {
          color: 'white'
      },
      headerTintColor: '#fff',
      // headerTitle: (
      //   <React.Fragment>
      //     <View style={{ width: '100%', height: 60, backgroundColor: "#3c8da8",position:'absolute',alignContent:'center',justifyContent:'center' }}>
      //      <Text style={{fontSize:23, alignSelf:'flex-start',color:'#fff', padding:15}}>Heroes list</Text>
      //     </View>
      //   </React.Fragment>
      // )
    }
  }
  //  -----------------------------

  //  ----------------------------- ALLFUNCTION
  componentDidMount() {
    this.getDataTrending()
  }

  getDataTrending = async () => {
    fetch("http://35.221.157.44:9000/product/trending/get?page=" + this.state.loadMoreTrending + "&number=10")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataTrending: this.state.dataTrending.concat(responseJson.data)
        })
      })
      .catch(error => console.log(error))
  }

  
  render() {
    
    return (
      <View style={{flex:1,justifyContent:"center"}}>
        <Text>Category</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
  },
  slider: {
    height: 100,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  titleText: {
    // textDecorationLine:'underline',
    textAlign: "left",
    color: "#373737",
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 15,
    marginBottom: 5,
  }

});

