import React, { Component } from "react";
import ProductListItem from "./ProductListItem";
import { ActivityIndicator, ScrollView, FlatList } from "react-native";

let URI = "http://192.168.1.101:4000";

class ProductListWithFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], isLoading: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${URI}/products`)
      .then(r => r.json())
      .then(products => this.setState({ products, isLoading: false }));
  }

  _renderItem({index,item}) {
      console.log(item)
    return (
      <ProductListItem
        {...this.props}
        key={item.id}
        id={item.id}
        title={`${index+1} - ${item.title}`}
        image={`${URI}/images/${item.image}`}
        rating={item.rating}
        price={item.price}
      />
    );
  }

  _keyExtractor = (item, index) => `${item.id}`;

  render() {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color="#00ff80" />
    ) : (
      <FlatList
        data={this.state.products}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

export default ProductListWithFlatList;
