import { select } from "d3-selection";
import { scaleTime, scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
import { min, max } from "d3-array";
import { avgTemp } from "./tempGraph.data";
import { schemeCategory10 } from "d3-scale-chromatic";
import { axisBottom, axisLeft } from 'd3-axis';

const d3 = {
  select,
  scaleTime,
  scaleLinear,
  min,
  max,
  avgTemp,
  scaleOrdinal,
  schemeCategory10,
  axisBottom,
  axisLeft,
  scaleBand,
};

// Constants. SVG Coordinate.
const width = 500;
const height = 300;
const padding = 50;

const card = d3
  .select("#root")
  .append("div")
  .attr("class", "card");

const svg = card
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", `${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`);

const scaleYPos = d3.scaleLinear()
  .domain([min(avgTemp)-5, max(avgTemp)+5])
  .range([height, 0]);

// In Domain (bars) we don't have continuous values, we have to identify the bands, like in ordinal scale
// we could return [0,1,2,3...20], we will do that wiht a map
const scaleXPos = d3.scaleTime()
  .domain([new Date(2018, -1),new Date(2018, 11)])
  .range([0, width]) // use RangeRound to get pixel perfect layout 


const barGroup = svg.append('g');

barGroup
  .selectAll('rect')
  .data(avgTemp)
  .enter()
  .append("rect")
  .attr("x", (d, i) => (i*width/12)+25)
  .attr("y", d => scaleYPos(d))
  .attr("width", 35)
  .attr("height", d => height - scaleYPos(d))
  .attr("fill", "url(#barGradient)");


const axisGroup = svg.append("g")

//Y axis
axisGroup.append("g")
  .call(d3.axisLeft(scaleYPos));

//X axis
axisGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(scaleXPos))
  .style("font", "italic bold 8px arial,serif")


const gradient = svg
.append("defs")
  .append("linearGradient")
    .attr("id", "barGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", "0")
    .attr("y1", height)
    .attr("x2", "0")
    .attr("y2", "0");
gradient
.append("stop")
  .attr("offset", "0")
  .attr("stop-color", "#E38F16");
gradient
.append("stop")
  .attr("offset", "15%")
  .attr("stop-color", "#DA7424");
gradient
.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#930101");

