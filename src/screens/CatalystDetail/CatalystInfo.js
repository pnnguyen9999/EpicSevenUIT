import React from 'react';
// import Intl from 'react-native-intl';
import { StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
import { createAppContainer, navigationOptions } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


const SAMPLE_DATA = {
  title: 'Item',
};

const StarIcon = (style) => (
  <Icon {...style} name='star' />
);


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // _ArrGetAll:
      get_failed: 0,
      dataGetAll: [],
      dataGetApShops: [],
      dataGetLocations: [],
    };
  }

  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { height: 60, padding: 0, margin: 0 },
      title: "Catalyst Info",
      headerStyle: {
        backgroundColor: '#3c8da8',
        color: '#fff',
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: '#fff',
      headerLeft: () => {
        return (
          <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.navigate('Catalyst')}>
            <Image
              style={{ width: 32, height: 32, tintColor: "rgba(255,255,255,0.9)" }}
              source={{
                uri:
                  "https://akveo.github.io/eva-icons/outline/png/128/arrow-left-outline.png"
              }}
            />
          </TouchableOpacity>
        )
      }
    }
  }
  //  -----------------------------

  //  ----------------------------- ALLFUNCTION
  componentDidMount = async () => {
    log = await AsyncStorage.getItem('heroID');
    this.getDataAll()
  }


  getDataAll = async () => {
    const propsFromMessages = this.props.navigation.state.params;
    //alert(propsFromMessages.catalystID);



    fetch("https://api.epicsevendb.com/api/item/" + propsFromMessages.catalystID + "")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: responseJson.results[0],
          dataGetApShops: responseJson.results[0].apShops,
          dataGetLocations: responseJson.results[0].locations,
        })
      })
      .catch(error => console.log(error))

  }

  //  -----------------------------

  //  ----------------------------- RENDER SOMETHING
  renderFooter = () => {
    return (
      <ActivityIndicator size="large" loading={this.state.loading} style={{ alignSelf: "center" }}></ActivityIndicator>
    )
  };


  _onError = () => {
    this.setState({ get_failed: 1 })
  }





  render() {
    const dimensions = Dimensions.get('window');
    const screenWidth = (dimensions.width);
    const { navigate } = this.props.navigation;

    //  -----------------------------

    const renderLocation = ({ item, index }) => (
      <View key={index} style={{ width: screenWidth, flexDirection: 'column', marginHorizontal: 30, marginVertical:5 }}>
        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 25, padding:2 }}><Text style={{fontWeight: 'bold',color: "#AA735E", textDecorationLine:'underline'}}>Node:</Text> {item.node}</Text>
        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 25, padding:2 }}><Text style={{fontWeight: 'bold',color: "#5FAA5E", textDecorationLine:'underline'}}>Name:</Text> Name: {item.name}</Text>
        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 25, padding:2 }}><Text style={{fontWeight: 'bold',color: "#AAA256", textDecorationLine:'underline'}}>Mob Count:</Text> {item.mobcount}</Text>
      </View>
    );

    const renderApShops = ({ item, index }) => (
      <View key={index} style={{ width: screenWidth, flexDirection: 'column', marginHorizontal: 30, marginVertical:5 }}>
        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 25, padding:2 }}><Text style={{fontWeight: 'bold',color: "#6BD4D2", textDecorationLine:'underline'}}>Chapter:</Text> {item.chapter}</Text>
        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 25, padding:2 }}><Text style={{fontWeight: 'bold',color: "#6BD4D2", textDecorationLine:'underline'}}>Quantity:</Text> Name: {item.quantity}</Text>
        <Text style={{ color: "#fff", fontSize: 15, lineHeight: 25, padding:2 }}><Text style={{fontWeight: 'bold',color: "#6BD4D2", textDecorationLine:'underline'}}>Cost:</Text> {item.cost}</Text>
      </View>
    );

    const propsFromMessages = this.props.navigation.state.params;
    console.log(this.state.dataGetApShops[0]);
    //console.log(this.state.dataGetAll.specialtySkill.name)
    // alert(this.state.get_failed)
    const width_screen = Dimensions.get('window').width;
    return (
      <ImageBackground source={require("../../images/background.jpg")} style={{ justifyContent: 'center', resizeMode: 'contain', flex: 1 }}>
        <ScrollView style={{}}>

          <View style={{ flexDirection: 'column' }}>
            <Image source={{ uri: "https://assets.epicsevendb.com/item/" + this.state.dataGetAll._id + ".png" }}
              style={{ width: 110, height: 110, alignSelf: 'center', margin: 8 }}></Image>
            <Text style={{
              flexWrap: 'wrap',
              width: width_screen / 1.5,
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold',
              paddingHorizontal: 25,
              textAlign: 'center',
              alignSelf: 'center',
              lineHeight: 30,
            }} >{this.state.dataGetAll.name}</Text>
          </View>

          <View style={{ flexDirection: 'column', marginTop: 28 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 23, fontWeight: 'bold', lineHeight: 27, padding: 10 }}>Description</Text>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15, flexWrap: 'wrap', width: width_screen / 1.5, alignSelf: 'center' }}>{this.state.dataGetAll.description}</Text>
          </View>

          <View style={{ flexDirection: 'column', marginTop: 28 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 23, fontWeight: 'bold', lineHeight: 27, padding: 10 }}>Location</Text>
            <FlatList
              style={{ backgroundColor: 'transparent', marginTop: 5 }}
              data={this.state.dataGetLocations}
              renderItem={renderLocation}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>

          <View style={{ flexDirection: 'column', marginTop: 28 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 23, fontWeight: 'bold', lineHeight: 27, padding: 10 }}>AP Shop</Text>
            <FlatList
              style={{ backgroundColor: 'transparent', marginTop: 5 }}
              data={this.state.dataGetApShops}
              renderItem={renderApShops}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>








        </ScrollView>
      </ImageBackground>
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
  },


});


