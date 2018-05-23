import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View,
  Text
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
import { Vibration } from "react-native";
import { SearchBar } from 'react-native-elements'


let URI = "http://192.168.1.34:4000";
class SearchProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }


  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
  };

  /*  flat list supporting methods */

  _getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
  };

  _renderItem = ({ index, item }) => {
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
        wish={false}
        showWish={false}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onRefresh = () => {
    this._getProducts();
  };

  _onSearch = (itemName) => {
    console.log('--' + itemName);
    this.props.actions.searchProductList(this.props.products, itemName);
  }
  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.props.isRefreshing}
        tintColor={"#00ff80"}
        title={"Refreshing..."}
        titleColor={"#00ff80"}
      />
    );
  }

  /*  flat list supporting methods - END */

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBar
          lightTheme
          onChangeText={this._onSearch.bind(this)}
          onClearText={this._onSearch.bind(this)}
          placeholder='Search Products' />

        {
          this.props.isLoading ? (
            <ActivityIndicator size="large" color="#00ff80" />
          ) : (
              this.props.filteredProducts.length > 0 ?
                <FlatList
                  data={this.props.filteredProducts}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                  onEndReachedThreshold={0.5}
                  onEndReached={this._getMore}
                  refreshControl={this._renderRefreshControl()}
                />
                :
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ justifyContent: 'center', alignItems: 'center' }}>No Products found</Text>
                </View>
            )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit,
    filteredProducts: state.productState.filteredProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchProduct
);
