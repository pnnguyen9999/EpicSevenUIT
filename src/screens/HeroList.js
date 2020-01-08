import React from 'react';
// import Intl from 'react-native-intl';
import { StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  List,
  Text,
  Toggle,
  ApplicationProvider,
} from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import Modal, { ModalContent } from 'react-native-modals';
import { AccordionList, Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { View } from 'react-native';

var arr = "";
var count = 0;

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterVisible: false,
      loading: true,
      dataGetAll: [],
      textData: "",
      toggleChecked: false,
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
  //  -----------------------------
  toggleChanged = () => {
    alert('cc')
    this.setState({
      toggleChecked: true,
    });
  }

  searchFilterFunction = text => {
    arr = "",
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

    // if (this.state.textData == "") {
    //   this.setState({
    //     textData : text.toUpperCase()
    //   });
    // } else {
    //   //console.log(this.state.textData);
    // }
    if (this.state.toggleChecked) {
      count++;
      if (count > 3) {
        arr = "";
        count = 0;
      } else {
        arr = arr.concat(text.toUpperCase(), " ");
        console.log(arr);
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.rarity} ${item.element} ${item.classType} ${item.zodiac} ${item.classType} ${item.element} ${item.zodiac} ${item.classType} ${item.zodiac} ${item.element} ${item.classType + ' '}`;

          const itemDataUpp = itemData.toUpperCase();
          // const textData = textData.concat(text.toUpperCase());


          return itemDataUpp.indexOf(arr) > -1;
        });
        this.setState({ dataGetAll: newData });

      }
    } else {
      arr = "";
      const newData = this.arrayholder.filter(item => {
      const itemData = `${item.element} ${item.classType} ${item.zodiac}`;
      const itemDataUpp = itemData.toUpperCase();
      const textData = text.toUpperCase();
      return itemDataUpp.indexOf(textData) > -1;
    });
    this.setState({ dataGetAll: newData });
    }


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

        <Collapse style={{}}>
          <CollapseHeader style={{ backgroundColor: '#63a4b9' }}>
            <View style={{ padding: 5, }}>
              <TextInput
                placeholder="Search hero ..."
                style={{ paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 5, color: "#3c8da8", height: 40, margin: 12 }}
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                size="small"
              />
              <Image
                style={{ width: 22, height: 22, marginVertical: 2, tintColor: "rgba(255,255,255,0.9)", alignSelf: 'center' }}
                source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/arrowhead-down-outline.png' }}
              />
            </View>
          </CollapseHeader>
          <CollapseBody style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#63a4b9', margin: 15, borderRadius: 5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>

            {/* <View style={{ marginBottom: 5 }}>
                <Text style={{ padding: 6, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: "#fff" }}>Rarity</Text>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('1')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/star/cm_icon_star.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('2')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/star/cm_icon_star.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('3')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/star/cm_icon_star.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('4')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/star/cm_icon_star.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('5')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/star/cm_icon_star.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                </View>
              </View> */}

              <View style={{ marginBottom: 5 }}>
                <Text style={{ padding: 6, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: "#fff" }}>Element</Text>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('fire')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_profire.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('ice')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_proice.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('earth')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_proearth.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('light')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_promlight.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('dark')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/attribute/cm_icon_promdark.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginBottom: 5 }}>
                <Text style={{ padding: 6, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: "#fff" }}>Class</Text>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('knight')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_knight.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('warrior')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_warrior.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('thief')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_thief.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('mage')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_mage.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('soul-weaver')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_soul-weaver.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('ranger')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_ranger.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('material')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/class/cm_icon_role_material.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginBottom: 5 }}>
                <Text style={{ padding: 6, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: "#fff" }}>Zodiac</Text>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: 250 }}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('aries')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/1_aries.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('taurus')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/2_taurus.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('gemini')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/3_gemini.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('cancer')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/4_cancer.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('leo')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/5_leo.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('virgo')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/6_virgo.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('libra')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/7_libra.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('scorpio')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/8_scorpio.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('sagittarius')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/9_sagittarius.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('capricorn')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/10_capricorn.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('aquarius')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/11_aquarius.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.filter('pisces')}>
                    <Image source={{ uri: "https://assets.epicsevendb.com/zodiac-sign/12_pisces.png" }}
                      style={{ width: 30, height: 30 }}></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', padding: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#367f97', paddingHorizontal: 5, borderRadius: 10, marginHorizontal: 5 }} onPress={() => this.searchFilterFunction("")}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>show all</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>|</Text>
                <Toggle
                  style={{ marginHorizontal: 5 }}
                  size="small"
                  text={`multiple filter`}
                  textStyle={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}
                  checked={this.state.toggleChecked}
                  onChange={() => this.setState({
                    toggleChecked: !this.state.toggleChecked,
                  })}
                />
              </View>


            </View>
          </CollapseBody>
        </Collapse>
        <ScrollView style={{ paddingTop: 10 }}>

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

