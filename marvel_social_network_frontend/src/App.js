import React from "react";
import './App.css';
import './SearchHeroBar';
import SearchHeroBar from "./SearchHeroBar";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <SearchHeroBar />
        <SearchHeroBar />
      </div>
    );
  }  
}

export default App;
