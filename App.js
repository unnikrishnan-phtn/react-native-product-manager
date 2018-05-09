import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import ProductList from "./ProductList";
import Header from "./Header";
import {
  createStackNavigator,
  createBottomTabNavigator 
} from "react-navigation";
import ProductDetail from "./ProductDetail";
import ProductListWithFlatList from "./ProductListWithFlatList";
import {
  Ionicons
} from "@expo/vector-icons";
import AddProduct from "./AddProduct";

class App extends React.Component {
  static navigationOptions = {
    //title: "Home",
    headerTitle: <Header title = "Product Manager"/> ,
  };
  constructor(props){
    super(props);
    this.state = {modalVisible:false}
  }

  showModal = () => {
    console.log('show modal');
    this.setState({modalVisible:true})
  }

  render() {
    return (
      <View style = {styles.container}>
        <ProductListWithFlatList { ...this.props}/>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff"
  }
});

const ListStack =  createStackNavigator({
  App: {
    screen: App
  },
  Detail: {
    screen: ProductDetail
  }
}, {
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

});

const ManageStack = createStackNavigator({
  Add: {
    screen: AddProduct
  },
  Detail: {
    screen: ProductDetail
  }
}, {
  initialRouteName: "Add",
  navigationOptions: {
    title: "Manage",
    headerStyle: {
      backgroundColor: "#00ff80"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    },
  }
});


export default createBottomTabNavigator(
  {
    List: ListStack,
    Manage: ManageStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'List') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        } else if (routeName === 'Manage') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00ff80',
      inactiveTintColor: 'gray',
    },
  }
);