import * as React from "react";
import { getFunName } from "../helpers";

export default class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  myInput = React.createRef();
  goToStore = event => {
    event.preventDefault();
    this.props.history.push(`/store/${this.myInput.current.value}`);
  };

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store name</h2>
        <input
          type="text"
          required
          ref={this.myInput}
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit store --></button>
      </form>
    );
  }
}
