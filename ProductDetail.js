import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

let URI = "http://192.168.1.101:4000";

class ProductDetail extends React.Component {
  //static navigationOptions = { title: "Product Detail" };
  static navigationOptions = ({ navigation }) => ({
    title: `Product Detail for ${navigation.state.params.id}`
  });

  constructor(props) {
    super(props);
    this.state = { product: {}, isLoading: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    let { id } = this.props.navigation.state.params;
    fetch(`${URI}/products/${id}`)
      .then(r => r.json())
      .then(product =>
        this.setState({ product, isLoading: false }, function() {
          console.log(this.state);
        })
      );
  }

  render() {
    const { navigation } = this.props;
    const { product } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: `${URI}/images/${product.image}` }}
          style={{ height: 200, marginTop: 20 }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={[styles.title, { fontSize: 16 }]}>
          {product.additionalInfo && `(${product.additionalInfo})`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    padding: 10
  },
  title: {
    fontSize: 24,
    padding: 10
  }
});

export default ProductDetail;
