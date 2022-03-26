import React from "react";
import './App.css';
import SearchHeroForm from "./SearchHeroForm";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sankeyData: {} };
  }

  setSankeyData = (sankeyResponse) => {
    this.setState({sankeyData: sankeyResponse}, () => console.log("Sankey data updated!"));
    console.log(this.state.sankeyData);
  }


  render() {
    return (
      <div className="App">
        <SearchHeroForm setSankey={this.setSankeyData}/>
      </div>
    );
  }  
}

export default App;
