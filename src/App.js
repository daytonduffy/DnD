import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";

import MagicItemArea from "./MagicItemArea";
import PlayerCharacter from "./PlayerCharacter";
import PlayerCharacterOptions from "./PlayerCharacterOptions";

import myDataCMI from './dmg/Magic_Items/Common_Magic_Items.json';
import myDataUCMI from './dmg/Magic_Items/Uncommon_Magic_Items.json';
import myDataRMI from './dmg/Magic_Items/Rare_Magic_Items.json';
import myDataVRMI from './dmg/Magic_Items/Very_Rare_Magic_Items.json';

// will this get everyone?
import players from "./dmg/Characters/Test.json";
//import myData from './test.json';

/**
 * The main application component.
 *
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    //this.cart = new Cart();
    this.setCart = this.setCart.bind(this);
    this.classRated = this.classRated.bind(this);


    this.player1 = new PlayerCharacter();

    console.log(players)

    // not quite right yet dont know how to set up {} vars
    this.speed = {
      "Walking": 30,
      "Swimming": 0,
      "Climbing": 0,
      "Flying": 0,
      "Jumping": 0
    };
    this.dSaves = {
      "success": 0,
      "failure": 0
    };
    this.statObj = {
      "Strength": 10,
      "Dexterity": 12,
      "Constitution": 12,
      "Intelligence": 18,
      "Wisdom": 7,
      "Charisma": 16
    };
    this.cPurse = {
      "platinum": 20,
      "gold": 387,
      "silver": 12,
      "copper": 42
    };
    this.gear = {
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

    //this.player2 = new PlayerCharacterOptions(props, "L", "5", "Paladin", "Criminal", "Loxodon", "Chaotic Good", "For Losers", "Insparation", "prof", "ac", "init", this.speed, "HP", "tempHP", ["hitDie"], "condition", this.dSaves, ["proficiencies"], ["featuresTraits"], "languages", this.statObj, ["personalityTraits"], ["ideals"], ["bonds"], ["flaws"], ["weapons"], "spells", this.cPurse, ["inventory"], ["apple", "attunementSlots", "aly"], this.gear);


    // holy fucking shit that was simple
    this.commonMagicItems = myDataCMI;
    this.uncommonMagicItems = myDataUCMI;
    this.rareMagicItems = myDataRMI;
    this.veryRareMagicItems = myDataVRMI;


    this.state = {
      allCourses: [], // All the courses fetched from the server.
      filteredCourses: [], // The courses to be displayed in the CourseArea under Search tab.
      subjects: [], // The list of unique subjects fetched from the server.
      completedCourses: [], // The list of *course numbers* of completed courses.

      cartCourses: [], // essentialy want it to follow the filtered courses route, but start as an empty array you add to not an array to filter things out of

      ratedCourses: 0,
      languages: ["Common", "Elvish"]

    };

    this.hangeLangChange = this.hangeLangChange.bind(this)
  }

  hangeLangChange(langs) {

    this.setState({
      languages: langs
    })
  }

  /**
   * When the component mounts, fetch the classes data from the server.
   * Save the data in the state.
   *
   */
  componentDidMount() {
    // Fetch all the courses from the server
    fetch("https://cs571.cs.wisc.edu/api/react/classes")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        });
      })
      .catch((err) => console.log(err));

    // Fetch the completed courses from the server.
    fetch("https://cs571.cs.wisc.edu/api/react/students/5022025924/classes/completed")
      .then((res) => res.json())
      .then((data) => {
        // Notice that completed courses are returned
        // as a list of course numbers, not course objects.
        this.setState({
          completedCourses: data.data,
        });
      })
      .catch((err) => console.log(err));


      //let items = commonMagicItems();
      //for(let i = 0; i < items.length; ++i){
      //  this.commonMagicItems.push(items[i]);
      //}

  }

  getSubjects(data) {
    // Get all the subjects from the JSON of fetched courses.
    // Return a list of unique subjects.

    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    // This is a callback function for the filteredCourses state.
    // Set the courses to be displayed in the CourseArea under Search tab.
    // Refer to the Sidebar component (Sidebar.js) to understand when this is used.

    this.setState({ filteredCourses: courses });
  }

  setCart(course, inCart) {


    var temp = this.state.cartCourses;

    if (inCart) { // course is in cart remove from state
      //var temp = this.state.cartCourses;
      var dex = temp.indexOf(course)

      temp.splice(dex, 1)

    } else { // course is NOT IN cart add to state
      temp.push(course)
    }

    this.setState({cartCourses: temp});
  }

  classRated(test){
    if (test) {
      this.setState({ratedCourses: this.state.ratedCourses + 1})
    }
  }


  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          {/* Search Tab */}
          <Tab eventKey="search" title="Search" style={{ paddingTop: "5vh" }}>
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />



            <div style={{ marginLeft: "20vw" }}>
              <PlayerCharacterOptions
                name = "L"
                level = "10"
                playerclass = "Paladin"
                background = "criminal"
                race = "loxodon"
                alignment = "good"
                experiencepoints = "losers"
                insparation = {1}
                proficiency = {3}
                ac = {18}
                initiative = {3}
                speed = {this.speed}
                hp = {88}
                temphp = {0}
                hitdie = {["7d10", "1d8"]}
                conditions = {["Grappled", "Exhaustion, Level 2"]}
                deathsaves = {this.dSaves}
                proficiencies = {["Strength", "Charisma", "Arcana", "Medicine", "Nature"]}
                featurestraits = {["feature treats"]}
                languages = {this.state.languages} // i need to pass it up her to
                stats = {this.statObj}
                personalitytraits = {['person traits', 'animal guy']}
                ideals = {["ideals", "more ideals"]}
                bonds = {["bonds"]}
                flaws = {["flaws"]}
                weapons = {["weapon"]}
                spells = {["spells"]}
                coinpurse = {this.cPurse}
                inventory = {["inventop"]}
                attunementslots = {["apple", "cade", "pepe"]}
                equiptgear = {this.gear}

                hangeLangChange = {this.hangeLangChange}
              />



              <MagicItemArea
                commonMagicItems={this.commonMagicItems}
                uncommonMagicItems={this.uncommonMagicItems}
                rareMagicItems={this.rareMagicItems}
                veryRareMagicItems={this.veryRareMagicItems}
              />
            </div>
          </Tab>

          <Tab eventKey="playerSheet" title="PlayerSheet" style={{ paddingTop: "5vh" }}>
              <div style={{ marginLeft: "20vw" }}>
                <PlayerCharacterOptions
                  name = "L"
                  level = "10"
                  playerclass = "Paladin"
                  background = "criminal"
                  race = "loxodon"
                  alignment = "good"
                  experiencepoints = "losers"
                  insparation = {1}
                  proficiency = {3}
                  ac = {18}
                  initiative = {3}
                  speed = {this.speed}
                  hp = {88}
                  temphp = {0}
                  hitdie = {["7d10", "1d8"]}
                  conditions = {["Grappled", "Exhaustion, Level 2"]}
                  deathsaves = {this.dSaves}
                  proficiencies = {["Strength", "Charisma", "Arcana", "Medicine", "Nature"]}
                  featurestraits = {["feature treats"]}
                  languages = {this.state.languages} // i need to pass it up her to
                  stats = {this.statObj}
                  personalitytraits = {['person traits', 'animal guy']}
                  ideals = {["ideals", "more ideals"]}
                  bonds = {["bonds"]}
                  flaws = {["flaws"]}
                  weapons = {["weapon"]}
                  spells = {["spells"]}
                  coinpurse = {this.cPurse}
                  inventory = {["inventop"]}
                  attunementslots = {["apple", "cade", "pepe"]}
                  equiptgear = {this.gear}

                  hangeLangChange = {this.hangeLangChange}
                />
              </div>
          </Tab>

          {/* Completed Courses Tab */}
          <Tab eventKey="completedCourses" title={"Completed Courses (" + (this.state.completedCourses.length - this.state.ratedCourses) +" Need Rating)"} style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              {/* Put your component for the completed courses feature here. */}
              {/* Or, can you think of a way to reuse the CourseArea component? */}
              <CourseArea
                data={this.state.completedCourses}
                allData={this.state.allCourses}
                compactMode={true} // Optionally, you could use this prop in the future for Cart and Completed Courses?

                onButtonPush={this.setCart}
                cart={this.state.cartCourses}

                completed={true}
                onRated={this.classRated}
              />
            </div>
          </Tab>

        </Tabs>
      </div>
    );
  }
}

export default App;
