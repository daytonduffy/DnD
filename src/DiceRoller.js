import React from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';

class DiceRoller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bonus: "",
      dice: [0, 0, 0, 0, 0, 0, 0],
      resultStr: "",
      totalMode: 0 // 0 - total, 1 - individual totals
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateIsEdit = this.updateIsEdit.bind(this);

    this.res = ["", "", ""]
    this.bonus = ""

    this.roleDice1 = this.roleDice1.bind(this);
    this.roleDice2 = this.roleDice2.bind(this);
    this.rollyPolly = this.rollyPolly.bind(this);
    this.clearyPeary = this.clearyPeary.bind(this);
    this.totalClicked = this.totalClicked.bind(this);
    this.indiTotalClicked = this.indiTotalClicked.bind(this);

    this.addD20 = this.addD20.bind(this);
    this.addD4 = this.addD4.bind(this);
    this.addD6 = this.addD6.bind(this);
    this.addD8 = this.addD8.bind(this);
    this.addD10 = this.addD10.bind(this);
    this.addD12 = this.addD12.bind(this);
    this.addD100 = this.addD100.bind(this);
  }

  // this roll dice function is going to be ONLY for big Total
  // dice are NOT expected to have a bonus tied to them, one bonus is sent seperately
  // each die is rolled and that roll is catalogued
  // then all dice rolls are added, bonus is added, and that BigTotal is the end result to return
  roleDice1(dice, bonus){
    var rolls = [ 0, [], 0]
    if (dice == []) {
      return rolls
    }

    rolls[0] = bonus === "" ? 0 : parseInt(bonus);

    for(var j = 0; j < dice.length; ++j) {
      var numberOfDice = dice[j].split("d") // format is #dDiceType NOBONUS [ #, die type]

      for (var i = 0; i < parseInt(numberOfDice[0]); ++i){
        // die type is numberOfDice[1] 4, 6, 8, 10, 12, 20, 100
        var roll = Math.floor(Math.random() * parseInt(numberOfDice[1])) + 1;

        rolls[1].push(roll) // this adds the result of the roll to the array in the order provided dice - rolls should be one to one
      }

    }

    var bigTotal = 0;
    for (var i = 0; i < rolls[1].length; ++i) {
        bigTotal = bigTotal + rolls[1][i]
    }
    rolls[2] = bigTotal + rolls[0]

    return rolls;
  }


  roleDice2(dice, bonus){
    var rolls = [ 0, [], []]
    if (dice == []) {
      return rolls
    }

    rolls[0] = bonus === "" ? 0 : parseInt(bonus);

    for(var j = 0; j < dice.length; ++j) {
      var numberOfDice = dice[j].split("d") // format is #dDiceType NOBONUS [ #, die type]

      for (var i = 0; i < parseInt(numberOfDice[0]); ++i){
        // die type is numberOfDice[1] 4, 6, 8, 10, 12, 20, 100
        var roll = Math.floor(Math.random() * parseInt(numberOfDice[1])) + 1;

        rolls[1].push(roll) // this adds the result of the roll to the array in the order provided dice - rolls should be one to one
        rolls[2].push(roll + rolls[0]) // this adds in same order the totals for each die
      }

    }

    return rolls;
  }






  handleChange(e) {
    this.setState({
      bonus:e.target.value
    })
    this.props.changeStateTest()

  }
  updateIsEdit(e, value="null") {
    this.setState({
        isEdit: value
    });
  }

  addD20(){
    this.state.dice[0] = this.state.dice[0] + 1;

    this.props.changeStateTest()
    //document.getElementById("work").value = "Roll: " + this.state.dice
  }
  addD4(){
    this.state.dice[1] = this.state.dice[1] + 1;
    this.props.changeStateTest()
  }
  addD6(){
    this.state.dice[2] = this.state.dice[2] + 1;
    this.props.changeStateTest()
  }
  addD8(){
    this.state.dice[3] = this.state.dice[3] + 1;
    this.props.changeStateTest()
  }
  addD10(){
    this.state.dice[4] = this.state.dice[4] + 1;
    this.props.changeStateTest()
  }
  addD12(){
    this.state.dice[5] = this.state.dice[5] + 1;
    this.props.changeStateTest()
  }
  addD100(){
    this.state.dice[6] = this.state.dice[6] + 1;
    this.props.changeStateTest()
  }


  rollyPolly(e){// params cant be sent but state can be updated and such


    // we need to add a check for this.state.totalMode and run the appropriate dice roller, ned to create the other dice roller

    this.state.resultStr = this.state.totalMode == 0 ? this.formatResult1(this.roleDice1(this.formatRoll(this.state.dice), this.state.bonus), this.state.dice) : this.formatResult2(this.roleDice2(this.formatRoll(this.state.dice), this.state.bonus), this.state.dice);
    this.props.changeStateTest()
  }

  clearyPeary () {
    this.state.dice = [0, 0, 0, 0, 0, 0, 0]
    this.state.resultStr = ""
    this.props.changeStateTest()
  }


  formatRoll(dice){
    var arrRoll = []

    if (dice[0] != 0){
      arrRoll.push(dice[0] + "d20")
    }
    if (dice[1] != 0){
      arrRoll.push(dice[1] + "d4")
    }
    if (dice[2] != 0){
      arrRoll.push(dice[2] + "d6")
    }
    if (dice[3] != 0){
      arrRoll.push(dice[3] + "d8")
    }
    if (dice[4] != 0){
      arrRoll.push(dice[4] + "d10")
    }
    if (dice[5] != 0){
      arrRoll.push(dice[5] + "d12")
    }
    if (dice[6] != 0){
      arrRoll.push(dice[6] + "d100")
    }

    return arrRoll
  }


  formatResult1(res, dice) {

    var str = ""
    var i = 0;
    //later ones are reported wrong
    // [20, 20, 4, 4] if 2d20 + 2d4
    //looping from start each time misses the mark

    if (dice[0] != 0){
      str = str + "d20s: results - "
      for (i; i < dice[0]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[1] != 0){
      str = str + "d4s: results - "
      for (i; i < dice[0] + dice[1]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str + " - "
    }

    if (dice[2] != 0){
      str = str + "d6s: results - "
      for (i; i < dice[0] + dice[1] + dice[2]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[3] != 0){
      str = str + "d8s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[4] != 0){
      str = str + "d10s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[5] != 0){
      str = str + "d12s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4] + dice[5]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[6] != 0){
      str = str + "d100s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4] + dice[5] + dice[6]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }




    // final result doesnt always seem to be right but maybe im just crazy
    str = str + "Total: " + res[2]


    return (str)
  }


  formatResult2(res, dice) {

    var str = ""
    var i = 0;
    //later ones are reported wrong
    // [20, 20, 4, 4] if 2d20 + 2d4
    //looping from start each time misses the mark

    if (dice[0] != 0){
      str = str + "d20s: results - "
      for (i; i < dice[0]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[1] != 0){
      str = str + "d4s: results - "
      for (i; i < dice[0] + dice[1]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str + " - "
    }

    if (dice[2] != 0){
      str = str + "d6s: results - "
      for (i; i < dice[0] + dice[1] + dice[2]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[3] != 0){
      str = str + "d8s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[4] != 0){
      str = str + "d10s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[5] != 0){
      str = str + "d12s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4] + dice[5]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[6] != 0){
      str = str + "d100s: results - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4] + dice[5] + dice[6]; ++i) {
        str = str + res[1][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }


    i = 0
    if (dice[0] != 0){
      str = str + "d20s: totals - "
      for (i; i < dice[0]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[1] != 0){
      str = str + "d4s: totals - "
      for (i; i < dice[0] + dice[1]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str + " - "
    }

    if (dice[2] != 0){
      str = str + "d6s: totals - "
      for (i; i < dice[0] + dice[1] + dice[2]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[3] != 0){
      str = str + "d8s: totals - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[4] != 0){
      str = str + "d10s: totals - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[5] != 0){
      str = str + "d12s: totals - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4] + dice[5]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2) + " - "
    }

    if (dice[6] != 0){
      str = str + "d100s: totals - "
      for (i; i < dice[0] + dice[1] + dice[2] + dice[3] + dice[4] + dice[5] + dice[6]; ++i) {
        str = str + res[2][i] + ", "
        //create bonus string at same time then chonk it on after loop, 2 loops and youre out of order
      }
      str = str.slice(0, -2)
    }
    // final result doesnt always seem to be right but maybe im just crazy


    return (str.slice(0, -2))
  }

  totalClicked() {
    if (this.state.totalMode == 1){
      this.state.totalMode = 0
      document.getElementById('totalButton').className = "btn btn-dark";
      document.getElementById('indiTotalButton').className = "btn btn-outline-dark";
    }
  }
  indiTotalClicked() {
    if (this.state.totalMode == 0){
      this.state.totalMode = 1
      document.getElementById('totalButton').className = "btn btn-outline-dark";
      document.getElementById('indiTotalButton').className = "btn btn-dark";
    }
  }


  render() {

    return (
      <div>


        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                <button type="button" id="totalButton" onClick={this.totalClicked} class="btn btn-dark">Total</button>
                <button type="button" id="indiTotalButton" onClick={this.indiTotalClicked} class="btn btn-outline-dark">Individual Totals</button>
            </div>


            <p>Roll: {this.state.bonus != 0 ? this.formatRoll(this.state.dice).join(" + ") + " + " + this.state.bonus : this.formatRoll(this.state.dice, 0).join(" + ")}</p>
            <p>Result: {this.state.resultStr}</p>


            <input type="text" name="userName" value={this.state.bonus} placeholder="Enter Bonus" onChange={this.handleChange} onBlur={this.updateIsEdit}/>

            <dieButton onClick={this.addD20}>D20</dieButton>

            <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                <dieButton onClick={this.addD4}>D4</dieButton>
                <dieButton onClick={this.addD6}>D6</dieButton>
                <dieButton onClick={this.addD8}>D8</dieButton>
            </div>

            <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                <dieButton onClick={this.addD10}>D10</dieButton>
                <dieButton onClick={this.addD12}>D12</dieButton>
                <dieButton onClick={this.addD100}>D100</dieButton>

            </div>

            <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                <dieButton onClick={this.rollyPolly}>Roll</dieButton>
                <dieButton onClick={this.clearyPeary}>Clear</dieButton>

            </div>

        </div>

      </div>



    );
  }
}

export default DiceRoller;
