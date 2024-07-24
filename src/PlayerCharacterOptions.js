import React from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';
import HealthCard from "./HealthCard";
import HitDieCard from "./HitDieCard";
import TempHPCard from "./TempHPCard";
import SavesAndSkills from "./SavesAndSkills";
import DiceRoller from "./DiceRoller";
import Languages from "./Languages";
import ConditionCard from "./ConditionCard"; 

class PlayerCharacterOptions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      change: "",
      currentHP: this.props.hp,
      tempHP: this.props.temphp,
      tempAC: this.props.ac,
      initiativeRoll: ""
    };

    // you could use an if else here depending on props to have a fake version of two+ constructors
    // i think i would like one that takes in a player object potentially - if i have the object why would i need a new one?

    this.name = this.props.name; // done
    this.level = this.props.level; // done
    this.class = this.props.playerclass; // done
    this.background = this.props.background; // done
    this.race = this.props.race; // done
    this.alignment = this.props.alignment; // done
    this.experiencePoints = this.props.experiencepoints; // done



    this.insparation = this.props.insparation; // done
    this.proficiency = this.props.proficiency; // done
    this.ac = this.props.ac; // done
    this.initiative = this.statBonus(this.props.stats.Dexterity) > -1 ? "+" + this.statBonus(this.props.stats.Dexterity) : this.statBonus(this.props.stats.Dexterity);

    // done ~ future things can influence, dex calc
    this.speed = this.props.speed; // done ~ way to see other speeds

    this.hp = this.props.hp; // add/edit button
    this.tempHP = this.props.temphp; // add/edit button
    this.hitDie = this.props.hitdie; // loop through, roll button
    this.conditions = this.props.conditions; // loop through, add/edit button
    this.deathSaves = this.props.deathsaves; // Unique Display


    this.proficiencies = this.props.proficiencies; // loop through, used in others
    this.featuresTraits = this.props.featurestraits; // loop through, add/edit button,
    this.languages = this.props.languages; // display loop needed, add/edit button
    this.stats = this.props.stats; // done


    this.personalityTraits = this.props.personalitytraits; // display loop needed
    this.ideals = this.props.ideals; // display loop needed
    this.bonds = this.props.bonds; // display loop needed
    this.flaws = this.props.flaws; // display loop needed



    this.weapons = this.props.weapons; // NOT TOUCHED
    this.spells = this.props.spells; // NOT TOUCHED

    this.coinPurse = this.props.coinpurse; // done
    this.inventory = this.props.inventory; // loop through, add/edit button, 'open inventory' functionality

    this.attunementSlots = this.props.attunementslots; // Unique Display, filled with inventory actions 'equip'
    this.equiptGear = this.props.equiptgear; // Unique Display, filled with inventory actions 'equip'



    // non character sheet things i want to store for players
    this.notes = ["temp"];
    this.pets = ["temp"];

    this.changeStateLang = this.changeStateLang.bind(this)
    this.changeStateCondition = this.changeStateCondition.bind(this)
    this.changeStateHP = this.changeStateHP.bind(this)
    this.changeStateTempHP = this.changeStateTempHP.bind(this)
    this.changeStateTest = this.changeStateTest.bind(this)
    this.inspoPlus = this.inspoPlus.bind(this);
    this.inspoMinus = this.inspoMinus.bind(this);
    this.longRest = this.longRest.bind(this);
    this.shortRest = this.shortRest.bind(this);
    this.tempAcMinus = this.tempAcMinus.bind(this);
    this.tempAcPlus = this.tempAcPlus.bind(this);
    this.resetAc = this.resetAc.bind(this);
    this.initiativeRoll = this.initiativeRoll.bind(this)
    //this.statBonus = this.statBonus.bind(this)
  }



  changeStateTest() {

    this.setState({
      change: 'some value'
    })

  }

  changeStateLang(langs) {
    this.languages = langs;

    this.setState({
      change: 'some value'
    })

    this.props.hangeLangChange(langs)
  }

  changeStateCondition(conditions) {
    this.conditions = conditions;

    this.setState({
      change: 'some value'
    })

    //this.props.handleConChange(conditions)
  }


  changeStateTempHP(value) { // i need this to triger the update of HealthCard
    this.setState({
      tempHP: value
    })

  }
  changeStateHP(current, temp) { // i need this to triger the update of HealthCard
    this.setState({
      currentHP: current,
      tempHP: temp
    })

  }


  statBonus(statVal){
    return Math.floor((statVal - 10)/2)
  }

  roleDice(dice){
    // format (# of dice) d (die type) + bonus
    var numberOfDice = dice.split("d")              // [0] will be number of die
    var dieType_Bonus = numberOfDice[1].split("+")  // [0] will be die type, IFF [1] exists [1] is the bonus

    var rolls = [ 0, [], [] ]

    if (dieType_Bonus.size > 1) { //bonus
      rolls[0] = dieType_Bonus[1];
    }

    for (var i = 0; i < numberOfDice[0]; ++i){
      // die type is dieType_Bonus[0] 4, 6, 8, 10, 12, 20, 100
      var roll = Math.floor(Math.random() * parseInt(dieType_Bonus[0])) + 1;



      rolls[1].push(roll) // this needs math.rand with die plus bonus if it exists
      rolls[2].push(roll + parseInt(rolls[0])) // this needs math.rand with die plus bonus if it exists
    }


    return rolls;
  }

  inspoPlus() {
    this.insparation = this.insparation + 1;

    this.setState({
      change: 'some value'
    })
  }
  inspoMinus() {
    this.insparation = this.insparation - 1;

    this.setState({
      change: 'some value'
    })
  }

  tempAcPlus() {
    this.setState({
      tempAC: this.state.tempAC + 1
    })
  }
  tempAcMinus() {
    this.setState({
      tempAC: this.state.tempAC - 1
    })
  }
  resetAc() {

    this.setState({
      tempAC: this.ac
    })
  }

initiativeRoll() {
  //var bonus = this.statBonus(this.stats.Dexterity)
  var bonus = this.proficiencies.indexOf("Initiative") > -1 ? this.statBonus(this.stats.Dexterity) + this.proficiency : this.statBonus(this.stats.Dexterity);
  var roll = Math.floor(Math.random() * 20) + 1;

  this.setState({
    initiativeRoll: "Roll - " + roll + " Total - " + (roll + bonus)
  })
}

  longRest() {

  }

  shortRest() {

  }

  render() {
    console.log(this.tempac)

    var die = this.roleDice("1d20");
    var speedString = "Walking: " + this.speed.Walking + "\nSwimming: " + this.speed.Swimming + "\nClimbing: " + this.speed.Climbing + "\nFlying: " + this.speed.Flying + "\nJumping: " + this.speed.Jumping;

    // this is the magic item card set up need to change it majorlly
    return <div style={{display: "flex", flexDirection: "column", alignItems: "right"}}>



                  <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                      <div class="card" style={{ width: "90rem" }}>
                        <div class="card-body">
                          <h5 class="card-title">{this.name}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">Class: {this.class} ------ Level: {this.level} ------ Background: {this.background}</h6>
                          <h6 class="card-subtitle mb-2 text-muted">Race: {this.race} ------ Alignment: {this.alignment} ------ Experience Points: {this.experiencePoints}</h6>
                        </div>
                      </div>
                  </div>






                  <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div class="card" style={{ width: "12rem" }}>
                                <div class="card-body">
                                  <h5 class="card-title-stat">Strength</h5>
                                  <p class="card-text-stat">{this.stats.Strength} : {Math.floor((this.stats.Strength - 10)/2) > -1 ? "+" + Math.floor((this.stats.Strength - 10)/2): Math.floor((this.stats.Strength - 10)/2)}</p>
                                </div>
                            </div>
                            <div class="card" style={{ width: "12rem" }}>
                                <div class="card-body">
                                  <h5 class="card-title-stat">Dexterity</h5>
                                  <p class="card-text-stat">{this.stats.Dexterity} : {Math.floor((this.stats.Dexterity - 10)/2) > -1 ? "+" + Math.floor((this.stats.Dexterity - 10)/2): Math.floor((this.stats.Dexterity - 10)/2)}</p>
                                </div>
                            </div>
                            <div class="card" style={{ width: "12rem" }}>
                                <div class="card-body">
                                  <h5 class="card-title-stat">Constitution</h5>
                                  <p class="card-text-stat">{this.stats.Constitution} : {Math.floor((this.stats.Constitution - 10)/2) > -1 ? "+" + Math.floor((this.stats.Constitution - 10)/2): Math.floor((this.stats.Constitution - 10)/2)}</p>
                                </div>
                            </div>
                            <div class="card" style={{ width: "12rem" }}>
                                <div class="card-body">
                                  <h5 class="card-title-stat">Intelligence</h5>
                                  <p class="card-text-stat">{this.stats.Intelligence} : {Math.floor((this.stats.Intelligence - 10)/2) > -1 ? "+" + Math.floor((this.stats.Intelligence - 10)/2): Math.floor((this.stats.Intelligence - 10)/2)}</p>
                                </div>
                            </div>
                            <div class="card" style={{ width: "12rem" }}>
                                <div class="card-body">
                                  <h5 class="card-title-stat">Wisdom</h5>
                                  <p class="card-text-stat">{this.stats.Wisdom} : {Math.floor((this.stats.Wisdom - 10)/2) > -1 ? "+" + Math.floor((this.stats.Wisdom - 10)/2): Math.floor((this.stats.Wisdom - 10)/2)}</p>
                                </div>
                            </div>
                            <div class="card" style={{ width: "12rem" }}>
                                <div class="card-body">
                                  <h5 class="card-title-stat">Charisma</h5>
                                  <p class="card-text-stat">{this.stats.Charisma} : {Math.floor((this.stats.Charisma - 10)/2) > -1 ? "+" + Math.floor((this.stats.Charisma - 10)/2): Math.floor((this.stats.Charisma - 10)/2)}</p>
                                </div>
                            </div>
                      </div>


                      <SavesAndSkills
                        stats = {this.stats}
                        proficiency = {this.proficiency}
                        proficiencies = {this.proficiencies}
                        changeStateTest = {this.changeStateTest}
                      />


                      <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                          <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>

                              <HealthCard
                                maxHP = {this.hp}
                                currentHP = {this.state.currentHP}
                                tempHP = {this.state.tempHP}
                                changeStateHP = {this.changeStateHP}
                               />

                               <TempHPCard
                                 tempHP = {this.state.tempHP}
                                 changeStateTempHP = {this.changeStateTempHP}
                               />


                               <HitDieCard
                                 maxHP = {this.hp}
                                 currentHP = {this.state.currentHP}
                                 tempHP = {this.state.tempHP}
                                 changeStateHP = {this.changeStateHP}
                                 hitDie = {this.hitDie}
                                 changeStateTest = {this.changeStateTest}
                                 stats = {this.stats}
                                />


                                <ConditionCard
                                  languages = {this.languages}
                                  changeStateHP = {this.changeStateHP}
                                  changeStateTest = {this.changeStateTest}
                                  changeStateCondition = {this.changeStateCondition}
                                  conditions = {this.conditions}
                                 />




                              <div class="card" style={{ width: "15rem" }}>
                                  <div class="card-body">

                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                      <h5 class="card-title-stat">Armor Class</h5>
                                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                                          <button type="button" id="inspoPlus" onClick={this.tempAcPlus} class="btn btn-outline-dark">+</button>
                                          <p class="card-text-stat">{this.state.tempAC}</p>
                                          <button type="button" id="inspoMinus" onClick={this.tempAcMinus} class="btn btn-outline-dark">-</button>
                                      </div>
                                      <button type="button" id="resetAC" onClick={this.resetAc} class="btn btn-dark">Reset</button>
                                    </div>

                                  </div>
                              </div>


                          </div>



                          <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>

                              <div class="card" style={{ width: "15rem" }}>
                                  <div class="card-body">
                                    <h5 class="card-title-stat">Rests</h5>
                                        <div style={{display: "flex", flexDirection: "row", alignItems: "left", gap:"5px"}}>
                                            <button type="button" id="longRest" class="btn btn-dark" onClick={this.longRest}>Long Rest</button>
                                            <button type="button" id="shortRest" class="btn btn-dark"  onClick={this.shortRest}>Short Rest</button>
                                        </div>



                                  </div>
                              </div>


                              <div class="card" style={{ width: "15rem" }}>
                                  <div class="card-body">

                                  <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"1px"}}>
                                      <h5 class="card-title-stat">Initiative</h5>
                                      <p class="card-text-stat">{this.proficiencies.indexOf("Initiative") > -1 ?
                                              (this.statBonus(this.stats.Dexterity) + this.proficiency > -1 ? "+" + (this.statBonus(this.stats.Dexterity) + this.proficiency) : (this.statBonus(this.stats.Dexterity) + this.proficiency))
                                              :
                                              (this.statBonus(this.stats.Dexterity) > -1 ? "+" + this.statBonus(this.stats.Dexterity) : this.statBonus(this.stats.Dexterity))}</p>

                                      <button type="button" id="shortRest" class="btn btn-dark" onClick={this.initiativeRoll}>Roll</button>
                                      <p>{this.state.initiativeRoll}</p>
                                  </div>







                                  </div>
                              </div>

                              <div class="card" data-toggle="tooltip" data-placement="bottom" title={speedString} style={{ width: "15rem" }}>
                                  <div class="card-body">
                                    <h5 class="card-title-stat">Speed</h5>

                                    <p class="card-text-stat">{this.speed.Walking}</p>

                                  </div>
                              </div>

                              <div class="card" style={{ width: "15rem" }}>
                                  <div class="card-body">

                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                      <h5 class="card-title-stat">Insparation</h5>
                                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                                          <button type="button" id="inspoPlus" onClick={this.inspoPlus} class="btn btn-outline-dark">+</button>
                                          <p class="card-text-stat">{this.insparation}</p>
                                          <button type="button" id="inspoMinus" onClick={this.inspoMinus} class="btn btn-outline-dark">-</button>
                                      </div>
                                    </div>

                                  </div>
                              </div>

                              <div class="card" style={{ width: "15rem" }}>
                                  <div class="card-body">
                                    <h5 class="card-title-stat">Proficiency Bonus</h5>
                                    <p class="card-text-stat">{this.proficiency > -1 ? '+' + this.proficiency : this.proficiency}</p>
                                  </div>
                              </div>

                              <div class="card" style={{ width: "15rem" }}>
                                  <div class="card-body">
                                    <h5 class="card-title-stat">Passive Wisdom</h5>
                                    <p class="card-text-stat">{this.proficiencies.indexOf("Perception") > -1 ? (10 + this.statBonus(this.stats.Wisdom) + this.proficiency) : (10 + this.statBonus(this.stats.Wisdom))}</p>
                                  </div>
                              </div>
                          </div>
                      </div>


                      <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>


                          <Languages
                            languages = {this.languages}
                            changeStateHP = {this.changeStateHP}
                            changeStateTest = {this.changeStateTest}
                            changeStateLang = {this.changeStateLang}
                           />

                          <div class="card" style={{ width: "33rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Traits and Features</h5>
                              <p>
                                {this.featuresTraits.map(function(trait){
                                  return (<p>{trait}</p>)
                                })}
                              </p>
                            </div>
                          </div>

                          <div class="card" style={{ width: "33rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Dice Roller</h5>
                              <p>

                              </p>

                              <DiceRoller
                                changeStateTest = {this.changeStateTest}
                              />

                            </div>
                          </div>
                      </div>
                  </div>





                  <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>

                      <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                          <div class="card" style={{ width: "30rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Inventory</h5>
                              <p>
                                {this.inventory.map(function(trait){
                                  return (<p>{trait}</p>)
                                })}
                              </p>
                            </div>
                          </div>


                          <div class="card" style={{ width: "30rem" }}>
                            <div class="card-body">
                              <h5 class="card-title">Coins:</h5>
                              <h6 class="card-subtitle mb-2 text-muted">Platinum: {this.coinPurse.platinum}</h6>
                              <h6 class="card-subtitle mb-2 text-muted">Gold: {this.coinPurse.gold}</h6>
                              <h6 class="card-subtitle mb-2 text-muted">Silver: {this.coinPurse.silver}</h6>
                              <h6 class="card-subtitle mb-2 text-muted">Copper: {this.coinPurse.copper}</h6>
                            </div>
                          </div>
                      </div>


                      <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                          <div class="card" style={{ width: "30rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Equipt Gear</h5>
                              <p class="card-text-stat">Armor: {this.equiptGear.armor}</p>
                              <p class="card-text-stat">Boots: {this.equiptGear.boots}</p>
                              <p class="card-text-stat">Cloak: {this.equiptGear.cloak}</p>
                              <p class="card-text-stat">Head: {this.equiptGear.head}</p>
                              <p class="card-text-stat">Necklace: {this.equiptGear.necklace}</p>
                              <p class="card-text-stat">Shield: {this.equiptGear.shield}</p>
                              <p class="card-text-stat">Hands: {this.equiptGear.hands}</p>
                              <p class="card-text-stat">Ring: {this.equiptGear.ring}</p>
                              <p class="card-text-stat">Focus: {this.equiptGear.focus}</p>
                              <p class="card-text-stat">Bracers: {this.equiptGear.bracers}</p>
                            </div>
                          </div>


                          <div class="card" style={{ width: "30rem" }}>
                            <div class="card-body">
                              <h5 class="card-title">Attunment Slots:</h5>
                              <h6 class="card-subtitle mb-2 text-muted">1 - {this.attunementSlots[0]}</h6>
                              <h6 class="card-subtitle mb-2 text-muted">2 - {this.attunementSlots[1]}</h6>
                              <h6 class="card-subtitle mb-2 text-muted">3 - {this.attunementSlots[2]}</h6>
                            </div>
                          </div>
                      </div>


                      <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                          <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                            <div class="card" style={{ width: "30rem" }}>
                              <div class="card-body">
                                <h5 class="card-title-stat">Personality Traits</h5>
                                <p>
                                  {this.personalityTraits.map(function(trait){
                                    return (<p>{trait}</p>)
                                  })}
                                </p>
                              </div>
                            </div>
                            <div class="card" style={{ width: "30rem" }}>
                              <div class="card-body">
                                <h5 class="card-title-stat">Ideals</h5>
                                <p>
                                  {this.ideals.map(function(trait){
                                    return (<p>{trait}</p>)
                                  })}
                                </p>
                              </div>
                            </div>
                            <div class="card" style={{ width: "30rem" }}>
                              <div class="card-body">
                                <h5 class="card-title-stat">Bonds</h5>
                                <p>
                                  {this.bonds.map(function(trait){
                                    return (<p>{trait}</p>)
                                  })}
                                </p>
                              </div>
                            </div>
                            <div class="card" style={{ width: "30rem" }}>
                              <div class="card-body">
                                <h5 class="card-title-stat">Flaws</h5>
                                <p>
                                  {this.flaws.map(function(trait){
                                    return (<p>{trait}</p>)
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>



           </div>;




  }
}


export default PlayerCharacterOptions;
