import { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Input from './Input'
import Button from '../UI/Button'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues }) {

  // const [amountValue, setAmountValue] = useState('')
  const [inputs, setInputs] = useState({
    amount: { 
      value: defaultValues ? defaultValues.amount.toString() : '', 
      isValid: true 
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    }
  })

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curr) => {
      return {
        ...curr,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }
    })
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values')
      setInputs(curr => {
        return {
          amount: {
            value: curr.amount.value,
            isValid: amountIsValid
          },
          date: {
            value: curr.date.value,
            isValid: dateIsValid
          },
          description: {
            value: curr.description.value,
            isValid: descriptionIsValid
          }
        }
      })
      return;
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          label='Amount' 
          inputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
        />
        <Input 
          label='Date' 
          inputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
          invalid={!inputs.date.isValid}

          style={styles.rowInput}
        />
      </View>
      <Input 
        label='Description' 
        inputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
        invalid={!inputs.description.isValid}
      />
      { formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text> }
       <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
        <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16, 
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: 'bold'
  }
})