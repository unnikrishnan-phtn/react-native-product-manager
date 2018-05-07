import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import ProductList from "./ProductList";
import Header from "./Header";
import { StackNavigator, createStackNavigator } from "react-navigation";
import ProductDetail from "./ProductDetail";

class App extends React.Component {
  static navigationOptions = {
    //title: "Home",
    headerTitle: <Header title="Product Manager" />,
    headerStyle: {
      backgroundColor: "#00ff80" //change this color to override shared settings
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ProductList {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff"
  }
});

export default createStackNavigator(
  {
    App: {
      screen: App
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "App",
    navigationOptions: {
      title: "Home",
      headerStyle: {
        backgroundColor: "#00ff80"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      },
    }
  }
);
