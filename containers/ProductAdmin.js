import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
import { Vibration } from "react-native";

let URI = "http://172.16.102.72:4000";
class ProductAdmin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }

  onDeleteTapped = id => {

    Alert.alert(
        'Delete Item',
        'Are you sure you want to delete the item?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this._deleteItem(id)},
        ],
        { cancelable: false }
      )


  };

  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
  };


  _deleteItem = (id) => {
    fetch(`${URI}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      }).then(response => this.props.actions.deleteProduct(id))
      .then(Vibration.vibrate(1000)
    )
  }
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
        wish={item.wish || false}
        doDelete={true}
        onWishTapped={this.onDeleteTapped}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onRefresh = () => {
    //this.setState({ isRefreshing: true });
    this._getProducts();
  };

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
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
          <FlatList
            data={this.props.products}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this._getMore}
            refreshControl={this._renderRefreshControl()}
          />
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
    limit: state.productState.limit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductAdmin
);
