import React, { useState } from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import allLanguages from './dmg/Information/Languages.json';
import conditionGuide from './dmg/Information/Conditions.json';

class ConditionCard extends React.Component {

  constructor(props) {
    super(props);

    this.languagePack = allLanguages;
    this.conditionGuide = conditionGuide;

    this.editedConList = this.props.conditions;

    this.state = {
      languages: this.props.languages,
      conditions: this.props.conditions,
      show: false,
      temp: 0,
      activeConditions: this.props.conditions
    };


    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.conditionPopUp = this.conditionPopUp.bind(this);
    this.conButtonClick = this.conButtonClick.bind(this);
  }

  handleClose() {
    this.state.show = false;
    this.props.changeStateTest()
  }

  handleShow() {

    this.state.show = true;
    this.props.changeStateTest()
  }

  // switch class and make list for new state/lang list if save is clicked
  conButtonClick(condition) {

      var button = document.getElementById("con" + condition)

      console.log("popopopopop")
      console.log(this.editedConList)
      console.log(this.state.activeConditions)

      var exActive = false;
      var exIndex = 0;
      for (var i = 0; i < this.editedConList.length; ++i) {
        if (this.editedConList[i] && this.editedConList[i].includes("Exhaustion")) {
          console.log("NO WHAMMIES")
          exActive = true;
          exIndex = i;
          break;
        }
      }


      if (button.class === "btn btn-dark" || this.editedConList.indexOf(condition) > -1) { // being DE-selected
          var index = this.editedConList.indexOf(condition)

          // need something cleaner than delete but thats working
          delete this.editedConList[index]

          button.class = "btn btn-outline-dark"


      } else if (button.id == "conExhaustion" && exActive) {

        console.log("Hit lower bittie")

        // need something cleaner than delete but thats working
        delete this.editedConList[exIndex]

        button.class = "btn btn-outline-dark"

      } else { // being selected

          if (condition == "Exhaustion"){
            this.editedConList.push(condition + ", Level 1")
          } else {
            this.editedConList.push(condition)
          }

          button.class = "btn btn-dark"
      }


      this.props.changeStateCondition(this.editedConList)

  }




  conditionPopUp() {

    var conTags = []

    this.conditionGuide.forEach((item, i) => {

      if (item.condition == "Exhaustion") {
        var active = false;

        for (var i = 0; i < this.state.activeConditions.length; ++i) {
          console.log(this.state.activeConditions[i])
          if (this.state.activeConditions[i] && this.state.activeConditions[i].includes("Exhaustion")) {
            active = true;
            break;
          }

        }

        if (active) {
            conTags.push(<button type="button" id={"con" + item.condition} class="btn btn-dark" onClick={() => this.conButtonClick(item.condition)}>{item.condition}</button>)
        } else {
            conTags.push(<button type="button" id={"con" + item.condition} class="btn btn-outline-dark" onClick={() => this.conButtonClick(item.condition)}>{item.condition}</button>)
        }

      } else {
        if (this.state.activeConditions.indexOf(item.condition) >= 0) { // have condition
          conTags.push(<button type="button" id={"con" + item.condition} class="btn btn-dark" onClick={() => this.conButtonClick(item.condition)}>{item.condition}</button>)
        } else { // dont have condition
          conTags.push(<button type="button" id={"con" + item.condition} class="btn btn-outline-dark" onClick={() => this.conButtonClick(item.condition)}>{item.condition}</button>)
        }
      }




    });


    return <div style={{display: "flex", flexDirection: "row", alignItems: "left", gap: "10px"}}>

               <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                  {conTags[0]}
                  {conTags[1]}
                  {conTags[2]}
                  {conTags[3]}
                  {conTags[4]}
               </div>

               <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                 {conTags[5]}
                 {conTags[6]}
                 {conTags[7]}
                 {conTags[8]}
                 {conTags[9]}
               </div>

               <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                 {conTags[10]}
                 {conTags[11]}
                 {conTags[12]}
                 {conTags[13]}
                 {conTags[14]}
               </div>

           </div>
  }


removeCondition (condition) {
  var index = this.state.activeConditions.indexOf(condition)

  this.state.activeConditions.splice(index, 1);

  this.props.changeStateTest()
}


exhaustChange (condition, type) {

  var index = this.state.activeConditions.indexOf(condition)

  var size = this.state.activeConditions[index].length - 1
  var level = condition.charAt(size);

  if (type == "Good") {

    if (level == 1) { // remove the whole condition

      this.state.activeConditions.splice(index, 1);

    } else { // lower the level by one
      level = level - 1;

      condition = condition.slice(0, -1)

      this.state.activeConditions[index] = condition + level;
    }
  } else if (type == "Bad") {
    if (level < 6) { // cannot go higher than 6
      level = parseInt(level) + 1;

      condition = condition.slice(0, -1)

      this.state.activeConditions[index] = condition + level;
    }
  }

  this.props.changeStateTest()
}


  // pop up that has list of languages known, then a button for each other language to select to add it to the list
  // need the

  // maybe the answer is one big list of all languages with the buttons - known are pre selected

  render() {

    console.log(this.conditionGuide)

    return <div class="card" style={{ width: "20rem" }}>
              <div class="card-body">
                <h5 class="card-title-stat">Conditions</h5>


                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"5px"}}>

                    <button type="button" id="addCondition" onClick={this.handleShow} class="btn btn-dark">Add</button>

                    <Modal
                      show={this.state.show}
                      onHide={this.handleClose}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Conditions</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          {this.conditionPopUp()}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>



                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"5px"}}>

                        {this.state.activeConditions.map(function(condition){

                              if (condition.includes("Exhaustion")) {
                                    return (<div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"15px"}}>

                                                <button type="button" id="exhaustionAdd" onClick={() => this.exhaustChange(condition, "Bad")} class="btn btn-dark">+</button>

                                                <p>{condition}</p>

                                                <button type="button" id="exhaustionRemove" onClick={() => this.exhaustChange(condition, "Good")} class="btn btn-dark">-</button>

                                            </div>)
                              } else {

                                    return (<div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"15px"}}>


                                                <p>{condition}</p>

                                                <button type="button" id={"conditionRemove" + condition} onClick={() => this.removeCondition(condition)} class="btn btn-dark">X</button>

                                            </div>)

                              }

                        }, this)}

                    </div>

                </div>

              </div>
    </div>



  }
}

export default ConditionCard;
