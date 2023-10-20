import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [];
for (let i = 1; i <= 30; i++) {
  data.push({
    day: `D- ${i}`,
    income: Math.floor(Math.random() * 10000), // Replace with your own data or logic
    apple: Math.floor(Math.random() * 5000),
    banana: Math.floor(Math.random() * 7000),
    mango: Math.floor(Math.random() * 7000),
  });
}

export default class BarChartMiddle extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={900} // Adjust the width to fit all 30 days
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />


          <Bar dataKey="income" fill="green" />

          <Bar dataKey="apple" stackId="b"  fill="red" />
          <Bar dataKey="mango" stackId="b" fill="#F99417" />
          <Bar dataKey="banana" stackId="b" fill="#940B92" />


        </BarChart>
      </ResponsiveContainer>
    );
  }
}
