import React from "react";
// import * as d3 from "d3";
// import * from './sankey';
import './App.css';

const SankeyChart = ({data}) => {
    const svgRef = React.useRef(null);
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 1200 - margin.left - margin.right,
        height = 1600 - margin.top - margin.bottom;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    // d3.sankey = sankeyFunction.sankey;

    React.useEffect(async () => {

        const d3 = window.d3;
        // const xScale = d3.scaleTime()
        //     .domain(d3.extent(data[0].items, (d) => d.date))
        //     .range([0, width]);
        // const yScale = d3.scaleLinear()
        //     .domain([
        //         d3.min(data[0].items, (d) => d.value) - 50,
        //         d3.max(data[0].items, (d) => d.value) + 50
        //     ])
        //     .range([height, 0]);
        // Create root container where we will append all other chart elements
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
        const svg = svgEl
            .append("g")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Color scale used
        var color = d3.scaleOrdinal(d3.schemeCategory20);

        // Set the sankey diagram properties
        var sankey = d3.sankey()
            .nodeWidth(10)
            .nodePadding(30)
            .size([width, height]);
        
        
        // load the data
        const graph = data;

        // Constructs a new Sankey generator with the default settings.
        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(1);

        // add in the links
        var link = svg.append("g")
            .selectAll(".link")
            .data(graph.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", sankey.link())
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; });

        // add in the nodes
        var node = svg.append("g")
            .selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .call(d3.drag()
                .subject(function (d) { return d; })
                .on("start", function () { this.parentNode.appendChild(this); })
                .on("drag", dragmove));

        // add the rectangles for the nodes
        node
            .append("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function (d) { return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })
            // Add hover text
            .append("title")
            .text(function (d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; });

        // add in the title for the nodes
        node
            .append("text")
            .attr("x", -6)
            .attr("y", function (d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function (d) { return d.name; })
            .filter(function (d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

        // the function for moving the nodes
        function dragmove(d) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + d.x + ","
                    + (d.y = Math.max(
                        0, Math.min(height - d.dy, d3.event.y))
                    ) + ")");
            sankey.relayout();
            link.attr("d", sankey.link());
        }
    });
        
        
    //         // Add X grid lines with labels
    //     const xAxis = d3.axisBottom(xScale)
    //         .ticks(5)
    //         .tickSize(-height + margin.bottom);
    //     const xAxisGroup = svg.append("g")
    //         .attr("transform", `translate(0, ${height - margin.bottom})`)
    //         .call(xAxis);
    //     xAxisGroup.select(".domain").remove();
    //     xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    //     xAxisGroup.selectAll("text")
    //         .attr("opacity", 0.5)
    //         .attr("color", "white")
    //         .attr("font-size", "0.75rem");
    //     // Add Y grid lines with labels
    //     const yAxis = d3.axisLeft(yScale)
    //         .ticks(5)
    //         .tickSize(-width)
    //         .tickFormat((val) => `${val}%`);
    //     const yAxisGroup = svg.append("g").call(yAxis);
    //     yAxisGroup.select(".domain").remove();
    //     yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    //     yAxisGroup.selectAll("text")
    //         .attr("opacity", 0.5)
    //         .attr("color", "white")
    //         .attr("font-size", "0.75rem");
    //     // Draw the lines
    //     const line = d3.line()
    //         .x((d) => xScale(d.date))
    //         .y((d) => yScale(d.value));
    //     svg.selectAll(".line")
    //         .data(data)
    //         .enter()
    //         .append("path")
    //         .attr("fill", "none")
    //         .attr("stroke", (d) => d.color)
    //         .attr("stroke-width", 3)
    //         .attr("d", (d) => line(d.items));
    // }, [data]); // Redraw chart if data changes
    
    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};


export default SankeyChart;



    // const MultilineChart = ({ data, dimensions }) => {
    //     const svgRef = React.useRef(null);
    //     const { width, height, margin } = dimensions;
    //     const svgWidth = width + margin.left + margin.right;
    //     const svgHeight = height + margin.top + margin.bottom;

    //     React.useEffect(() => {
    //         const xScale = d3.scaleTime()
    //             .domain(d3.extent(data[0].items, (d) => d.date))
    //             .range([0, width]);
    //         const yScale = d3.scaleLinear()
    //             .domain([
    //                 d3.min(data[0].items, (d) => d.value) - 50,
    //                 d3.max(data[0].items, (d) => d.value) + 50
    //             ])
    //             .range([height, 0]);
    //         // Create root container where we will append all other chart elements
    //         const svgEl = d3.select(svgRef.current);
    //         svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    //         const svg = svgEl
    //             .append("g")
    //             .attr("transform", `translate(${margin.left},${margin.top})`);
    //         // Add X grid lines with labels
    //         const xAxis = d3.axisBottom(xScale)
    //             .ticks(5)
    //             .tickSize(-height + margin.bottom);
    //         const xAxisGroup = svg.append("g")
    //             .attr("transform", `translate(0, ${height - margin.bottom})`)
    //             .call(xAxis);
    //         xAxisGroup.select(".domain").remove();
    //         xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    //         xAxisGroup.selectAll("text")
    //             .attr("opacity", 0.5)
    //             .attr("color", "white")
    //             .attr("font-size", "0.75rem");
    //         // Add Y grid lines with labels
    //         const yAxis = d3.axisLeft(yScale)
    //             .ticks(5)
    //             .tickSize(-width)
    //             .tickFormat((val) => `${val}%`);
    //         const yAxisGroup = svg.append("g").call(yAxis);
    //         yAxisGroup.select(".domain").remove();
    //         yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    //         yAxisGroup.selectAll("text")
    //             .attr("opacity", 0.5)
    //             .attr("color", "white")
    //             .attr("font-size", "0.75rem");
    //         // Draw the lines
    //         const line = d3.line()
    //             .x((d) => xScale(d.date))
    //             .y((d) => yScale(d.value));
    //         svg.selectAll(".line")
    //             .data(data)
    //             .enter()
    //             .append("path")
    //             .attr("fill", "none")
    //             .attr("stroke", (d) => d.color)
    //             .attr("stroke-width", 3)
    //             .attr("d", (d) => line(d.items));
    //     }, [data]); // Redraw chart if data changes

    //     return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
    // };
