import React from "react";
import "./App.css";
import Section from "./Section";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.setCart = this.setCart.bind(this);
    this.setRating = this.setRating.bind(this);
    this.state = {
      rating: 0,
    };
  }


  setCart() {
    var inCart;
    if (this.props.cart != null && this.props.cart.includes(this.props.data)) { // inCart
      inCart = true;
    } else {
      inCart = false;
    }

    this.props.onButtonPush(this.props.data, inCart); // assuming you want to send up current course up
  }

  setRating(index) {
    if (this.state.rating == 0) { //before state change, on first rating
      this.props.onRated();
    }

    this.setState({rating: index});


  }



  render() {

    var inCart;
    if (this.props.cart != null && this.props.cart.includes(this.props.data)) { // inCart
      inCart = true;
    } else {
      inCart = false;
    }

    return <div>
              <p><h2>({this.props.data.number}) {this.props.data.name} | ({this.props.data.credits} Credits) {!this.props.completed && <button onClick={this.setCart} class="btn btn-primary">{inCart ? "Remove Course" : "Add Course"}</button>}</h2></p>
              <p><h4>Subject: {this.props.data.subject}</h4></p>
              <p>{this.props.data.description}</p>



              {!this.props.compactMode &&
                <div>
                {this.props.data.requisites.length > 0 ?
                  <p>Requisits: {this.props.data.requisites.map((reqs, i) =>{

                    return (i > 0 ? " AND (" + reqs.join(" OR ") + ")" : "(" + reqs.join(" OR ") + ")")

                  })}</p> :
                   <p>Requisits: None</p>}


                <p>Keywords: {this.props.data.keywords.join(", ")}</p>

                <p><h4>Sections</h4></p>

                <p>{this.props.data.sections.map((section, i) =>{

                  return <ul>
                          <li>{section.number}
                            <ul>
                             <li>Instructor: {section.instructor}</li>
                             <li>Location: {section.location}</li>
                             <li>Meeting Times:
                              <ul>
                                {section.time.monday != null && <li> Monday: {section.time.monday}</li>}
                                {section.time.tuesday != null && <li> Tuesday: {section.time.tuesday}</li>}
                                {section.time.wednesday != null && <li> Wednesday: {section.time.wednesday}</li>}
                                {section.time.thursday != null && <li> Thursday: {section.time.thursday}</li>}
                                {section.time.friday != null && <li> Friday: {section.time.friday}</li>}
                              </ul>
                             </li>
                           </ul>
                         </li>
                         {section.subsections.length > 0 && <p>
                         <h5>Subsections</h5>
                         <ul>{section.subsections.map((disco, j) =>{
                           return <li>{disco.number}
                                    <ul>
                                      <li>{disco.location}</li>
                                      <li>Meeting Times:
                                        <ul>
                                          {section.time.monday != null && <li> Monday: {section.time.monday}</li>}
                                          {section.time.tuesday != null && <li> Tuesday: {section.time.tuesday}</li>}
                                          {section.time.wednesday != null && <li> Wednesday: {section.time.wednesday}</li>}
                                          {section.time.thursday != null && <li> Thursday: {section.time.thursday}</li>}
                                          {section.time.friday != null && <li> Friday: {section.time.friday}</li>}
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                         })}</ul>
                        </p>}
                        </ul>


                })}</p>
              </div>}

              {this.props.completed &&
                <div>
                <p><b>Rating: {this.state.rating > 0 ? this.state.rating + " Stars" : "Not Rated"}</b></p>
                <p>{[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button type="button" key={index} className={index <= this.state.rating ? "on" : "off"} onClick={() => this.setRating(index)}>
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}</p>
              </div>}

              <br></br>
          </div>;
  }
}

export default Course;
