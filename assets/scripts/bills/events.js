'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

// initialize variables used for processing and messages on screen
const initVariables = function () {
  $('#message').text('')
  $('#billtracker_message').text('') // may not need to use this haven't yet!
  return true
}

// initialize Authentication text input elements
const initAuthElements = function () {
  document.getElementById('emailSignin').value = ''
  document.getElementById('passwordSignin').value = ''
  document.getElementById('emailSignup').value = ''
  document.getElementById('passwordSignup').value = ''
  document.getElementById('confirmSignup').value = ''
  document.getElementById('oldPswdChange').value = ''
  document.getElementById('newPswdChange').value = ''
  return true
}

// initialize Create Bill text input elements
const initCreateElements = function () {
  document.getElementById('c_billCreditor').value = ''
  document.getElementById('c_billMonth').value = ''
  document.getElementById('c_billAmount').value = ''
  return true
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

let signedIn = false

const onSignIn = function (event) {
  const data = getFormFields(this)
  console.log('in events.js')
  // console.log(this)
  event.preventDefault()
  $('#message').text('')
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to change password')
  } else {
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
  initAuthElements()
  initCreateElements()
  // initUpdateElements()
  initVariables()
  clearBills()
}

// clear the View Bills list on screen
// const clearBills = function () {
const clearBills = () => {
  event.preventDefault()
  ui.clearBills()
}

// const setCreateForm = function () {
const setCreateForm = () => {
  console.log('In setCreateForm')
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to create a new bill')
  } else {
    initAuthElements()
    initCreateElements()
    initVariables()
    clearBills()
    $('#create-bill').show()
  }
}

// Create a new bill that is owned by the current user who is signed in
const onCreateBill = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('in events.js')
  const newBillData = {
    'bill': {
      'creditor': data.c_creditorName,
      'billing_month': data.c_dueMonth,
      'amount_due': data.c_dueAmount
    }
  }
  console.log(newBillData)
  api.createBill(newBillData)
    .then(ui.createBillSuccess)
    .catch(ui.createBillFailure)
}

const onGetBills = (event) => {
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to view your bills')
  } else {
    event.preventDefault()
    initAuthElements()
    initCreateElements()
    initVariables()
    api.getBills()
      .then(ui.getBillsSuccess)
      .catch(ui.getBillsFailure)
  }
}

// const onNavSign = (event) => {
//   $('#sign-in').modal('show')
// }

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#createBillButton').on('click', setCreateForm) // initialize an show form
  // Try these 2 buttons
  $('#getBillsButton').on('click', onGetBills)
  $('#create-bill').on('submit', onCreateBill) // do the actual creation of the bill
  // $('#nav-bar-signin').on('click', onNavSign)
  $('#getBillsNav').on('click', onGetBills)
  $('#createBillNav').on('click', setCreateForm) // initialize an show form
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateBill,
  onGetBills,
  // onNavSign,
  addHandlers
}
