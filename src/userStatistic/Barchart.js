import "./styles.css";
import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "2021-12-03",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "2021-12-04",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "2021-12-05",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "2021-12-06",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "2021-12-07",
    uv: 1890,
    pv: 4800,
    amt: 2181
  }
];

export default class Barchart extends Component {
  /*
const fooddata=this.props.foodlist;
*/

render() {
  return (
    <BarChart
      width={300}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  )}
}
