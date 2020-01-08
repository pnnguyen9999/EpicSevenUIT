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

var log;
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // _ArrGetAll:
      get_failed: 0,
      dataGetAll: [],
      dataGetStats: [],
      dataGetRelations: [],
      dataGetSpecial: [],
      heroData: []
    };
  }

  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { height: 60, padding: 0, margin: 0 },
      title: "Biography",
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
          <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.navigate('HeroMain')}>
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
    fetch("https://api.epicsevendb.com/api/hero/" + log + "")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: responseJson.results[0],
          dataGetStats: responseJson.results[0].specialtySkill.stats,
          dataGetSpecial: responseJson.results[0].specialtySkill,
          dataGetRelations: responseJson.results[0].relations,
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
    const imageWidth = (dimensions.width / 2) - ((dimensions.width * 20) / 150);
    const { navigate } = this.props.navigation;

    // Relationship
    const renderRelationsItems = ({ item, index }) => (
      <View key={index} style={{ width: imageWidth, flexDirection: 'row', margin: 15 }}>
        <Image source={{ uri: "https://assets.epicsevendb.com/hero/" + item._id + "/icon.png" }}
          style={{ width: 70, height: 70 }}></Image>
        <View style={{ flexDirection: 'column', margin: 10, }}>
          <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: '#fff', fontWeight: 'bold', width: imageWidth - 70 }}>{item.name}</Text>
          <Text style={{ color: '#fff', width: imageWidth - 70 }}>{item.relationType}</Text>
        </View>
      </View>
    );

    //  -----------------------------



    const propsFromMessages = this.props.navigation.state.params;
    console.log(this.state.dataGetRelations)
    //console.log(this.state.dataGetAll.specialtySkill.name)
    // alert(this.state.get_failed)
    const width_screen = Dimensions.get('window').width;
    return (

      <ImageBackground source={require("../../images/background.jpg")} style={{ justifyContent: 'center', resizeMode: 'contain', flex: 1 }}>
        <ScrollView style={{ }}>
          <View style={{ height: 120, flexDirection: 'column' }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 25, textAlign: 'center' }}>Story Stats</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Command</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>{this.state.dataGetStats.command}</Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Charm</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>{this.state.dataGetStats.charm}</Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Politics</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>{this.state.dataGetStats.politics}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', margin: 20 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 15, textAlign: 'center' }}>Background</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetAll.background}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', margin: 20, marginTop: 0 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 15, textAlign: 'center' }}>Character Relations</Text>
            <View style={{ justifyContent: 'center' }}>
              <FlatList
                numColumns={2}
                style={{ alignSelf: 'center' }}
                renderItem={renderRelationsItems}
                data={this.state.dataGetRelations}
                keyExtractor={(item, index) => index.toString()}
              >
              </FlatList>
            </View>
          </View>

          <View style={{ flexDirection: 'column', margin: 20, marginTop: 5 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 15, textAlign: 'center' }}>Specialty</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: "https://assets.epicsevendb.com/hero/_placeholder/sk_missing.png" }} style={{ width: 70, height: 70, alignSelf: 'flex-start' }}></Image>
              <View style={{ paddingLeft: 10, flexDirection: 'column' }}>
                <Text style={{ color: '#fff', padding: 5, fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>{this.state.dataGetSpecial.name}</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#90CAF9', padding: 5, fontWeight: 'bold' }}>{this.state.dataGetSpecial.dispatch}</Text>
                  <Text style={{ color: '#fff', padding: 5 }}>{this.state.dataGetSpecial.enhancement}</Text>
                </View>
              </View>
            </View>
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


