import React, { useState } from "react";
import "./App.css";
import Section from "./Section";
import { createElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import allLanguages from './dmg/Information/Languages.json';

class Languages extends React.Component {

  constructor(props) {
    super(props);

    this.languagePack = allLanguages;

    this.editedLangList = this.props.languages;

    this.state = {
      languages: this.props.languages,
      show: false,
      temp: 0
    };


    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.langPopup = this.langPopup.bind(this);
    this.langButtonClick = this.langButtonClick.bind(this);
  }

  handleClose() {
    this.state.show = false;
    this.props.changeStateTest()
  }

  handleShow() {

    this.state.show = true;
    this.props.changeStateTest()
  }

  // switch class and make list for new state/lang list if save is clicked
  langButtonClick(language) {

      var button = document.getElementById("lang" + language)

      // the original set langauges cannot be deselected for some reason
      // on the constructor going again they get reset?

      // the or was the answer not anything more upstream
      if (button.class === "btn btn-dark" || this.editedLangList.indexOf(language) > -1) { // being DE-selected
          var index = this.editedLangList.indexOf(language)

          // need something cleaner than delete but thats working
          delete this.editedLangList[index]

          button.class = "btn btn-outline-dark"
      } else { // being selected


          this.editedLangList.push(language)

          button.class = "btn btn-dark"
      }


      this.props.changeStateLang(this.editedLangList)

  }

  langPopup() {

    var langNames = []

    this.languagePack.forEach((item, i) => {

      if (this.state.languages.indexOf(item.language) >= 0) {
        langNames.push(<button type="button" id={"lang" + item.language} class="btn btn-dark" onClick={() => this.langButtonClick(item.language)}>{item.language}</button>)
      } else {
        langNames.push(<button type="button" id={"lang" + item.language} class="btn btn-outline-dark" onClick={() => this.langButtonClick(item.language)}>{item.language}</button>)
      }


    });


    return <div style={{display: "flex", flexDirection: "row", alignItems: "left", gap: "10px"}}>

               <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                  {langNames[0]}
                  {langNames[1]}
                  {langNames[2]}
                  {langNames[3]}
                  {langNames[4]}
                  {langNames[5]}
                  {langNames[6]}
                  {langNames[7]}
                  {langNames[8]}
                  {langNames[9]}
                  {langNames[10]}
               </div>

               <div style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                 {langNames[11]}
                 {langNames[12]}
                 {langNames[13]}
                 {langNames[14]}
                 {langNames[15]}
                 {langNames[16]}
                 {langNames[17]}
                 {langNames[18]}
                 {langNames[19]}
                 {langNames[20]}
                 {langNames[21]}
               </div>


           </div>
  }

  // pop up that has list of languages known, then a button for each other language to select to add it to the list
  // need the

  // maybe the answer is one big list of all languages with the buttons - known are pre selected

  render() {

    return <div class="card" style={{ width: "33rem" }}>
              <div class="card-body">
                <h5 class="card-title-stat">Known Languages</h5>

                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "left"}}>
                        {this.state.languages.map(function(trait){
                          return (<p>{trait}, &nbsp;</p>)
                        })}
                    </div>

                    <button type="button" id="editLang" class="btn btn-dark" onClick={this.handleShow}>Edit</button>

                    <Modal
                      show={this.state.show}
                      onHide={this.handleClose}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Languages</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          {this.langPopup()}

                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                </div>

              </div>
            </div>



  }
}

export default Languages;
