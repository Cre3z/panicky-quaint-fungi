import React from "react";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import PropTypes from "prop-types";

export default class Inventory extends React.Component {
  static propTypes = {
    addProduct: PropTypes.func,
    products: PropTypes.object,
    updateProduct: PropTypes.func,
    deleteProduct: PropTypes.func
  };
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddProductForm addProduct={this.props.addProduct} />
        {Object.keys(this.props.products).map(key => (
          <EditProductForm
            key={key}
            index={key}
            details={this.props.products[key]}
            updateProduct={this.props.updateProduct}
            deleteProduct={this.props.deleteProduct}
          />
        ))}
        <button onClick={this.props.loadSamples}>Load Samples</button>
      </div>
    );
  }
}
