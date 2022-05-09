import { View, StyleSheet } from 'react-native'
import { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../context/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

export default function ManageExpense({ navigation, route }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense'
    })
  }, [isEditing, navigation])

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
    } catch(err) {
      setError('Could not delete expense')
    }
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)
    if(isEditing) {
      try {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
        navigation.goBack()
      } catch(err) {
        setError('Could not update expense')
        setIsSubmitting(false)
      }
    } else {
      try {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({...expenseData, id})
        navigation.goBack()
      } catch(err) {
        setError('Could not add expense')
        setIsSubmitting(false)
      }
    }
  }

  if(isSubmitting) {
    return (
      <LoadingOverlay />
    )
  }

  if(error && !isSubmitting) {
    return <ErrorOverlay message={error}/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onCancel={cancelHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'} onSubmit={confirmHandler} defaultValues={selectedExpense}/>
      {isEditing && 
        <View style={styles.deleteContainer}>
          <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  }
})