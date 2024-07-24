import React from "react";
import "./App.css";
import Course from "./Course";
import Item from "./Item";
import PlayerCharacter from "./PlayerCharacter";

class MagicItemArea extends React.Component {
  constructor(props) {
    super(props);
  }
  // real parent would have this.state but as middle we need to rely on props.cart or whatever




  getCourses() {
    var courses = [];
    var courses2 = [];
    var courses3 = [];
    var courses4 = [];

    var effects = [];
    var types = [];

    var num = 0;

    courses = this.props.commonMagicItems.map((item) => {
      num = num + 1;


      if (typeof item.effect == undefined){
        console.log('undefined effect')
        console.log(item.effect)
        console.log('')
      } else if (typeof item.effect == 'string') { // bad but usable, single effect
        if (effects.indexOf(item.effect) == -1){
          effects.push(item.effect)
        }

        if (types.indexOf(item.type) == -1){
          types.push(item.type)
        }
      } else if (typeof item.effect == 'object') { // standard array of effects

        

        if (types.indexOf(item.type) == -1){
          types.push(item.type)
        }


        item.effect.map((effect) => {
          if (effects.indexOf(effect) == -1){
            effects.push(effect)
          }
        })

      }

      return <Item item={item}/>;
    })
    // courses2 = this.props.uncommonMagicItems.map((item) => {
    //   courses.push(<Item item={item}/>);
    // })
    // courses3 = this.props.rareMagicItems.map((item) => {
    //   courses.push(<Item item={item}/>);
    // })
    // courses4 = this.props.veryRareMagicItems.map((item) => {
    //   courses.push(<Item item={item}/>);
    // })

    return courses;
  }


  // when the section is rendered it calls getCourses with the props its been sent thats how it gets tthe proper information
  render() {
    return <div style={{ margin: "5px" }}>{this.getCourses()}</div>;
  }
}

export default MagicItemArea;
