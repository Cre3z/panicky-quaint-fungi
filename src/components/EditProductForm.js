import React from "react";

export default class EditProductForm extends React.Component {
  handleChange = e => {
    const updateProduct = {
      ...this.props.details,
      [e.currentTarget.name]: e.currentTarget.value
    };
    this.props.updateProduct(this.props.index, updateProduct);
  };

  render() {
    return (
      <form className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.details.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.details.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.details.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          placeholder="Description"
          onChange={this.handleChange}
          value={this.props.details.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.details.image}
        />
        <button
          type="button"
          onClick={() => this.props.deleteProduct(this.props.index)}
        >
          - Remove Product
        </button>
      </form>
    );
  }
}
