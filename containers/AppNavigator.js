import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";

import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";
import StoreMap from "./StoreMap";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import ProductListWithFlatList from "./ProductListWithFlatList";
import ProductAdmin from "./ProductAdmin";
import SearchProduct from "./SearchProduct";


const ListStack = createStackNavigator(
  {
    List: {
      screen: ProductListWithFlatList
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "List",
    navigationOptions: {
      title: "Product Manager",
      headerStyle: {
        backgroundColor: "#00ff80"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);


const AdminStack = createStackNavigator(
  {
    Admin: {
      screen: ProductAdmin
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "Admin",
    navigationOptions: {
      title: "Admin",
      headerStyle: {
        backgroundColor: "#00ff80"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);


const AddStack = createStackNavigator(
  {
    Add: {
      screen: AddProduct
    }
  },
  {
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
      }
    }
  }
);


const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchProduct
    }
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      title: "Search",
      headerStyle: {
        backgroundColor: "#00ff80"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

export const AppNavigator = createBottomTabNavigator(
  {
    List: ListStack,
    Search:SearchStack,
    Admin:AdminStack,
    Add: AddStack,
    Stores: StoreMap
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "List") {
          iconName = `ios-list-box${focused ? "" : "-outline"}`;
        } else if (routeName === "Add") {
          iconName = `ios-add-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Admin") {
          iconName = `ios-cog${focused ? "" : "-outline"}`;
        } else if (routeName === "Search") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        } else if (routeName === "Stores") {
          return (
            <MaterialIcons
              name="local-grocery-store"
              size={25}
              color={tintColor}
            />
          );
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#00ff80",
      inactiveTintColor: "gray"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.navState,
          addListener
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
