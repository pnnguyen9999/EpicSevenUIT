import React from 'react';
// import Intl from 'react-native-intl';
import { StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, ImageBackground}  from 'react-native';
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
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStore } from 'redux';

const SearchBar = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/funnel.png' }}
  />
);

const TestIcon1 = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/pantone.png' }}
  />
);

const TestIcon2 = (style) => (
  <Image
    style={{ width: 70, height: 70 }}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/shake.png' }}
  />
);

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
      loading: true,
      // _ArrTrending:
      dataTrending: [],
      // _ArrSale:
      dataSale: [],
      // _ArrGetAll:
      dataGetAll: [],
      // _LoadmoreSale:
      loadMoreSale: 3,
      // _LoadmoreTrending:
      loadMoreTrending: 3,
      // _LoadmoreAll:
      loadMoreAll: 11,
    };
  }

  
  



  //  ----------------------------- RENDER HEADER
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {height: 60, padding:0, margin:0},
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
          <TouchableOpacity style={{paddingLeft:15}} onPress={() => navigation.toggleDrawer()}>
            <Image
              style={{width:32,height:30,tintColor:"rgba(255,255,255,0.9)"}}
              source={{
                uri:
                  "https://akveo.github.io/eva-icons/outline/png/128/menu-2-outline.png"
              }}
            />
          </TouchableOpacity>
        )
    }
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
    this.getDataAll()
    // // -- redux practice
    // // state
    // let appState = { number: 1 }
    // // action
    // const add = {
    //   type: 'ADD',
    //   value: 1
    // }
    // const sub = {
    //   type: 'SUB',
    //   value: 1
    // }
    // // reducer
    // const numberReducer = (state, action) => {
    //   switch(action.type) {
    //     case 'ADD':
    //       state.number += action.value;
    //       break;
    //     case 'SUB':
    //       state.number -= action.value;
    //       break;
    //   }
    //   return state
    // }

    // // store
    // const store = createStore(numberReducer, appState);
    // // Test
    // store.subscribe( () => {
    //   console.log('state updated', store.getState())
    // })
    // store.dispatch(add);
    // store.dispatch(add);

  }


  getDataAll = async () => {
    fetch("https://api.epicsevendb.com/api/hero")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataGetAll: this.state.dataGetAll.concat(responseJson.results)
        })
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
        <TouchableOpacity onPress={() => {
          AsyncStorage.setItem('heroID', item._id);
          this.props.navigation.navigate('HeroDetail',{
            heroID: item._id
          });
        }} style={{}}>

          <View width={(Dimensions.get('window').width / 4) - 15} height={130} style={{
            alignItems: 'center', alignContent: 'center', borderRadius: 5, borderColor: "#DDD",
            margin: 5, marginBottom:0, marginTop:2, paddingTop:0, backgroundColor: "transparent",
          }}>
            <Image source={{ uri: "https://assets.epicsevendb.com/hero/"+item._id+"/icon.png" }} 
            style={
              (item.element == "fire") ? styles.element1 :
                (item.element == "ice") ? styles.element2 :
                  (item.element == "earth") ? styles.element3 :
                    (item.element == "light") ? styles.element4 :
                      (item.element == "dark") ? styles.element5 :
                      styles.listItemName}></Image>
            <Text numberOfLines={2} style={{ padding:7, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, fontSize: 13, lineHeight: 15,color:'#fff' }}>{item.name}</Text>
           
          </View>

        </TouchableOpacity>
      </>
    );

    //  -----------------------------


    return (
      <ScrollView style={{}}>
        <ImageBackground source={require("../images/background.jpg")} style={{ flex: 1,resizeMode: 'contain', justifyContent: 'center', paddingTop: 20, backgroundColor: '#eee' }}>


          <View style={{ marginTop: 5, paddingBottom: 10, backgroundColor: 'transparent', marginHorizontal: 0, borderBottomWidth: 1, borderColor: "#DDD" }}>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
              <List
                nestedScrollEnabled={true}
                style={{ backgroundColor: 'transparent' }}
                numColumns={4}
                renderItem={renderItemDecu}
                data={this.state.dataGetAll}
                showsHorizontalScrollIndicator={false}
              // ListFooterComponent={this.renderFooter}
              // onEndReached={this.handleLoadMoreAll}
              // onEndReachedThreshold={0.1}
              />
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',padding:30}}>
          <ActivityIndicator size='small'></ActivityIndicator>
            <Text style={{ textAlign: "center", paddingHorizontal:5, color: "#fff",fontSize:15 }}>still loading</Text>
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
  element1: {
    width: 70, height: 70, alignSelf: 'center',borderRadius: 50,borderWidth:3,borderColor:'#f44336'
  },
  element2: {
    width: 70, height: 70, alignSelf: 'center',borderRadius: 50,borderWidth:3,borderColor:'#2196F3'
  },
  element3: {
    width: 70, height: 70, alignSelf: 'center',borderRadius: 50,borderWidth:3,borderColor:'#4CAF50'
  },
  element4: {
    width: 70, height: 70, alignSelf: 'center',borderRadius: 50,borderWidth:3,borderColor:'#FDD835'
  },
  element5: {
    width: 70, height: 70, alignSelf: 'center',borderRadius: 50,borderWidth:3,borderColor:'#9C27B0'
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




// cái này k cần thiết nữa

// class LogoTitle extends React.Component {

//   render() {

//     return (
//       <React.Fragment>
//         <View style={{ width: '100%', height: 100, backgroundColor: "#e5101d" }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//             <Text style={{ textAlign: "center", fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginTop: 15, color: '#fff' }}>KANTA</Text>
//             <Text style={{ textAlign: "center", fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginTop: 15, color: '#FECB01' }}> APP</Text>
//           </View>
//           <View style={{ paddingHorizontal: 15, }}>
//             <TouchableOpacity style={{
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: "#fff", shadowColor: 'black',
//               shadowOpacity: 0.26,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 10,
//               elevation: 15, borderRadius: 5, color: "#b0b0b0", height: 38
//             }
//             }
//               onPress={() => navigation.navigate("TimKiem")}
//               activeOpacity={0.8}>
//               <Text style={{ textAlign: 'left', color: "#959595" }}>tìm kiếm sản phẩm... </Text>
//               <Image
//                 style={{ width: 20, height: 20 }}
//                 tintColor='#959595'
//                 source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/search-outline.png' }}
//               />

//             </TouchableOpacity>
//           </View>
//         </View>
//       </React.Fragment>
//     );
//   }
// }

// HomePage.navigationOptions = {
//   title: "1233",
//   // header: () => <LogoTitle />,
// }

