import React from "react";
// import axios from "axios";
import './App.css';
import SearchHeroBar from "./SearchHeroBar";

class SearchHeroForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {fromHero: "", toHero: ""};
    }

    updateFromHero = (e) => {        
        this.setState({ fromHero: e.target.value }, () => console.log("From hero is now: " + this.state.fromHero));
    }

    updateToHero = (e) => {
        this.setState({ toHero: e.target.value }, () => console.log("To hero is now: " + this.state.toHero));
    }

    getRelationship = async (e) => {
        console.log("Perform axios call with fromHero and toHero - then get sankey data from backend!");
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <SearchHeroBar setHero={this.updateFromHero} />
                <SearchHeroBar setHero={this.updateToHero} />
                <button onClick={this.getRelationship}>Submit</button>
            </div>        
        );
    }  
}

export default SearchHeroForm;
