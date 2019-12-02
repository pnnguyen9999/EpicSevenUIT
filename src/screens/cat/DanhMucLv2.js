import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Text, View, Button, TextInput, TouchableOpacity, TouchableHighlight, Image, ScrollView,KeyboardAvoidingView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SearchableDropdown from '../../components/engine/dropsearchList'
const mockupData = require('../../mockupdata/getallCat.json');
// import { ScrollView } from 'react-native-gesture-handler';
// import { TouchableHighlight, } from 'react-native-gesture-handler';

var tam;
export default class DanhMucLv2 extends React.Component {
  // componentDidUpdate(){
  //   this.focusInput();
  // }
  // focusInput = (component) => {
  //   if (component) {
  //     component.focus();
  //   }
  // };
  constructor(props) {
    super(props);
    this.state = {
        arrRaw: [],
        arrData: [],
        selectedItems: [],
        //extFile:".html",
    }
}
  componentDidMount = async () => {
    const propsFromMessages = this.props.navigation.state.params;
    try {
      var items = Object.values(propsFromMessages.cat);
      //this.setState({ arrRaw: items[0] });
      
      var itemsHolder = [];
      //this.setState({arrRaw:items[0]});
      for (var i = 0; i < items.length; i++) {
        itemsHolder.push({
          id: i,
          name: items.map(value => value.name)[i],
          cat: items.map(value => value.categories_lv3)[i]
        });
      }
      this.setState({ arrData: itemsHolder });
    } catch (err) {

    }
    
  }

  
  render() {
   
    
    //console.log(this.state.arrData);
    const propsFromMessages = this.props.navigation.state.params;
    tam = propsFromMessages.cat;
    //this.setState({ arrData : propsFromMessages});
    const { navigate } = this.props.navigation;
    //console.log(this.state.arrData);
    // console.log(tam[item.id].categories_lv3)
    var danhMuc = this.state.arrData.map(function(item){
      return (
        <TouchableOpacity 
        key={item.id}
        onPress={() =>
          navigate("DanhMucLv3", {
          id: item.id,
          cat: propsFromMessages.cat[item.id].categories_lv3,
        })}>
        
            <View style={{
          borderBottomWidth:1,
          borderBottomColor:'#EAEAEA',
          margin: 10,
          marginVertical:5,
          borderRadius: 5,
          padding: 5,
          paddingHorizontal: 7,
          height:50,
          flexDirection:'row',
          alignContent:'center'}}>
            {/* <Image
            style={{ width: 85, height: 85,margin:0,alignSelf:'flex-start' }}
            source={require("../../images/test.png")}
          /> */}
          <View style={{
            alignSelf:'flex-start',
            flexDirection:'column',
            margin:5,
            marginHorizontal:10
          }}>
              <Text style={{fontSize: 15,color: "#000",marginVertical: 2}} numberOfLines={2}>{item.name}</Text>
          </View>
          
          
          </View>
        </TouchableOpacity>
      )
    });
    
    return (
      // --- HEADER 
      <View style={{ flex: 1 }}>
        {/* <View style={{ flexDirection: 'row', backgroundColor: '#e5101d', paddingVertical:10 }}>
          <TouchableOpacity style={{ alignItems: 'flex-start', width: '10%', alignItems: 'center', justifyContent:'flex-start' }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 30, height: 30,marginTop:7 }}
              tintColor='#fff'
              source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/arrow-ios-back-outline.png' }}
            />
          </TouchableOpacity>
          <View style={{width: '90%'}}>
          <SearchableDropdown
                  selectedItems={{}}
                  onItemSelect={(item) => {
                    //console.log(item);
                    // const items = this.state.selectedItems;
                    // items.push(item)
                    this.setState({ selectedItems: item.id });
                    //console.log(this.state.selectedItems);
                    navigate("KetQuaTimKiem", {
                      nameSP: this.state.arrData[this.state.selectedItems].name,
                      cat2: this.state.arrData[this.state.selectedItems].cat,
                    });
                    //this.setState({ extFile: ".html" })
                  }}
                  containerStyle={{ padding: 5 }}
                  onRemoveItem={(item, index) => {
                    // const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    // this.setState({ selectedItems: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    // marginTop: 15,
                    backgroundColor: 'transparent',
                  }}
                  itemTextStyle={{ color: '#fff' }}
                  itemsContainerStyle={{marginTop:10, backgroundColor:"#AA0000",borderRadius:5,maxHeight:250,marginHorizontal:10}}
                  items={this.state.arrData}
                  defaultIndex={2}
                 
                  resetValue={false}
                  textInputProps={
                    {
                      placeholder: "nhập từ khóa ...",
                      underlineColorAndroid: "transparent",
                      // size: "small",
                      style: {
                      alignItems: 'flex-end',
                      marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: "#fff", shadowColor: 'black',
                      shadowOpacity: 0.26,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 10,
                      elevation: 15, borderRadius: 5, color: "#b0b0b0", height: 38
                      },
                    }
                  }
                  listProps={
                    {
                      // nestedScrollEnabled: true,
                      // initialNumToRender:5,
                    }
                  }
                />
          </View>

        </View> */}

        <View style={{ flex: 5,marginTop:5 }}>
          <ScrollView>
          {danhMuc}
          </ScrollView>
          
        </View>
      </View>
    );
  }
}

//   TimKiem.navigationOptions = {
//     headerVisible: false,
//   headerMode: 'none',
// }
