'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

// initialize variables used for processing and messages on screen
const initVariables = function () {
  $('#message').text('')
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
  const data = store.user.id // new with navbutton
  $('#message').text('')
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
  initAuthElements()
  initCreateElements()
  initVariables()
  clearBills()
}

const onNavSignOut = function (event) {
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You are not signed in')
  } else {
    onSignOut()
  }
}

const onNavChangePassword = function (event) {
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to change password')
  } else {
    initAuthElements()
    $('#change-password').show()
    $('#create-bill').hide()
    clearBills()
  }
}

// clear the View Bills list on screen
const clearBills = () => {
  event.preventDefault()
  ui.clearBills()
}

const validateCreateForm = function (createCreditor, createMonth, createAmount) { // validate all data entered in the create-bill form
  if ((createCreditor === '') || (createMonth === '') || (createAmount === '')) { // return false if all 3 data elements are not entered on screen
    return false
  } else {
    if ($.isNumeric(createAmount)) { // return 'Not Numeric' if text or invalid characters are entered in the Amount Due field
      return true
    } else {
      return 'Not Numeric'
    }
  }
}

// const setCreateForm = function () {
const setCreateForm = () => {
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to create a new bill')
  } else {
    initAuthElements()
    initCreateElements()
    initVariables()
    clearBills()
    $('#create-bill').show()
    $('#change-password').hide()
  }
}

// Create a new bill that is owned by the current user who is signed in
const onCreateBill = function (event) {
  // const data = getFormFields(this)
  const createCreditor = $('#create-bill').find('input[name="c_creditorName"]').val()
  const createMonth = $('#create-bill').find('input[name="c_dueMonth"]').val()
  const createAmount = $('#create-bill').find('input[name="c_dueAmount"]').val()
  const validData = validateCreateForm(createCreditor, createMonth, createAmount)
  if (validData === false) {
    $('#message').text('Creditor Name, Month Due and Bill Amount are all required')
  } else if (validData === 'Not Numeric') {
    $('#message').text('Amount Due is not numeric')
  } else {
    event.preventDefault()
    const newBillData = {
      'bill': {
        'creditor': createCreditor,
        'billing_month': createMonth,
        'amount_due': createAmount
      }
    }
    api.createBill(newBillData)
      .then(ui.createBillSuccess)
      .catch(ui.createBillFailure)
  }
}

const onGetBills = (event) => {
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to view your bills')
  } else {
    event.preventDefault()
    $('#change-password').hide()
    initAuthElements()
    initCreateElements()
    initVariables()
    api.getBills()
      .then(ui.getBillsSuccess)
      .catch(ui.getBillsFailure)
  }
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#createBillButton').on('click', setCreateForm) // initialize an show form
  $('#create-submit').on('click', onCreateBill) // do the actual creation of the bill
  $('#getBillsNav').on('click', onGetBills)
  $('#createBillNav').on('click', setCreateForm) // initialize an show form
  $('#nav-bar-signout').on('click', onNavSignOut)
  $('#nav-bar-chgpswd').on('click', onNavChangePassword)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateBill,
  onGetBills,
  addHandlers
}
