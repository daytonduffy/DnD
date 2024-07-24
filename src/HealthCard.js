import React from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';

class HealthCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentHP: parseInt(this.props.maxHP) + parseInt(this.props.tempHP),
      tempHP: parseInt(this.props.tempHP),
      maxHP: parseInt(this.props.maxHP),
      healthChange: 0
    };


    this.healTime = this.healTime.bind(this);
    this.hurtTime = this.hurtTime.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }


  handleChange(e) {
    this.setState({
      healthChange:e.target.value
    })
  }



  healTime() {
      if (this.state.currentHP >= this.state.maxHP ) {
        return
      }

      this.state.currentHP = parseInt(this.state.currentHP) + parseInt(this.state.healthChange)

      if (this.state.currentHP > (this.state.maxHP + this.state.tempHP)) {
        this.state.currentHP = this.state.maxHP + this.state.tempHP
      }

      this.props.changeStateHP(this.state.currentHP, this.state.tempHP)
  }


  hurtTime() {
      // currentHP is always the hp left + temp hp together

      // take out of temp hp first

      // use whats left to

      if (this.state.tempHP > 0) { // if theres tempHP to use
        var holdVal = this.state.tempHP - parseInt(this.state.healthChange); // if this value is possitive theres temp hp left, if its negative we need to take some from health still
      }

      if (holdVal >= 0) { //temp hp covered all the damage

        this.state.tempHP = holdVal;

      } else { // health needs to lose
        this.state.tempHP = 0;
        this.state.currentHP = this.state.currentHP - parseInt(this.state.healthChange);
      }



      if (this.state.currentHP < 0) {
        this.state.currentHP = 0
      }

      this.props.changeStateHP(this.state.currentHP, this.state.tempHP)
  }




  render() {

    this.state.tempHP = parseInt(this.props.tempHP)
    this.state.currentHP = parseInt(this.props.currentHP)

    // this is the magic item card set up need to change it majorlly
    return <div class="card" style={{ width: "20rem" }}>
              <div class="card-body">
                <h5 class="card-title-stat">Health</h5>
                <p class="card-text-stat">{this.state.currentHP + this.state.tempHP}/{this.state.maxHP}</p>

                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                    <input type="text" name="userName" value={this.state.healthChange} placeholder="Enter Change" onChange={this.handleChange}/>

                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"5px"}}>

                        <button type="button" id="heal" onClick={this.healTime} class="btn btn-dark">Healy</button>
                        <button type="button" id="hurt" onClick={this.hurtTime} class="btn btn-dark">Hurty</button>

                    </div>

                </div>



              </div>
           </div>




  }
}

export default HealthCard;
