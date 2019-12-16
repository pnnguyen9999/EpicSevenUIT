import React from 'react';
// import Intl from 'react-native-intl';
import { StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  List,
  Text,
  ApplicationProvider,
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import Modal, { ModalContent } from 'react-native-modals';
import { View } from 'react-native';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterVisible: false,
      loading: true,
      dataGetAll: [],
    };
  }
  arrayholder = [];

  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { height: 60, padding: 0, margin: 0 },
      title: "Heroes list",
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
          <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.toggleDrawer()}>
            <Image
              style={{ width: 32, height: 30, tintColor: "rgba(255,255,255,0.9)" }}
              source={{
                uri:
                  "https://akveo.github.io/eva-icons/outline/png/128/menu-2-outline.png"
              }}
            />
          </TouchableOpacity>
        )
      },
    }
  }
  //  -----------------------------

  //  ----------------------------- ALLFUNCTION
  componentDidMount() {
    this.getDataAll()
  }


  getDataAll = async () => {
    fetch("https://api.epicsevendb.com/api/hero")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: this.state.dataGetAll.concat(responseJson.results)
        })
        this.arrayholder = responseJson.results;
      })
      .catch(error => console.log(error))
  }

  handleLoadMoreAll = () => {
    this.setState(
      {
        loadMoreAll: this.state.loadMoreAll + 1,
        loading: true
      },
      this.getDataAll
    )
  }

  //  -----------------------------

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name}`;
      const itemDataUpp = itemData.toUpperCase();
      const textData = text.toUpperCase();
      return itemDataUpp.indexOf(textData) > -1;
    });
    this.setState({ dataGetAll: newData });
  };

  filter = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.element} ${item.classType}`;
      const itemDataUpp = itemData.toUpperCase();
      const textData = text.toUpperCase();
      return itemDataUpp.indexOf(textData) > -1;
    });
    this.setState({ dataGetAll: newData });
  };


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


    const renderHeroItems = ({ item, index }) => (
      <>
        <TouchableOpacity onPress={() => {
          AsyncStorage.setItem('heroID', item._id);
          this.props.navigation.navigate('HeroDetail', {
            heroID: item._id
          });
        }} style={{}}>

          <View width={(Dimensions.get('window').width / 4) - 15} height={130} style={{
            alignItems: 'center', alignContent: 'center', borderRadius: 5, borderColor: "#DDD",
            margin: 5, marginBottom: 0, marginTop: 2, paddingTop: 0, backgroundColor: "transparent",
          }}>
            <Image source={{ uri: "https://assets.epicsevendb.com/hero/" + item._id + "/icon.png" }}
              style={
                (item.element == "fire") ? styles.element1 :
                  (item.element == "ice") ? styles.element2 :
                    (item.element == "earth") ? styles.element3 :
                      (item.element == "light") ? styles.element4 :
                        (item.element == "dark") ? styles.element5 :
                          styles.listItemName}></Image>
            <Text numberOfLines={2} style={{ padding: 7, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, fontSize: 13, lineHeight: 15, color: '#fff' }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </>
    );

    //  -----------------------------
    
 
  
    return (
      <ImageBackground source={require("../images/background.jpg")} style={{ flex: 1, resizeMode: 'contain', justifyContent: 'center', backgroundColor: '#eee' }}>
       <Modal
        modalStyle={{width:dimensions.width - 50, height:200}}
        visible={this.state.filterVisible}
        onTouchOutside={() => {
          this.setState({ filterVisible: false });
        }}
       >
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <View style={{margin:5}}>
            <Text style={{padding:10,textAlign:'center', fontSize:17, fontWeight:'bold'}}>Element</Text>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('fire')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_profire.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('ice')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_proice.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('earth')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_proearth.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('light')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_promlight.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('dark')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_promdark.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{margin:5}}>
            <Text style={{padding:10,textAlign:'center', fontSize:17, fontWeight:'bold'}}>Class</Text>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('knight')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_knight.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('warrior')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_warrior.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('thief')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_thief.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('mage')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_mage.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('soul-weaver')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_soul-weaver.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('ranger')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_ranger.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5}} onPress={()=>this.filter('material')}>
                      <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_material.png" }} 
                             style={{ width: 30, height: 30 }}></Image>
                </TouchableOpacity>
              </View>
            </View>


          </ApplicationProvider>
        </View>
      </Modal>
    
        <View style={{ padding: 5, flexDirection: 'row' }}>
          <TextInput
            placeholder="Search hero ..."
            style={{ width: dimensions.width - 80, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 5, color: "#3c8da8", height: 40, margin: 12 }}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            size="small"
          />
          <TouchableOpacity onPress={() => {this.setState({ filterVisible: true }); }}>
            <Image
              style={{ width: 35, height: 35, marginVertical: 12, tintColor: "rgba(255,255,255,0.9)" }}
              source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/funnel-outline.png' }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{}}>

          <View style={{ marginTop: 5, paddingBottom: 10, backgroundColor: 'transparent', marginHorizontal: 0, borderBottomWidth: 1, borderColor: "#DDD" }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <List
                nestedScrollEnabled={true}
                style={{ backgroundColor: 'transparent' }}
                numColumns={4}
                renderItem={renderHeroItems}
                data={this.state.dataGetAll}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 30 }}>
            <ActivityIndicator size='small'></ActivityIndicator>
            <Text style={{ textAlign: "center", paddingHorizontal: 5, color: "#fff", fontSize: 15 }}>still loading</Text>
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
  element1: {
    width: 70, height: 70, alignSelf: 'center', borderRadius: 50, borderWidth: 3, borderColor: '#f44336'
  },
  element2: {
    width: 70, height: 70, alignSelf: 'center', borderRadius: 50, borderWidth: 3, borderColor: '#2196F3'
  },
  element3: {
    width: 70, height: 70, alignSelf: 'center', borderRadius: 50, borderWidth: 3, borderColor: '#4CAF50'
  },
  element4: {
    width: 70, height: 70, alignSelf: 'center', borderRadius: 50, borderWidth: 3, borderColor: '#FDD835'
  },
  element5: {
    width: 70, height: 70, alignSelf: 'center', borderRadius: 50, borderWidth: 3, borderColor: '#9C27B0'
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

