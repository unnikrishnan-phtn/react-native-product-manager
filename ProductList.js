import React, { Component } from "react";
import ProductListItem from "./ProductListItem";
import { ActivityIndicator, ScrollView } from "react-native";

let URI = "http://192.168.1.101:4000";

class ProductList extends Component {
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

  renderProducts() {
    return this.state.products.map(p => (
      <ProductListItem
       {...this.props}
        key={p.id}
        id={p.id}
        title={p.title}
        image={`${URI}/images/${p.image}`}
        rating={p.rating}
        price={p.price}
      />
    ));
  }
  render() {
    return (
      <ScrollView>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
          this.renderProducts()
        )}
      </ScrollView>
    );
  }
}

export default ProductList;
