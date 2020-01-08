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
      dataGetExclusive: [],
      dataGetloreDescription: [],
      dataGetStatBase: [],
      dataGetStatMax: [],
      dataGetSkilltMax: [],
      dataGetSkillBase: [],
    };
  }

  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { height: 60, padding: 0, margin: 0 },
      title: "Artifact Info",
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
          <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.navigate('Artifacts')}>
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

    fetch("https://api.epicsevendb.com/api/artifact/" + propsFromMessages.artifactID + "")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: responseJson.results[0],
          dataGetExclusive: responseJson.results[0].exclusive,
          dataGetloreDescription: responseJson.results[0].loreDescription,
          dataGetStatBase: responseJson.results[0].stats.base,
          dataGetStatMax: responseJson.results[0].stats.max,
          dataGetSkillBase: responseJson.results[0].skillDescription.base,
          dataGetSkillMax: responseJson.results[0].skillDescription.max,
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

    const propsFromMessages = this.props.navigation.state.params;
    console.log(this.state.dataGetAll);
    //console.log(this.state.dataGetAll.specialtySkill.name)
    // alert(this.state.get_failed)
    const width_screen = Dimensions.get('window').width;

    renderExclusiveType = (sign) => {
      if (sign == "knight") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_knight.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
      if (sign == "warrior") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_warrior.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
      if (sign == "thief") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_thief.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
      if (sign == "mage") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_mage.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
      if (sign == "soul-weaver") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_soul-weaver.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
      if (sign == "ranger") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_ranger.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
      if (sign == "material") {
        return (
          <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_material.png" }} style={{ width: 30, height: 30 }}></Image>
        )
      }
    }
    renderStar = (count) => {
      var indents = [];
      for (var i = 0; i < count; i++) {
        indents.push(<Image source={{ uri: "https://assets.epicsevendb.com/star/cm_icon_star.png" }} style={{ width: 30, height: 30, marginLeft: -5 }}></Image>);
      }
      return indents;
    }

    return (
      <ImageBackground source={require("../../images/background.jpg")} style={{ justifyContent: 'center', resizeMode: 'contain', flex: 1 }}>
        <ScrollView style={{}}>

          <View style={{ flex: 1, padding: 10, paddingTop: 20, paddingBottom: 5, flexDirection: 'row', textAlign: 'flex-start' }}>

            <View style={{ flexDirection: 'row' }}>
              {renderExclusiveType(this.state.dataGetExclusive[0])}
              <Text style={{ padding: 5, fontSize: 17, fontWeight: 'bold', color: "#fff" }}>{this.state.dataGetExclusive[0]} Exclusive</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 5, paddingLeft: 20 }}>{renderStar(this.state.dataGetAll.rarity)}</View>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingLeft: 20 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', lineHeight: 32, color: "#fff" }}>{this.state.dataGetAll.name}</Text>
          </View>

          <View style={{ height: 510, padding: 5, flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
            <Image source={{ uri: "https://assets.epicsevendb.com/artifact/" + propsFromMessages.artifactID + "/full.png" }}
              style={{ alignSelf: 'center', borderRadius: 5, width: width_screen - 50, height: 500 }} resizeMode={'cover'} ></Image>
          </View>

          <View style={{ flexDirection: 'column', margin: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetloreDescription[0]}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', margin: 20 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 15, textAlign: 'center' }}>Stats</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              
              <View style={{ flexDirection: 'column' }}>
                <Text style={{color: '#fff'}}>Base Attack</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetStatBase.atk}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{color: '#fff'}}>Base HP</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetStatBase.hp}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{color: '#fff'}}>Max Attack</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetStatMax.atk}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{color: '#fff'}}>Max HP</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetStatMax.hp}</Text>
              </View>

            </View>
          </View>

          <View style={{ flexDirection: 'column', margin: 20 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', padding: 15, textAlign: 'center' }}>Skills</Text>
            <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              
              <View style={{ flexDirection: 'column' }}>
                <Text style={{color: '#fff',textAlign: 'center'}}>Base Skill</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetSkillBase}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{color: '#fff',textAlign: 'center'}}>Max Skill</Text>
                <Text style={{ color: '#fff', textAlign: 'center', padding: 5 }}>{this.state.dataGetSkillMax}</Text>
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


