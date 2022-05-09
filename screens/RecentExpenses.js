import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../context/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

export default function RecentExpenses() {

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)


  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch(err) {
        setError('Could not fetch expenses')
      }
      setIsFetching(false)
    }

    getExpenses()
  }, [])

  function errorHandler() {
    setError(null)
  }

  if(isFetching) {
    return (
      <LoadingOverlay />
    )
  }

  if(error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }


  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date()
    const date90DaysAgo = getDateMinusDays(today, 90)
    return expense.date >= date90DaysAgo && expense.date <= today
  })

  return (
    <ExpensesOutput expensesPeriod="Last 90 days" expenses={recentExpenses} fallbackText='No expenses registered'/>
  )
}