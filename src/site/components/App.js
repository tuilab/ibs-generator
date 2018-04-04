// @flow
import React, { Component } from "react"
import SheetClip from "sheetclip"
import "./App.css"

class App extends Component<{}> {
  render() {
    return (
      <div className="App">
        <h2>Hello IBS</h2>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onPaste={(event) => {
            console.log(
              new SheetClip().parse(event.clipboardData.getData("text/plain")),
            )
          }}
        />
      </div>
    )
  }
}

export default App
