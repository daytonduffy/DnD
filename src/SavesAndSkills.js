import React from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';

class SavesAndSkills extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      saveStr: "",
      checkStr: "",
      saveRollState: 0,
      checkRollState: 0,
    };


    this.stats = this.props.stats;
    this.proficiency = this.props.proficiency;
    this.proficiencies = this.props.proficiencies;


    this.checkArcana = this.checkArcana.bind(this);
    this.checkAthletics = this.checkAthletics.bind(this);
    this.checkDeception = this.checkDeception.bind(this);
    this.checkHistory = this.checkHistory.bind(this);
    this.checkInsight = this.checkInsight.bind(this);
    this.checkInti = this.checkInti.bind(this);
    this.checkInv = this.checkInv.bind(this);
    this.checkMedicine = this.checkMedicine.bind(this);
    this.checkNature = this.checkNature.bind(this);
    this.checkPerc = this.checkPerc.bind(this);
    this.checkPerf = this.checkPerf.bind(this);
    this.checkPers = this.checkPers.bind(this);
    this.checkReligion = this.checkReligion.bind(this);
    this.checkSlight = this.checkSlight.bind(this);
    this.checkStealth = this.checkStealth.bind(this);
    this.checkSurvive = this.checkSurvive.bind(this);
    this.checkAnimal = this.checkAnimal.bind(this);
    this.checkAcro = this.checkAcro.bind(this);
    this.savingThrowStr = this.savingThrowStr.bind(this);
    this.savingThrowDex = this.savingThrowDex.bind(this);
    this.savingThrowCon = this.savingThrowCon.bind(this);
    this.savingThrowInt = this.savingThrowInt.bind(this);
    this.savingThrowWis = this.savingThrowWis.bind(this);
    this.savingThrowCha = this.savingThrowCha.bind(this);
    this.savingThrow = this.savingThrow.bind(this);
    this.saveCardSubtitle = this.saveCardSubtitle.bind(this);
    this.skillCardSubtitle = this.skillCardSubtitle.bind(this);
    this.prof = this.prof.bind(this);

    this.saveDisadvantage = this.saveDisadvantage.bind(this);
    this.saveAdvantage = this.saveAdvantage.bind(this);

    this.checkAdvantage = this.checkAdvantage.bind(this);
    this.checkDisadvantage = this.checkDisadvantage.bind(this);

  }


  statBonus(statVal){
    return Math.floor((statVal - 10)/2)
  }

  saveCardSubtitle(type, bonus) {
    return <h6 class="card-subtitle mb-2 text-muted">{type} - {bonus > -1 ? "+" + bonus : bonus}</h6>
  }
  saveCardButton(type, bonus) {
    return <button type="button" id={type} onClick={this.savingThrowStr} class="btn btn-dark">Roll</button>
  }

  savingThrow(type, bonus) {

    var roll = Math.floor(Math.random() * 20) + 1;
    var total = roll + bonus;

    this.state.saveStr = type + " Save - Roll: " + roll + " Total: " + total
  }

  savingThrowStr() {



    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Strength") ? (this.statBonus(this.stats.Strength) + this.proficiency) : this.statBonus(this.stats.Strength)
    var total = roll + bonus;

    this.state.saveStr = "Strength Save - Roll: " + roll + " Total: " + total

    if (this.state.saveRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.saveStr = this.state.saveStr + " Roll: " + roll2 + " Total: " + total2
    }


    this.props.changeStateTest()
  }
  savingThrowDex() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Dexterity") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)
    var total = roll + bonus;

    this.state.saveStr = "Dexterity Save - Roll: " + roll + " Total: " + total

    if (this.state.saveRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.saveStr = this.state.saveStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }
  savingThrowCon() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Constitution") ? (this.statBonus(this.stats.Constitution) + this.proficiency) : this.statBonus(this.stats.Constitution)
    var total = roll + bonus;

    this.state.saveStr = "Constitution Save - Roll: " + roll + " Total: " + total

    if (this.state.saveRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.saveStr = this.state.saveStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }
  savingThrowInt() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Intelligence") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)
    var total = roll + bonus;

    this.state.saveStr = "Intelligence Save - Roll: " + roll + " Total: " + total

    if (this.state.saveRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.saveStr = this.state.saveStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }
  savingThrowWis() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Wisdom") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)
    var total = roll + bonus;

    this.state.saveStr = "Wisdom Save - Roll: " + roll + " Total: " + total

    if (this.state.saveRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.saveStr = this.state.saveStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }
  savingThrowCha() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Charisma") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)
    var total = roll + bonus;

    this.state.saveStr = "Charisma Save - Roll: " + roll + " Total: " + total

    if (this.state.saveRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.saveStr = this.state.saveStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }




  skillCardSubtitle(name, typeAbrev, bonus) {
    return <h6 class="card-subtitle mb-2 text-muted">{name} {typeAbrev} - {bonus > -1 ? "+" + bonus : bonus}</h6>
  }




  checkAcro() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Acrobatics") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)
    var total = roll + bonus;

    this.state.checkStr = "Acrobatics (Dex) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkAnimal() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Animal Handling") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)
    var total = roll + bonus;

    this.state.checkStr = "Animal Handling (Wis) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkArcana() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Arcana") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)
    var total = roll + bonus;

    this.state.checkStr = "Arcana (Int) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkAthletics() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Athletics") ? (this.statBonus(this.stats.Strength) + this.proficiency) : this.statBonus(this.stats.Strength)
    var total = roll + bonus;

    this.state.checkStr = "Athletics (Str) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkDeception() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Deception") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)
    var total = roll + bonus;

    this.state.checkStr = "Deception (Wis) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkHistory() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("History") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)
    var total = roll + bonus;

    this.state.checkStr = "History (Int) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkInsight() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Insight") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)
    var total = roll + bonus;

    this.state.checkStr = "Insight (Wis) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkInti() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Intimidation") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)
    var total = roll + bonus;

    this.state.checkStr = "Intimidation (Cha) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkInv() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Investigation") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)
    var total = roll + bonus;

    this.state.checkStr = "Investigation (Int) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkMedicine() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Medicine") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)
    var total = roll + bonus;

    this.state.checkStr = "Medicine (Wis) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkNature() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Nature") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)
    var total = roll + bonus;

    this.state.checkStr = "Nature (Int) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkPerc() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Perception") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)
    var total = roll + bonus;

    this.state.checkStr = "Perception (Wis) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkPerf() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Performance") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)
    var total = roll + bonus;

    this.state.checkStr = "Performance (Cha) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkPers() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Persuasion") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)
    var total = roll + bonus;

    this.state.checkStr = "Persuasion (Cha) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkReligion() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Religion") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)
    var total = roll + bonus;

    this.state.checkStr = "Religion (Int) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkSlight() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Slight of Hand") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)
    var total = roll + bonus;

    this.state.checkStr = "Slight of Hand (Dex) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkStealth() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Stealth") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)
    var total = roll + bonus;

    this.state.checkStr = "Stealth (Dex) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }

  checkSurvive() {

    var roll = Math.floor(Math.random() * 20) + 1;
    var bonus = this.prof("Survival") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)
    var total = roll + bonus;

    this.state.checkStr = "Survival (Wis) Check - Roll: " + roll + " Total: " + total

    if (this.state.checkRollState != 0) { // roll twice
      var roll2 = Math.floor(Math.random() * 20) + 1;
      var total2 = roll2 + bonus;

      this.state.checkStr = this.state.checkStr + " Roll: " + roll2 + " Total: " + total2
    }

    this.props.changeStateTest()
  }





  prof(skill) {
    return this.proficiencies.indexOf(skill) > -1 ? true : false;
  }


  saveAdvantage(){

    // 0 - straight, 1 - Adv, 2 - Dis
    if (this.state.saveRollState == 0 || this.state.saveRollState == 2){
      this.state.saveRollState = 1
      document.getElementById('saveAdv').className = "btn btn-dark";
      document.getElementById('saveDis').className = "btn btn-outline-dark";
    } else if (this.state.saveRollState == 1) {
      this.state.saveRollState = 0
      document.getElementById('saveAdv').className = "btn btn-outline-dark";
      document.getElementById('saveDis').className = "btn btn-outline-dark";
    }

  }

  saveDisadvantage(){
    // 0 - straight, 1 - Adv, 2 - Dis
    if (this.state.saveRollState == 0 || this.state.saveRollState == 1){
      this.state.saveRollState = 2
      document.getElementById('saveAdv').className = "btn btn-outline-dark";
      document.getElementById('saveDis').className = "btn btn-dark";
    } else if (this.state.saveRollState == 2) {
      this.state.saveRollState = 0
      document.getElementById('saveAdv').className = "btn btn-outline-dark";
      document.getElementById('saveDis').className = "btn btn-outline-dark";
    }

  }



  checkAdvantage(){

    // 0 - straight, 1 - Adv, 2 - Dis
    if (this.state.checkRollState == 0 || this.state.checkRollState == 2){
      this.state.checkRollState = 1
      document.getElementById('checkAdv').className = "btn btn-dark";
      document.getElementById('checkDis').className = "btn btn-outline-dark";
    } else if (this.state.checkRollState == 1) {
      this.state.checkRollState = 0
      document.getElementById('checkAdv').className = "btn btn-outline-dark";
      document.getElementById('checkDis').className = "btn btn-outline-dark";
    }

  }

  checkDisadvantage(){
    // 0 - straight, 1 - Adv, 2 - Dis
    if (this.state.checkRollState == 0 || this.state.checkRollState == 1){
      this.state.checkRollState = 2
      document.getElementById('checkAdv').className = "btn btn-outline-dark";
      document.getElementById('checkDis').className = "btn btn-dark";
    } else if (this.state.checkRollState == 2) {
      this.state.checkRollState = 0
      document.getElementById('checkAdv').className = "btn btn-outline-dark";
      document.getElementById('checkDis').className = "btn btn-outline-dark";
    }

  }


  render() {
    // {this.saveCardButton("Strength", (this.prof("Strength") ? (this.statBonus(this.stats.Strength) + this.proficiency) : this.statBonus(this.stats.Strength)))}

    // i think its cleaner to
    // third one actually needs to be a state set up by the onClick functions to
    // onClick - roll 1d20 and add the associated bonus, can be sent bonus, so doesnt need info on what its rolling SOOOO all can use userName
    // later on we can add the advantage/disadvantage selector
    // maybe send the Type so i can have one result line that says "X save: Result: Total: " on the bottom

    // this is the magic item card set up need to change it majorlly
    return <div style={{display: "flex", flexDirection: "row", alignItems: "right"}}>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">Saving Throws:</h5>

          <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"5px"}}>

              <button type="button" id="saveAdv" onClick={this.saveAdvantage} class="btn btn-outline-dark">Advantage</button>
              <button type="button" id="saveDis" onClick={this.saveDisadvantage} class="btn btn-outline-dark">Disadvantage</button>

          </div>

          <div style={{display: "flex", flexDirection: "row", alignItems: "right"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "right"}}>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="str" onClick={this.savingThrowStr} class="btn btn-dark">Roll</button>
                      {this.saveCardSubtitle("Strength", (this.prof("Strength") ? (this.statBonus(this.stats.Strength) + this.proficiency) : this.statBonus(this.stats.Strength)))}
                  </div>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="dex" onClick={this.savingThrowDex} class="btn btn-dark">Roll</button>
                      {this.saveCardSubtitle("Dexterity", (this.prof("Dexterity") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)))}
                  </div>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="con" onClick={this.savingThrowCon} class="btn btn-dark">Roll</button>
                      {this.saveCardSubtitle("Constitution", (this.prof("Constitution") ? (this.statBonus(this.stats.Constitution) + this.proficiency) : this.statBonus(this.stats.Constitution)))}
                  </div>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="int" onClick={this.savingThrowInt} class="btn btn-dark">Roll</button>
                      {this.saveCardSubtitle("Intelligence", (this.prof("Intelligence") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)))}
                  </div>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="wis" onClick={this.savingThrowWis} class="btn btn-dark">Roll</button>
                      {this.saveCardSubtitle("Wisdom", (this.prof("Wisdom") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)))}
                  </div>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="cha" onClick={this.savingThrowCha} class="btn btn-dark">Roll</button>
                      {this.saveCardSubtitle("Charisma", (this.prof("Charisma") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)))}
                  </div>


                  <h6 class="card-subtitle mb-2 text-muted">{this.state.saveStr}</h6>

              </div>
          </div>




        </div>
      </div>
      <div class="card" style={{ width: "25rem" }}>
        <div class="card-body">
          <h5 class="card-title">Skill Checks:</h5>


          <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"5px"}}>

              <button type="button" id="checkAdv" onClick={this.checkAdvantage} class="btn btn-outline-dark">Advantage</button>
              <button type="button" id="checkDis" onClick={this.checkDisadvantage} class="btn btn-outline-dark">Disadvantage</button>

          </div>


          <div style={{display: "flex", flexDirection: "row", alignItems: "right"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "right"}}>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="acro" onClick={this.checkAcro} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Acrobatics", "(Dex)", (this.prof("Acrobatics") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="aniHand" onClick={this.checkAnimal} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Animal Handling", "(Wis)", (this.prof("Animal Handling") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="arcana" onClick={this.checkArcana} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Arcana", "(Int)", (this.prof("Arcana") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="athlet" onClick={this.checkAthletics} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Athletics", "(Str)", (this.prof("Athletics") ? (this.statBonus(this.stats.Strength) + this.proficiency) : this.statBonus(this.stats.Strength)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="dece" onClick={this.checkDeception} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Deception", "(Cha)", (this.prof("Deception") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="hist" onClick={this.checkHistory} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("History", "(Int)", (this.prof("History") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="insi" onClick={this.checkInsight} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Insight", "(Wis)", (this.prof("Insight") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="inti" onClick={this.checkInti} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Intimidation", "(Cha)", (this.prof("Intimidation") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="inve" onClick={this.checkInv} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Investigation", "(Int)", (this.prof("Investigation") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="med" onClick={this.checkMedicine} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Medicine", "(Wis)", (this.prof("Medicine") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="nat" onClick={this.checkNature} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Nature", "(Int)", (this.prof("Nature") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="perc" onClick={this.checkPerc} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Perception", "(Wis)", (this.prof("Perception") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="perf" onClick={this.checkPerf} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Performance", "(Cha)", (this.prof("Performance") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="pers" onClick={this.checkPers} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Persuasion", "(Cha)", (this.prof("Persuasion") ? (this.statBonus(this.stats.Charisma) + this.proficiency) : this.statBonus(this.stats.Charisma)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="rel" onClick={this.checkReligion} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Religion", "(Int)", (this.prof("Religion") ? (this.statBonus(this.stats.Intelligence) + this.proficiency) : this.statBonus(this.stats.Intelligence)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="slight" onClick={this.checkSlight} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Slight of Hand", "(Dex)", (this.prof("Slight of Hand") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="stealt" onClick={this.checkStealth} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Stealth", "(Dex)", (this.prof("Stealth") ? (this.statBonus(this.stats.Dexterity) + this.proficiency) : this.statBonus(this.stats.Dexterity)))}
                  </div>

                  <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                      <button type="button" id="surv" onClick={this.checkSurvive} class="btn btn-dark">Roll</button>
                      {this.skillCardSubtitle("Survival", "(Wis)", (this.prof("Survival") ? (this.statBonus(this.stats.Wisdom) + this.proficiency) : this.statBonus(this.stats.Wisdom)))}
                  </div>

                  <h6 class="card-subtitle mb-2 text-muted">{this.state.checkStr}</h6>

              </div>
          </div>


        </div>
      </div>
    </div>




  }
}

export default SavesAndSkills;
