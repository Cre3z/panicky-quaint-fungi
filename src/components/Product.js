import React from "react";
import { formatPrice } from "../helpers";

export default class Product extends React.Component {
  render() {
    const { image, name, desc, price, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="single-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price"> {formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          type="button"
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add to Cart" : "Sold out"}
        </button>
      </li>
    );
  }
}
