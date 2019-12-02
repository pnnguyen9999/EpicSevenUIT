import React from 'react';
import { Dimensions, ActivityIndicator } from 'react-native';
import { Text, View, Button, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';


export default class TimKiem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 1,
      userSearch: '',
      result: [],
    }
  }
  componentDidMount = async () => {
    try {
      this.searchAPI()
    } catch (err) {
    }
  }

  searchAPI() {
    const propsFromMessages = this.props.navigation.state.params;
    fetch("http://35.221.157.44:9000/product/search?user_id=U002&keyword=" + propsFromMessages.userS + "&number=10")
      .then(response => response.json())
      .then((responseJson) => {
        
        this.setState({ result: responseJson.data });
        this.setState({ loading: 0 });
        console.log(responseJson.data);
      }).catch(error => console.log(error))

  }

  searchAPISelf() {
    const propsFromMessages = this.props.navigation.state.params;
    fetch("http://35.221.157.44:9000/product/search?user_id=U002&keyword=" + this.state.userSearch + "&number=10")
      .then(response => response.json())
      .then((responseJson) => {
        
        this.setState({ result: responseJson.data });
        this.setState({ loading: 0 });
        console.log(responseJson.data);
      }).catch(error => console.log(error))

  }

  onSubmitHandler() {
    this.setState({ loading: 1 });
    this.searchAPISelf()
  }

  render() {


    const propsFromMessages = this.props.navigation.state.params;
    console.log('--------->>>');
    console.log(propsFromMessages)
    console.log('---------------<<<');

    var itemsHolder = [];
    const { navigate } = this.props.navigation;
    const dimensions = Dimensions.get('window');
    const width = dimensions.width;

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large'></ActivityIndicator>
        </View>
      )
    }

    var ketqua = this.state.result.map(function (item) {
      return (
        <TouchableOpacity key={item.product_id}>
          <View style={{
            borderBottomWidth: 1,
            borderBottomColor: '#EAEAEA',
            margin: 10,
            marginVertical: 5,
            borderRadius: 5,
            padding: 5,
            paddingHorizontal: 7,
            height: 100,
            flexDirection: 'row',
            alignContent: 'center'
          }}>
            <Image
              style={{ width: 85, height: 85, margin: 0, alignSelf: 'flex-start' }}
              source={{ uri: item.image }}
            />
            <View style={{
              alignSelf: 'flex-start',
              flexDirection: 'column',
              flexWrap: 'wrap',
              margin: 5,
              marginHorizontal: 10
            }}>
              <View style={{ width: width - 125 }}>
                <Text style={{ fontSize: 15, color: "#000", marginVertical: 3, marginTop: 0, lineHeight: 21 }} numberOfLines={2}>{item.name.toUpperCase()}</Text>
              </View>
              <Text style={{ fontSize: 15, color: "#000", marginVertical: 2, fontWeight: 'bold' }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
            </View>


          </View>
        </TouchableOpacity>
      )
    });

    return (
      // --- HEADER 
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#e5101d', paddingVertical: 10 }}>
          <TouchableOpacity style={{ alignItems: 'flex-start', width: '10%', alignItems: 'center', justifyContent: 'flex-start' }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ width: 30, height: 30, marginTop: 7 }}
              tintColor='#fff'
              source={{ uri: 'https://akveo.github.io/eva-icons/outline/png/128/arrow-ios-back-outline.png' }}
            />
          </TouchableOpacity>
          <View style={{ width: '90%' }}>
            <TextInput
              
              style={{
                alignItems: 'flex-end',
                marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: "#fff", shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 10,
                elevation: 15, borderRadius: 5, color: "#b0b0b0", height: 38
              }} placeholder={"nhập từ khóa ..."}
              onChangeText={(text) => this.setState({ userSearch: text })}
              onSubmitEditing={this.onSubmitHandler.bind(this)}
              underlineColorAndroid="transparent"
            >
            </TextInput>

          </View>
        </View>

        <ScrollView style={{ flex: 5, paddingTop: 5 }}>
          {ketqua}
        </ScrollView>
      </View>
    );
  }
}



