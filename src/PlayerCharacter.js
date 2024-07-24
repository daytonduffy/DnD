import React from "react";
import "./App.css";
import Section from "./Section";

class PlayerCharacter extends React.Component {

  constructor(props) {
    super(props);

    this.name = "temp";
    this.level = 0;
    this.class = "temp";
    this.background = "temp";
    this.race = "temp";
    this.alignment = "temp";
    this.experiencePoints = 0;



    this.insparation = 0;
    this.proficiency = 0;
    this.ac = 0;
    this.initiative = 0;
    this.speed = {
      "Walking": 0,
      "Swimming": 0,
      "Climbing": 0,
      "Flying": 0,
      "Jumping": 0
    };

    this.hp = 0;
    this.tempHP = 0;
    this.hitDie = "temp";
    this.conditions = ["temp"];
    this.deathSaves = {
      "success": 0,
      "failure": 0
    };


    this.proficiencies = ["temp"];
    this.featuresTraits = ["temp"];
    this.languages = ["temp"];
    this.stats = {
      "Strength": 0,
      "Dexterity": 0,
      "Constitution": 0,
      "Intelligence": 0,
      "Wisdom": 0,
      "Charisma": 0
    };


    this.personalityTraits = ["temp"];
    this.ideals = ["temp"];
    this.bonds = ["temp"];
    this.flaws = ["temp"];



    this.weapons = ["temp"];
    this.spells = ["temp"];

    this.coinPurse = {
      "platinum": 0,
      "gold": 0,
      "silver": 0,
      "copper": 0
    };
    this.inventory = ["temp"];

    this.attunementSlots = ["temp", "temp", "temp"];
    this.equiptGear = {
      "head": "temp",
      "necklace": "temp",
      "cloak": "temp",
      "boots": "temp",
      "armor": "temp",
      "shield": "temp",
      "hands": "temp",
      "ring": "temp",
      "focus": "temp",
      "bracers": "temp"
    };

    // non character sheet things i want to store for players
    this.notes = ["temp"];
    this.pets = ["temp"];

  }


  render() {

    // this is the magic item card set up need to change it majorlly
    return <div class="card" style={{ width: "500rem" }}>
              <div class="card-body">

                  <div>
                        <div class="card" style={{ width: "12rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Strength</h5>
                              <p class="card-text-stat">{this.stats.Strength} : {Math.floor((this.stats.Strength - 10)/2)}</p>
                            </div>
                        </div>
                        <div class="card" style={{ width: "12rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Dexterity</h5>
                              <p class="card-text-stat">{this.stats.Dexterity} : {Math.floor((this.stats.Dexterity - 10)/2)}</p>
                            </div>
                        </div>
                        <div class="card" style={{ width: "12rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Constitution</h5>
                              <p class="card-text-stat">{this.stats.Constitution} : {Math.floor((this.stats.Constitution - 10)/2)}</p>
                            </div>
                        </div>
                        <div class="card" style={{ width: "12rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Intelligence</h5>
                              <p class="card-text-stat">{this.stats.Intelligence} : {Math.floor((this.stats.Intelligence - 10)/2)}</p>
                            </div>
                        </div>
                        <div class="card" style={{ width: "12rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Wisdom</h5>
                              <p class="card-text-stat">{this.stats.Wisdom} : {Math.floor((this.stats.Wisdom - 10)/2)}</p>
                            </div>
                        </div>
                        <div class="card" style={{ width: "12rem" }}>
                            <div class="card-body">
                              <h5 class="card-title-stat">Charisma</h5>
                              <p class="card-text-stat">{this.stats.Charisma} : {Math.floor((this.stats.Charisma - 10)/2)}</p>
                            </div>
                        </div>
                  </div>

                  <p class="card-text">'hello'</p>


              </div>
           </div>;




  }
}

export default PlayerCharacter;
