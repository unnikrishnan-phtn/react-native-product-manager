import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Picker,Alert } from 'react-native';

let URI = "http://192.168.1.101:4000";

export default class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: 'Mobiles',
      additionalInfo: '',
      categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
      price:''
    }
  }

  handleSubmit = () => {
    let {
      title,
      category,
      additionalInfo,
      price
    } = this.state;
    fetch(`${URI}/products`, {
      body: JSON.stringify({
        title,
        category,
        additionalInfo,
        price
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    }).then(p => Alert.alert('Success','Product Saved Successfully'))
  }

  renderCategories = () => {
    return this.state.categories.map(c => <Picker.Item label={c} value={c} />)
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
          placeholder="Product Name"
          placeholderTextColor="grey"
        />
        <TextInput
          style={{ height: 80 }}
          onChangeText={(additionalInfo) => this.setState({ additionalInfo })}
          multiline={true}
          value={this.state.additionalInfo}
          placeholder="Additional Info"
          placeholderTextColor="grey"
        />
        <TextInput
          style={{ height: 40 }}
          onChangeText={(price) => this.setState({ price })}
          value={this.state.price}
          placeholder="Product Price"
          placeholderTextColor="grey"
          keyboardType="number-pad"
        />
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          {this.renderCategories()}
        </Picker>
        <Button
          title="Add"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    backgroundColor: '#ffffff',
  },
});
