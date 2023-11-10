import React, { PureComponent, useContext } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { AllContext } from '../../../../states/ContextProvider'


export default function BarChartMiddle () {
  const { allTransactions } = useContext(AllContext)

  const data = []

  // FILTER THROUGH ALL EXPENSES!
  const incomes = allTransactions?.filter(item => item?.source)

  // FILTER THROUGH ALL EXPENSES!
  const expenses = allTransactions?.filter(item => item?.description)

  // GET THE DATA!
  const getExpensesData = () => {
    for (let i = 1; i <= 30; i++) {
      const incomeDay = incomes?.filter(item => item?.day === i)
      const expenseDay = expenses?.filter(item => item?.day === i)

      const totalIncomesEachDay = incomeDay?.reduce(
        (acc, curr) => acc + curr?.money,
        0
      )
      const totalExpensesEachDay = expenseDay?.reduce(
        (acc, curr) => acc + curr?.money,
        0
      )
      data.push({
        day: `D- ${i}`,
        income: totalIncomesEachDay,
        expense: totalExpensesEachDay
      })
    }
  }

  if (incomes?.length > 0 || expenses?.length > 0) {
    getExpensesData()
  }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        width={900} // Adjust the width to fit all 30 days
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey='income' fill='green' />

        <Bar dataKey='expense' stackId='b' fill='red' />
      </BarChart>
    </ResponsiveContainer>
  )
}
