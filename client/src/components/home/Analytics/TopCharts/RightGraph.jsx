// // // import React, { PureComponent } from 'react';
// // // import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // // const data = [
// // //   {
// // //     name: 'Page A',
// // //     uv: 4000,
// // //     pv: 2400,
// // //     amt: 2400,
// // //   },
// // //   {
// // //     name: 'Page B',
// // //     uv: 3000,
// // //     pv: 1398,
// // //     amt: 2210,
// // //   },
// // //   {
// // //     name: 'Page C',
// // //     uv: 2000,
// // //     pv: 9800,
// // //     amt: 2290,
// // //   },
// // // //   {
// // // //     name: 'Page D',
// // // //     uv: 2780,
// // // //     pv: 3908,
// // // //     amt: 2000,
// // // //   },
// // // //   {
// // // //     name: 'Page E',
// // // //     uv: 1890,
// // // //     pv: 4800,
// // // //     amt: 2181,
// // // //   },
// // // //   {
// // // //     name: 'Page F',
// // // //     uv: 2390,
// // // //     pv: 3800,
// // // //     amt: 2500,
// // // //   },
// // // //   {
// // // //     name: 'Page G',
// // // //     uv: 3490,
// // // //     pv: 4300,
// // // //     amt: 2100,
// // // //   },
// // // ];

// // // export default class TopRightCharts extends PureComponent {
// // //   static demoUrl = 'https://codesandbox.io/s/mixed-bar-chart-q4hgc';

// // //   render() {
// // //     return (
// // //       <ResponsiveContainer width="100%" height="100%">
// // //         <BarChart
// // //           width={500}
// // //           height={400}
// // //           data={data}
// // //           margin={{
// // //             top: 20,
// // //             right: 30,
// // //             left: 20,
// // //             bottom: 5,
// // //           }}
// // //         >
// // //           <CartesianGrid strokeDasharray="3 3" />
// // //           <XAxis dataKey="name" />
// // //           <YAxis />
// // //           <Tooltip />
// // //           <Legend />
// // //           <Bar dataKey="pv" stackId="a" fill="#8884d8" />
// // //           <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
// // //           <Bar dataKey="uv" fill="#ffc658" />
// // //         </BarChart>
// // //       </ResponsiveContainer>
// // //     );
// // //   }
// // // }
// // import React, { PureComponent } from 'react';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // const data = [];
// // for (let i = 1; i <= 30; i++) {
// //   data.push({
// //     day: `${i}`,
// //     value: Math.floor(Math.random() * 1000),
// //     income: "300"
// //   });
// // }

// // export default class TopRightCharts extends PureComponent {
// //   render() {
// //     return (
// //       <ResponsiveContainer width="100%" height={300}>
// //         <BarChart
// //           width={500}
// //           height={300}
// //           data={data}
// //           margin={{
// //             top: 20,
// //             right: 30,
// //             left: 20,
// //             bottom: 5,
// //           }}
// //         >
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="day" />
// //           <YAxis />
// //           <Tooltip />
// //           <Legend />
// //           <Bar dataKey="value" fill="#8884d8" />
// //           <Bar dataKey="income" stackId={'a'} fill="#0099bb" />
// //           <Bar dataKey="income" stackId={'a'} fill="#0099bb" />
// //           <Bar dataKey="income" stackId={'a'} fill="#0099bb" />




// //         </BarChart>
// //       </ResponsiveContainer>
// //     );
// //   }
// // }


// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export default class TopRightCharts  extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

//   render() {
//     return (
//     //   <ResponsiveContainer width="100%" height="100%">
//     //     <PieChart width={"500px"} height={"500px"}>
//     //       <Pie
//     //         data={data}
//     //         cx="50%"
//     //         cy="50%"
//     //         labelLine={false}
//     //         label={renderCustomizedLabel}
//     //         outerRadius={80}
//     //         fill="#8884d8"
//     //         dataKey="value"
//     //       >
//     //         {data.map((entry, index) => (
//     //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//     //         ))}
//     //       </Pie>
//     //     </PieChart>
//       </ResponsiveContainer>
//     );
//   }
// }
