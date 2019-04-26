import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default class Order extends React.Component {
  renderOrder = key => {
    const product = this.props.products[key];
    const count = this.props.order[key];
    const isAvailable = product && product.status === "available";
    // check products loading state
    if (!product) return null;
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {product ? product.name : "fish"} is no longer available.
        </li>
      );
    }
    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 250, exit: 250 }}
      >
        <li key={key}>
          {count} lbs {product.name} {formatPrice(product.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>x</button>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const products = this.props.products;
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const product = products[key];
      const count = this.props.order[key];
      const isAvailable = product && product.status === "available";
      if (isAvailable) {
        return prevTotal + count * product.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
