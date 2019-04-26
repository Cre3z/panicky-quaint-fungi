import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import samples from "../sample-fishes";
import Product from "./Product";
import base from "../base";
import PropTypes from "prop-types";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    products: {},
    order: {}
  };
  // sync state of this app -> products with the relevant db
  componentDidMount() {
    const localStorageRef = localStorage.getItem(this.props.match.params.id);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
    this.ref = base.syncState(`${this.props.match.params.id}/products`, {
      context: this,
      state: "products"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.id,
      JSON.stringify(this.state.order)
    );
  }

  // close firebase sync once app closes to avoid memory leak
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSamples = () => {
    this.setState({ products: samples });
  };
  addProduct = product => {
    const products = { ...this.state.products };
    products[`product${Date.now()}`] = product;
    this.setState({
      products
    });
  };

  updateProduct = (key, updatedProduct) => {
    const products = { ...this.state.products };
    products[key] = updatedProduct;
    this.setState({ products });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  deleteProduct = key => {
    const products = { ...this.state.products };
    // firebase requires null value to delete
    products[key] = null;
    this.setState({ products });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    // firebase requires null value to delete
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.products).map((key, i) => (
              <Product
                key={key}
                index={key}
                details={this.state.products[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          products={this.state.products}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addProduct={this.addProduct}
          updateProduct={this.updateProduct}
          loadSamples={this.loadSamples}
          products={this.state.products}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}

export default App;
