
import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import {
  Icon,
  Input,
} from 'react-native-ui-kitten';
import { ScrollView } from 'react-native-gesture-handler';
const defaultItemValue = {
  name: '', id: 0
};

export default class SearchableDropDown extends Component {
  constructor(props) {
    super(props);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.renderFlatList = this.renderFlatList.bind(this);
    this.searchedItems = this.searchedItems.bind(this);
    this.renderItems = this.renderItems.bind(this);

    this.state = {
      item: {},
      listItems: [],
      focus: false
    };
  }

  renderFlatList = () => {
    if (this.state.focus) {
      const flatListPorps = { ...this.props.listProps };
      const oldSupport = [
        { key: 'keyboardShouldPersistTaps', val: 'always' },
        { key: 'nestedScrollEnabled', val: false },
        { key: 'style', val: { ...this.props.itemsContainerStyle } },
        { key: 'data', val: this.state.listItems },
        { key: 'keyExtractor', val: (item, index) => index.toString() },
        { key: 'renderItem', val: ({ item, index }) => this.renderItems(item, index) },
      ];
      oldSupport.forEach((kv) => {
        if (!Object.keys(flatListPorps).includes(kv.key)) {
          flatListPorps[kv.key] = kv.val;
        } else {
          if (kv.key === 'style') {
            flatListPorps['style'] = kv.val;
          }
        }
      });
      return (
        <FlatList
          {...flatListPorps}
        />
      );
    }
  };

  componentDidMount = () => {
    const listItems = this.props.items;
    const defaultIndex = this.props.defaultIndex;
    if (defaultIndex && listItems.length > defaultIndex) {
      this.setState({
        listItems,
        item: listItems[defaultIndex]
      });
    } else {
      this.setState({ listItems });
    }
  };

  searchedItems = searchedText => {
    let setSort = this.props.setSort;
    if (!setSort && typeof setSort !== 'function') {
      setSort = (item, searchedText) => {
        // console.log(item.name.toLowerCase().indexOf(searchedText.toLowerCase()));
        return item.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
      };
    }
    var ac = this.props.items.filter((item) => {
      return setSort(item, searchedText);
    });
    let item = {
      id: -1,
      name: searchedText
    };
    console.log(ac);
    this.setState({ listItems: ac, item: item });
    const onTextChange = this.props.onTextChange || this.props.textInputProps.onTextChange || this.props.onChangeText || this.props.textInputProps.onChangeText;
    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => {
        onTextChange(searchedText);
      }, 0);
    }
  };

  renderItems = (item, index) => {
    if (this.props.multi && this.props.selectedItems && this.props.selectedItems.length > 0) {
      return (
        this.props.selectedItems.find(sitem => sitem.id === item.id)
          ?
          <TouchableOpacity style={{ ...this.props.itemStyle, flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text>{item.name}</Text>
            </View>
            <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0)} style={{ backgroundColor: '#f16d6b', alignItems: 'center', justifyContent: 'center', width: 25, height: 25, borderRadius: 100, marginLeft: 10 }}>
                <Text style={{ color: "#fff" }}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => {
              this.setState({ item: item });
              setTimeout(() => {
                this.props.onItemSelect(item);
              }, 0);
            }}
            style={{ ...this.props.itemStyle, flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{ ...this.props.itemStyle }}
          onPress={() => {
            this.setState({ item: item, focus: false });
            Keyboard.dismiss();
            setTimeout(() => {
              this.props.onItemSelect(item);
              if (this.props.resetValue) {
                this.setState({ focus: true, item: defaultItemValue });
                this.input.focus();
              }
            }, 0);
          }}
        >
          {
            this.props.selectedItems && this.props.selectedItems.length > 0 && this.props.selectedItems.find(x => x.id === item.id)
              ?
              <Text style={{ ...this.props.itemTextStyle }}>{item.name}</Text>
              :
              <Text style={{ ...this.props.itemTextStyle }}>{item.name}</Text>
          }
        </TouchableOpacity>
      );
    }
  };

  renderListType = () => {
    return this.renderFlatList();
  };

  renderTextInput = () => {
    const textInputProps = { ...this.props.textInputProps };
    const oldSupport = [
      { key: 'ref', val: e => (this.input = e) },
      { key: 'onTextChange', val: (text) => { this.searchedItems(text) } },
      { key: 'underlineColorAndroid', val: this.props.underlineColorAndroid },
      {
        key: 'onFocus',
        val: () => {
          this.props.onFocus && this.props.onFocus()
          this.setState({
            focus: true,
            item: defaultItemValue,
            listItems: this.props.items
          });
        }
      },
      {
        key: 'onBlur',
        val: () => {
          this.props.onBlur && this.props.onBlur()
          this.setState({ focus: false })
        }
      },
      {
        key: 'value',
        val: this.state.item.name
      },
      {
        key: 'style',
        val: { ...this.props.textInputStyle }
      },
      {
        key: 'placeholderTextColor',
        val: this.props.placeholderTextColor
      },
      {
        key: 'placeholder',
        val: this.props.placeholder
      }
    ];
    oldSupport.forEach((kv) => {
      if (!Object.keys(textInputProps).includes(kv.key)) {
        if (kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps['onChangeText'] = kv.val;
        } else {
          textInputProps[kv.key] = kv.val;
        }
      } else {
        if (kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps['onChangeText'] = kv.val;
        }
      }
    });
    return (
      <TextInput
        {...textInputProps}
      />
    )
  }

  render = () => {
    return (
      <View
        keyboardShouldPersist="always"
        style={{ ...this.props.containerStyle }}
      >

        {this.renderTextInput()}
        {this.renderListType()}
        {this.renderSelectedItems()}
      </View>
    );
  };
  renderSelectedItems() {
    let items = this.props.selectedItems;
    if (items !== undefined && items.length > 0 && this.props.chip && this.props.multi) {
      return (
        <ScrollView style={{ maxHeight: 95 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, marginTop: 5 }}>
            {items.map((item, index) => {
              return (
                <View key={index} style={{

                }}>
                  <View start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#7F7FD5', '#86A8E7']} style={{
                    width: (item.name.length * 8) + 35,
                    justifyContent: 'center',
                    flex: 0,
                    backgroundColor: '#eee',
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                    padding: 5,
                    borderRadius: 5,
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{item.name.toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => setTimeout(() => { this.props.onRemoveItem(item, index) }, 0)}
                      style={{
                        backgroundColor: '#f16d6b',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        marginLeft: 8
                      }}>
                      <Text style={{ color: "#fff" }}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
            }
          </View>
        </ScrollView>);
    }
  }
}