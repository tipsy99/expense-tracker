import axios from "axios";

const BACKEND_URL = 'https://expense-tracker-native-6be7d-default-rtdb.europe-west1.firebasedatabase.app/'

const EXPENSES_URL = BACKEND_URL + '/expenses'

export async function storeExpense(expenseData) {
  const response = await axios.post(EXPENSES_URL + '.json', expenseData)
  const id = response.data.name
  return id
}

export async function fetchExpenses() {
  const response = await axios.get(EXPENSES_URL + '.json')

  const expenses = []

  for(const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    })
  }

  return expenses
}

export function updateExpense(id, expenseData) {
  return axios.put(EXPENSES_URL + `/${id}.json`, expenseData)
}

export function deleteExpense(id) {
  return axios.delete(EXPENSES_URL + `/${id}.json`)
}