import React from "react";
import "./App.css";
import Section from "./Section";

class Item extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {

    return <div class="card" style={{ width: "30rem" }}>
              <div class="card-body">
                <h5 class="card-title">{this.props.item.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{this.props.item.rarity} Magic Item</h6>
                <p class="card-text">{this.props.item.description}</p>
                <h6>Attunment: {this.props.item.attunement} - - - - - Type: {this.props.item.type}</h6>
              </div>
            </div>;
  }
}

export default Item;
