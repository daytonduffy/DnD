import React from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';

class TempHPCard extends React.Component {

  constructor(props) {
    super(props);



    this.state = {
      tempHP: parseInt(this.props.tempHP),
      toAdd: 0
    };


    this.addTempHP = this.addTempHP.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }





  handleChange(e) {
    this.setState({
      toAdd:e.target.value
    })
    //this.props.changeStateTest()

  }

  addTempHP() {
      this.state.tempHP = parseInt(this.state.tempHP) + parseInt(this.state.toAdd)


      this.props.changeStateTempHP(this.state.tempHP)
  }


  render() {
    this.state.tempHP = parseInt(this.props.tempHP);
    // this is the magic item card set up need to change it majorlly
    return <div class="card" style={{ width: "20rem" }}>
              <div class="card-body">
                <h5 class="card-title-stat">Temp HP</h5>
                <p class="card-text-stat">{this.state.tempHP}</p>

                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                    <input type="text" name="userName" value={this.state.toAdd} placeholder="HP" onChange={this.handleChange}/>

                    <button type="button" id="tempheal" onClick={this.addTempHP} class="btn btn-dark">Add</button>

                </div>



              </div>
           </div>




  }
}

export default TempHPCard;
