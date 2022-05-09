import { createSlice } from "@reduxjs/toolkit";


const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    data: [
      {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
      },
      {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 43.99,
        date: new Date('2022-01-05')
      },
      {
        id: 'e3',
        description: 'Cigarettes',
        amount: 10.99,
        date: new Date('2022-03-15')
      },
      {
        id: 'e4',
        description: 'Some bananas',
        amount: 9.99,
        date: new Date('2022-02-11')
      },
      {
        id: 'e5',
        description: 'Some books',
        amount: 33.99,
        date: new Date('2021-12-11')
      },
    ]
  },
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString + Math.random().toString
      state.data.push({...action.payload, id: id})
    },
    deleteExpense: (state, action) => {
      let deleteableId = state.data.indexOf(item => item.id === action.payload)
      state.data.splice(deleteableId, 1)
    },
    updateExpense: (state, action) => {
      let updateableExpenseIndex = state.data.findIndex((item) => item.id === action.payload.id)
      const updateableExpense = state.data[updateableExpenseIndex]
      const updatedItem = { ...updateableExpense, ...action.payload.data }
      state.data[updateableExpenseIndex] = updatedItem
    }
  }
})

export const addExpense = expensesSlice.actions.addExpense
export const deleteExpense = expensesSlice.actions.deleteExpense
export const updateExpense = expensesSlice.actions.updateExpense

export default expensesSlice.reducer