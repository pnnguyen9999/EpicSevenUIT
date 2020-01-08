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
      title: "Artifact list",
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
    fetch("https://api.epicsevendb.com/api/artifact")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: this.state.dataGetAll.concat(responseJson.results)
        })
        this.arrayholder = responseJson.results;
      })
      .catch(error => console.log(error))
  }

  searchFilterFunction = text => {
    arr = "",
      this.setState({
        value: text,
      });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name} ${item.zodiac}`;
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
          this.props.navigation.navigate('ArtifactDetail', {
            artifactID: item._id
          });
        }} style={{}}>

          <View width={(Dimensions.get('window').width / 2) - 15} height={300} style={{
            alignItems: 'center', alignContent: 'center', borderRadius: 5, borderColor: "#DDD",
            margin: 5, marginBottom: 0, marginTop: 2, paddingTop: 0, backgroundColor: "transparent",
          }}>
            <Image source={{ uri: "https://assets.epicsevendb.com/artifact/" + item._id + "/full.png" }}
              style={
                {width: (Dimensions.get('window').width / 2) - 30, height: 250, alignSelf: 'center', borderRadius:10}}></Image>
            <Text numberOfLines={2} style={{ padding: 7, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, fontSize: 13, lineHeight: 15, color: '#fff' }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </>
    );

    //  -----------------------------



    return (
      <ImageBackground source={require("../images/background.jpg")} style={{ flex: 1, resizeMode: 'contain', justifyContent: 'center', backgroundColor: '#eee' }}>
            <View style={{ padding: 5, }}>
              <TextInput
                placeholder="Search Catalyst ..."
                style={{ paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 5, color: "#3c8da8", height: 40, margin: 12 }}
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                size="small"
              />
            </View>
        <ScrollView style={{ paddingTop: 10 }}>

          <View style={{ marginTop: 5, paddingBottom: 10, backgroundColor: 'transparent', marginHorizontal: 0, borderBottomWidth: 1, borderColor: "#DDD" }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <List
                nestedScrollEnabled={true}
                style={{ backgroundColor: 'transparent' }}
                numColumns={2}
                renderItem={renderHeroItems}
                data={this.state.dataGetAll}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 30 }}>
            <ActivityIndicator size='small'></ActivityIndicator>
            <Text style={{ textAlign: "center", paddingHorizontal: 5, color: "#fff", fontSize: 15 }}>still loading</Text>
          </View> */}

        </ScrollView>

      </ImageBackground>
    );
  }
}


