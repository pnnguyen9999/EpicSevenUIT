import React from 'react';
// import Intl from 'react-native-intl';
import { StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
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
      dataGetAll: [],
      heroData: []
    };
  }

  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {height: 60, padding:0, margin:0},
      title: "Heroes Info",
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
          <TouchableOpacity style={{paddingLeft:15}} onPress={() => navigation.navigate('Main')}>
            <Image
              style={{width:32,height:32,tintColor:"rgba(255,255,255,0.9)"}}
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
  componentDidMount() {
    this.getDataAll()
  }


  getDataAll = async () => {
    const propsFromMessages = this.props.navigation.state.params;
    fetch("https://api.epicsevendb.com/api/hero/"+propsFromMessages.heroID+"")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: responseJson.results[0],
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

  
  render() {
    const dimensions = Dimensions.get('window');
    const imageWidth = (dimensions.width / 2) - ((dimensions.width * 8) / 100);
    const { navigate } = this.props.navigation;



    // VERTICAL SLIDER
    const renderItemDecu = ({ item, index }) => (
      <>
        <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{}}>
          <View width={(Dimensions.get('window').width / 4) - 15} height={130} style={{
            alignItems: 'center', alignContent: 'center', borderRadius: 5, borderColor: "#DDD",
            margin: 5, marginBottom:0, marginTop:2, paddingTop:0, backgroundColor: "transparent",
          }}>
            <Image source={{ uri: "https://assets.epicsevendb.com/hero/"+item._id+"/icon.png" }} style={{ width: 70, height: 70, alignSelf: 'center',borderRadius: 5, }}></Image>
            <Text numberOfLines={2} style={{ padding:7, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, fontSize: 13, lineHeight: 15,color:'#323232' }}>{item.name}</Text>
           
          </View>

        </TouchableOpacity>
      </>
    );

    //  -----------------------------

    renderZodiac = (sign) => {
        if (sign == "aries") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/1_aries.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "taurus") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/2_taurus.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "gemini") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/3_gemini.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "cancer") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/4_cancer.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "leo") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/5_leo.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "virgo") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/6_virgo.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "libra") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/7_libra.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "scorpio") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/8_scorpio.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "sagittarius") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/9_sagittarius.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "capricorn") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/10_capricorn.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "aquarius") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/11_aquarius.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }
        if (sign == "pisces") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/12_pisces.png" }} style={{ width: 35, height: 35 }}></Image>
            )
        }

    }
    
    renderElement = (sign) => {
        if (sign == "fire") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_profire.png" }} style={{ width: 30, height: 30 }}></Image>
            )
        }
        if (sign == "ice") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_proice.png" }} style={{ width: 30, height: 30 }}></Image>
            )
        }
        if (sign == "earth") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_proearth.png" }} style={{ width: 30, height: 30 }}></Image>
            )
        }
        if (sign == "light") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_promlight.png" }} style={{ width: 30, height: 30 }}></Image>
            )
        }
        if (sign == "dark") {
            return (
                <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_promdark.png" }} style={{ width: 30, height: 30 }}></Image>
            )
        }
    }

    renderClassType = (sign) => {
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
        if (sign == "light") {
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

    const propsFromMessages = this.props.navigation.state.params;
    console.log(this.state.dataGetAll)
    return ( 
      <ScrollView style={{backgroundColor: '#eee'}}>
          <ImageBackground source={require("../../images/background.jpg")} style={{flex:1,resizeMode: 'cover'}}>
        <View style={{flex:1,padding:10,paddingTop:20,paddingBottom:5,flexDirection:'row',justifyContent:'space-around'}}>
            <View style={{flexDirection:'row'}}>
                {renderElement(this.state.dataGetAll.element)}
                <Text style={{ padding:5, fontSize: 17, fontWeight: 'bold',color:"#fff" }}>{this.state.dataGetAll.element}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                {renderClassType(this.state.dataGetAll.classType)}
                <Text style={{ padding:5, fontSize: 17, fontWeight: 'bold',color:"#fff" }}>{this.state.dataGetAll.classType}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                {renderZodiac(this.state.dataGetAll.zodiac)}
                <Text style={{ padding:5, fontSize: 17, fontWeight: 'bold',color:"#fff" }}>{this.state.dataGetAll.zodiac}</Text>
            </View>
            
        </View>
        <View style={{flex:1,flexDirection:'row',padding:10,paddingLeft:20}}>
            <Text style={{ fontSize:32, fontWeight:'bold',lineHeight:32,color:"#fff" }}>{this.state.dataGetAll.name}</Text>
        </View>
        <Text style={{flex:1,paddingLeft:20, fontStyle:'italic',color:"#fff" }}>{this.state.dataGetAll.description}</Text>

        <View style={{height:400,padding:5,flexDirection:'column',justifyContent:'center',marginTop:95}}>
        <Image source={{ uri: "https://assets.epicsevendb.com/herofull/"+propsFromMessages.heroID+".png" }} 
               style={{ alignSelf: 'center',borderRadius: 5,width:320,height:600}} resizeMode={'contain'} ></Image>
        </View>
        </ImageBackground>
      </ScrollView>
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


