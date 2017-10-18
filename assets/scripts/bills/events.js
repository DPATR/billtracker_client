'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

const initVariables = function () {
  $('#gamemessage').text('')
  // symbol = ''
  // counter = 0
  // drawCounter = 0
  // cellValue = ''
  // haveAWinner = false
  // gameOver = false
  // index = 0
  // gameStarted = false
  // gameArray = ['', '', '', '', '', '', '', '', '']
  // $('.cell').text('')
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
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
  initVariables()
  document.getElementById('emailSignin').value = ''
  document.getElementById('passwordSignin').value = ''
  document.getElementById('emailSignup').value = ''
  document.getElementById('passwordSignup').value = ''
  document.getElementById('confirmSignup').value = ''
  document.getElementById('oldPswdChange').value = ''
  document.getElementById('newPswdChange').value = ''
  // Add fields for onCreateBill to initialize them to null values on Sign Out
}

const onCreateBill = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.createBill(data)
    .then(ui.createBillSuccess)
    .catch(ui.createBillFailure)
}

const onGetBills = (event) => {
  event.preventDefault()
  $('#message').text('')
  api.getBills()
    .then(ui.getBillsSuccess)
    .then(function () {
      $('.payBill').on('click', onDeleteBill)
    })
    .catch(ui.getBillsFailure)
}

const onDeleteBill = function (event) {
  $(this).parent().parent().hide()
  api.deleteBill(event) // not sure if I need event here but need to point row in array
    .then(ui.deleteBillSuccess)
    .catch(ui.deleteBillFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#createBillButton').on('click', onCreateBill)
  $('#getBillsButton').on('click', onGetBills)
  // $('.cell').on('click', onClickBoard)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateBill,
  onDeleteBill,
  onGetBills,
  addHandlers
}
