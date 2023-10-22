import React from "react";
import Chart from "react-apexcharts";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        series: [40, 30, 15, 15],
        labels: ["Apple", "Mango", "Lemon", "Banana"],
        style: {
            colors: ['red', 'green', 'blue', 'yellow']
          }
        }
      }
  }
  render() {
    return (
      <div id="pieChart">
        <Chart
          options={this.state.options}
          series={this.state.options.series}
          type="pie"
          width="100%"
          height="400px"
        />
      </div>
    );
  }
}