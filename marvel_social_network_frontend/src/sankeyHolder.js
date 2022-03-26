import React from "react";
import ScriptTag from 'react-script-tag';
import SankeyChart from "./SankeyChart";
import './App.css';

class SankeyHolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {sankey: this.props.sankeyData};
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.sankeyData !== this.state.sankey) {
            this.setState({ sankey: this.props.sankeyData })
        }
    }

    render() {
        return (
        <div className="SankeyHolder">
                <ScriptTag type="text/javascript" src="https://d3js.org/d3.v4.min.js" />
                <ScriptTag type="text/javascript" src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/sankey.js" />
                {this.state.sankey === null ? <p>No Sankey Yet!</p> : <SankeyChart data={this.state.sankey} /> }         
        </div>
        );
    }  
}

export default SankeyHolder;
