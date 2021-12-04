import React from "react";
import './App.css';

class SearchHeroBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {"name": "", "allNames": []};
    }

    async setStateUponLoading() {
        let names = await fetch("./data/names.json").then(a => a.json())
        return names;
    }

    async componentDidMount() {
        let vals = await this.setStateUponLoading();
        this.setState({allNames: vals}, () => console.log(this.state.allNames))
    }

    updateInput = (e) => {
        this.setState({"name": e.target.value}, () => console.log(this.state.name));
    }

    render() {
        return (
        <div className="SearchHeroBar">
            <input onChange={this.updateInput} list="hero"></input>
                {
                    <datalist id="hero">
                        {this.state.allNames.map(name => <option value={name}/>)}
                    </datalist>
                }
        </div>
        );
    }  
}

export default SearchHeroBar;
