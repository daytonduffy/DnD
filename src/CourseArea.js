import React from "react";
import "./App.css";
import Course from "./Course";

class CourseArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.handleRate = this.handleRate.bind(this);
    //this.state = {name: false}
  }
  // real parent would have this.state but as middle we need to rely on props.cart or whatever


  handleCart(course, inCart) {

    //this.setState({name: !this.state.name});

    this.props.onButtonPush(course, inCart);
  }

  handleRate(){
    this.props.onRated(true);
  }

  getCourses() {
    var courses = [];

    if (this.props.completed) { // when completed tab is looked at need to get full data information to send

      var completedCourses = this.props.allData.filter((ccourse) => { // for each course number grab the full course and put it in the new array
          if (this.props.data.includes(ccourse.number)){
            return ccourse;
          }

      });

      courses = completedCourses.map((course) => {
        return <Course key={course.name} data={course} compactMode={this.props.compactMode} onButtonPush={this.handleCart} cart={this.props.cart} completed={this.props.completed} onRated={this.handleRate}/>;
      });
    } else {
      courses = this.props.data.map((course) => {
        return <Course key={course.name} cmi={this.props.cmi} data={course} compactMode={this.props.compactMode} onButtonPush={this.handleCart} cart={this.props.cart} completed={this.props.completed} onRated={this.handleRate}/>;
      });
    }
    // 1. Declarative way of returning the courses, using .map().
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map for more details.
    //const courses = this.props.data.map((course) => {
      //return <Course key={course.name} data={course} compactMode={this.props.compactMode} onButtonPush={this.handleCart} cart={this.props.cart} completed={this.props.completed}/>;
    //});

    // 2. Imperative way of returning the courses, using for ... of iteration and .push().
    // To use this instead, uncomment the following code and comment the above code.
    // let courses = [];

    // for(const course of this.props.data) {
    //   courses.push (
    //     <Course key={course.name} data={course}/>
    //   )
    // }

    return courses;
  }

  render() {
    return <div style={{ margin: "5px" }}>{this.getCourses()}</div>;
  }
}

export default CourseArea;
