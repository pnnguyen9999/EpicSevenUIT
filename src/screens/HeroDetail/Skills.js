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
import { AccordionList } from "accordion-collapse-react-native";
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
            dataGetSkills: [],
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
                var itemsHolder = [];
                for (var i = 0; i < responseJson.results[0].skills.length; i++) {
                    itemsHolder.push({
                        id: i + 1,
                        package: responseJson.results[0].skills[i],
                    });
                }
                this.setState({
                    dataGetAll: responseJson.results[0],
                    dataGetSkills: itemsHolder,
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


        const propsFromMessages = this.props.navigation.state.params;
        console.log(this.state.dataGetSkills)
        //console.log(this.state.dataGetAll.specialtySkill.name)
        // alert(this.state.get_failed)
        const width_screen = Dimensions.get('window').width;
        // render overall skill
        const renderHead = (item) => (
            <View style={{ backgroundColor: "rgba(60,141,168,0.2)", padding: 10, marginVertical: 7, flexDirection: 'row' }}>
                <Image
                    style={{ width: 80, height: 80, borderRadius: 5 }}
                    source={{ uri: item.package.isPassive ? "https://assets.epicsevendb.com/hero/" + log + "/sk_" + item.id + "p.png" : "https://assets.epicsevendb.com/hero/" + log + "/sk_" + item.id + ".png" }}
                />
                <View style={{ width: width_screen - 90 }}>
                    <Text style={{ color: "#fff", padding: 5, fontSize: 17, fontWeight: 'bold' }}>{item.package.name}</Text>
                    <Text style={{ color: "#eee", padding: 5, fontSize: 15 }}>{item.package.isPassive ? "Passive" : "Active"}</Text>
                </View>
            </View>
        );
        // render chi tiet content skill
        const renderBody = (item) => (
            <View style={{ padding: 10, flexDirection: 'column' }}>
                <Text style={{ color: "#73E6E6", fontWeight: 'bold' }}>+ {item.package.soulAcquire} soul</Text>
                <Text style={{ color: "#eee", fontWeight: 'bold' }}>{item.package.description}</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "#fc8c03", fontWeight: 'bold', paddingVertical: 10 }}>[ Skill Enhance ]</Text>
                </View>
                {item.package.enhancement.map(function (itemEnhance, index) {
                    return (
                        <View style={{
                            backgroundColor: "rgba(54,140,154,0.2)",
                            padding: 5,
                            flexDirection: 'column',
                            marginVertical: 5,
                            borderRadius: 5
                        }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#eee", fontSize: 15 }}><Text style={{ color: "#fcba03", fontSize: 15 }}>(+{index}) </Text>{itemEnhance.description}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5 }}>
                                {itemEnhance.resources.map(function (resources, index) {
                                    return (
                                        <View style={{ paddingHorizontal: 5, flexDirection: "row" }}>
                                            <Image
                                                style={{ width: 50, height: 50, borderRadius: 5 }}
                                                source={{ uri: "https://assets.epicsevendb.com/item/" + resources.item + ".png" }}
                                            />
                                            <Text style={{ color: "#eee", paddingVertical: 10 }}> x{resources.qty}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
        );

        return (
            <ImageBackground source={require("../../images/background.jpg")} style={{ justifyContent: 'center', resizeMode: 'contain', flex: 1 }}>
                <ScrollView style={{}}>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', paddingTop: 25, textAlign: 'center' }}>Skills</Text>
                        <AccordionList
                            list={this.state.dataGetSkills}
                            header={renderHead}
                            body={renderBody}
                        />
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


