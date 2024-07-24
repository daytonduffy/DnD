import React from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';

class HitDieCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentHP: parseInt(this.props.maxHP) + parseInt(this.props.tempHP),
      tempHP: parseInt(this.props.tempHP),
      maxHP: parseInt(this.props.maxHP),
      maxHitDie: this.props.hitDie,
      availableHitDie: this.availableDieSetup(),
      healthChange: 0,
      result: "",
      roll: this.setUpRoll(),
      rollTotal: 0
    };


    this.availableDieSetup = this.availableDieSetup.bind(this);
    this.refresh = this.refresh.bind(this);
    this.useDie = this.useDie.bind(this);
    this.removeDie = this.removeDie.bind(this);
    this.rollText = this.rollText.bind(this);
    this.setUpRoll = this.setUpRoll.bind(this);
    this.rollHitDie = this.rollHitDie.bind(this);
    this.rollTotalText = this.rollTotalText.bind(this);

  }

  setUpRoll() {
    var setup = []
    this.props.hitDie.forEach(dieType => {
        setup.push(0)
    });
    return setup
  }


  availableDieSetup(){
    // hit die - d6, d8, d10, d12
    var dice = []
    this.props.hitDie.forEach(dieType => {
        dice.push(parseInt(dieType[0]))
    });
    return dice;
  }


  refresh() {
    this.setState({
      availableHitDie: this.availableDieSetup(),
      roll: this.setUpRoll(),
      rollTotal: 0
    })

    this.props.changeStateTest()
  }


  useDie(index) {

    if (this.state.availableHitDie[index] != 0) {
      this.state.roll[index] = this.state.roll[index] + 1;

      this.state.availableHitDie[index] = this.state.availableHitDie[index] - 1;
    }

    this.props.changeStateTest()


  }

  removeDie(index) {

    if (this.state.roll[index] != 0) {
      this.state.roll[index] = this.state.roll[index] - 1;

      this.state.availableHitDie[index] = this.state.availableHitDie[index] + 1;
    }

    this.props.changeStateTest()

  }

  rollText() {

    var flag = false;
    for (var i = 0; i < this.state.roll.length; ++i) {
      if (this.state.roll[i] != 0) {
        flag = true;
      }
    }

    if (flag) {
      var textArr = this.state.roll.map(function(die, index){

        if (die != 0) {
            return die + this.state.maxHitDie[index].substring(1) + " + "
        } else {
          return ""
        }


      }, this)


      var text = ""
      for (var i = 0; i < textArr.length; ++i) {
        text = text + textArr[i]
      }



      return text.substring(0, text.length - 3)
    }

  }

  rollHitDie() {

    // do nothing if nothing in the roll arr
    var flag = false;
    for (var i = 0; i < this.state.roll.length; ++i) {
      if (this.state.roll[i] != 0) {
        flag = true;
      }
    }
    if (!flag) {
      return
    }




    var total = 0;
    var con =  Math.floor((this.props.stats["Constitution"] - 10)/2)

    this.state.maxHitDie.map(function(die, index){

      if (die != 0) {
        var val = die.split('d')[1]

        for (var i = 0; i < this.state.roll[index]; ++i) {
            total = total + Math.floor(Math.random() * parseInt(val)) + 1 + con;
        }

      }

    }, this)

    this.setState({
      roll: this.setUpRoll(),
      rollTotal: total
    })


    // we have the states for maxHP, currrent HP, and tempHP
    if (this.state.currentHP + total > this.state.maxHP) {
      this.props.changeStateHP(this.state.maxHP, this.state.tempHP)
    } else {
      this.props.changeStateHP(this.state.currentHP + total, this.state.tempHP)
    }


    this.props.changeStateTest()
  }

  rollTotalText() {
    if (this.state.rollTotal != 0) {
      return "Rolled Total: " + this.state.rollTotal
    } else {
      return ""
    }
  }

  render() {

    this.state.tempHP = parseInt(this.props.tempHP)
    this.state.currentHP = parseInt(this.props.currentHP)

    // this is the magic item card set up need to change it majorlly
    return <div class="card" style={{ width: "20rem" }}>
              <div class="card-body">
                <h5 class="card-title-stat">Hit Die</h5>

                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"5px"}}>

                    <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                        <p>Max Hit Die: &nbsp;</p>
                        {this.state.maxHitDie.map(function(die){
                          return (<p>{die}, &nbsp;</p>)
                        })}
                    </div>

                    <p>Available Die</p>

                    <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                        {this.state.maxHitDie.map(function(die){

                          var index = this.state.maxHitDie.indexOf(die);


                          return (<div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"15px"}}>
                                      <button type="button" onClick={() => this.useDie(index)} class="btn btn-dark">Use</button>

                                      <p>{this.state.availableHitDie[index] + this.state.maxHitDie[index].substring(1)}</p>

                                      <button type="button" onClick={() => this.removeDie(index)} class="btn btn-dark">Cancel</button>

                                  </div>)
                                }, this)}



                    </div>


                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"5px"}}>

                        <button type="button" id="hitDieRoll" onClick={() => this.rollHitDie()} class="btn btn-dark">Roll</button>
                        <button type="button" id="hitDieRefresh" onClick={this.refresh} class="btn btn-dark">Refresh</button>

                    </div>

                    <p>{this.rollText()}</p>
                    <p>{this.rollTotalText()}</p>

                </div>



              </div>
          </div>




  }
}

export default HitDieCard;
