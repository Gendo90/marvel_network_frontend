import React from "react";
import ScriptTag from 'react-script-tag';
import './App.css';
import SearchHeroForm from "./SearchHeroForm";
import SankeyHolder from "./sankeyHolder";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sankeyData: null };
  }

  setSankeyData = (sankeyResponse) => {
    this.setState({sankeyData: sankeyResponse}, () => console.log("Sankey data updated!"));
    console.log(this.state.sankeyData);
  }


  render() {
    return (
      <div className="App">
        <ScriptTag type="text/javascript" src="https://d3js.org/d3.v4.min.js" />
        <ScriptTag type="text/javascript" src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/sankey.js" />
        <SearchHeroForm setSankey={this.setSankeyData}/>
        <SankeyHolder sankeyData={this.state.sankeyData}/>
      </div>
    );
  }  
}

export default App;
