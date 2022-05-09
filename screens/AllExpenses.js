import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../context/expenses-context'


export default function AllExpenses() {

  const expensesCtx = useContext(ExpensesContext)

  return (
    <ExpensesOutput expensesPeriod='Total' expenses={expensesCtx.expenses} fallbackText='No expenses registered'/>
  )
}

