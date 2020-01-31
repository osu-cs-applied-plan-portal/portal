import React from "react";
import Course from "./Course";
import FilterBar from "./FilterBar";
import courses from "./CourseList";
import filters from "./FilterList";
import PropTypes from "prop-types";
import "../public/index.css";
export default class CourseContainer extends React.Component {
  static get propTypes() {
    return {
      updateCourses: PropTypes.func
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      initialCourses: [],
      courses: [],
      addCourses: [],
      filter: ""
    };

    this.loadCourses = this.loadCourses.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.newFilterSearch = this.newFilterSearch.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.addCourse = this.addCourse.bind(this);
  }

  loadCourses() {
    // const postRequest = new XMLHttpRequest();
    // const postURL = `/course/courseCode/CS290`;
    // postRequest.open("GET", postURL);
    // console.log("postURL:" + postURL);

    // this.setState({
    //   initialCourses: courses,
    //   courses: courses
    // });
  }

  filterSearch(event) {
    let courses = this.state.initialCourses;
    courses = courses.filter(c => {
      return (
        c.code.toLowerCase().includes(event.target.value.toLowerCase()) ||
                c.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    this.setState({
      courses: courses
    });
  }

  newFilterSearch() {
    const value = document.getElementById("search-container").value;
    const getURL = `/course/courseCode/${value}`;
    const getRequest = new XMLHttpRequest();
    getRequest.open("GET", getURL);

    getRequest.addEventListener("load", (event) => {
      if (event.target.status !== 200) {
        alert("Error getting course:\n" + event.target.response);
      } else {
        console.log("response: " + event.target.response);
        alert("Response:\n" + event.target.response);
        // turn the result into an object
        const obj = JSON.parse(event.target.response);
        alert("obJ: " + obj);
        // if I want to access some data from the first result...
        console.log(obj[0].credits, obj[0].courseName, obj[0].courseCode);
      }
    });

    getRequest.send();
  }

  handleFilterChange(value) {
    this.setState({
      filter: value
    });
    let courses = this.state.initialCourses;
    courses = courses.filter(c => {
      return (
        c.code.startsWith(value)
      );
    });
    this.setState({
      courses: courses
    });
  }

  addCourse(course) {
    const newCourses = this.state.addCourses;
    newCourses.unshift(course);
    this.setState({
      addCourses: newCourses
    });
    this.props.updateCourses(newCourses);
  }

  render() {
    return (
      <div className="course-container">
        <div className="top-bar">
          <div className="search-container">
            <form className="form-inline my-2 my-lg-0">
              <input id="search-container" className="form-control mr-sm-2" type="text" placeholder="Search.." name="search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.newFilterSearch}><i className="fa fa-search"></i></button>
            </form>
          </div>
          <form className="course-filter form-group">
            <FilterBar options={filters} value={this.state.filter} onValueChange={this.handleFilterChange}/>
          </form>
        </div>
        <div className="explore-courses">
          {this.state.courses.length > 0 ? this.state.courses.map(c => <Course key={c.code} code={c.code} title={c.title} credits={c.credits}
            description={c.description} prereqs={c.prereqs} addCourse={this.addCourse}/>) :
            <div>Search for courses...</div>}
        </div>
      </div>
    );
  }
}