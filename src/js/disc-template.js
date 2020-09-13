import { scaleLinear } from "d3-scale";
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { max, extent } from "d3-array";
import { forceSimulation, forceCollide, forceX, forceY} from "d3-force";

export default class makeDiscChart {

  constructor(opts) {
    Object.assign(this, opts);
    this.appendElements();
    this.update();
  }

  update() {
    this._setDimensions();
    this._setScales();
    this.render();
  }

  _setDimensions() {
    this.margin = {
      top: 30,
      right: 30,
      bottom: 50,
      left: 40,
    };
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  _setScales() {
    // this.xScale = scaleLinear()
    //   .rangeRound([0, this.width])
    //   .domain([0, 100]);

    this.yScale = scaleLinear()
      .rangeRound([this.height, 0])
      .domain(extent(this.data, d=> d.distance));

    var _this = this // To deal with "this" scoping
    this.simulation = forceSimulation(this.data)
      .force("x", forceX(this.width / 2))
      .force("y", forceY(d=> _this.yScale(d.distance)).strength(3))
      .force("collide", forceCollide().radius(30))
      .stop();

    for (var i = 0; i < 120; ++i) this.simulation.tick();
  }

  appendElements() {
    this.svg = select(this.element).append("svg");

    this.plot = this.svg.append("g").attr("class", "chart-g");

    // this.xAxis = this.plot.append("g").classed("axis x-axis", true);
    this.yAxis = this.plot.append("g").classed("axis y-axis", true);

    this.discs = this.plot.selectAll(".disc")
      .data(this.data)
      .enter()
      .append("image")
      .attr("class", d=> `${d.id} disc`)
  }

  render() {
    this.svg.attr("width", this.width + this.margin.left + this.margin.right);
    this.svg.attr("height", this.height + this.margin.top + this.margin.bottom);

    this.plot.attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    // this.xAxis
    //   .attr("transform", "translate(0," + (this.height + 20) + ")")
    //   .call(
    //     axisBottom(this.xScale)
    //     .tickSize(-this.height - 20)
    //   );

    this.yAxis
      .attr("transform", `translate(-20,0)`)
      .call(
        axisLeft(this.yScale)
        .tickSize(-this.width - 20)
      );

    this.discs
      .attr("href", d=> `./img/${d.id}.png`)
      .attr("x", d=> d.x)
      .attr("y", d=> d.y)
      .attr("height", "50px")
      .attr("width", "50px")
  }

}
