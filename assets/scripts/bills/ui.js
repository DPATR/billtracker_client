'use strict'

const store = require('../store')

// When you set a variable to a require that instantiates handlebars, the variable becomes a function.
const showBillsTemplate = require('../templates/bill-listing.handlebars')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-up')
}

const signInSuccess = function (data) {
  $('#message').text('Signed in successfully')
  store.user = data.user
  store.signedIn = true
  $('.buttons').show()
  $('#change-password').show()
  $('#sign-out').show()
  $('#sign-in').hide()
  $('#sign-up').hide()
}

const signInFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-in')
}

const changePasswordSuccess = function (data) {
  $('#message').text('Changed password successfully')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#message').text('Error on change-password')
}

const signOutSuccess = function (data) {
  $('#message').text('Signed out successfully')
  store.user = null
  $('.buttons').hide()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#change-password').hide()
  $('#sign-out').hide()
}

const signOutFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-out')
}

const createBillSuccess = function (data) {
  $('#message').text('Created bill successfully')
  $('#create-bill').hide()
}

const createBillFailure = function (error) {
  console.error(error)
  $('#message').text('Error on create bill')
}

const getBillsSuccess = (data) => {
  // console.log('in ui.js' + ' ' + data)
  // showBillsTemplate is a function that is created by requiring handlebars
  // The function will take 1 parameter - an object array (bills)
  const showBillsHtml = showBillsTemplate({ bills: data.bills })
  $('.content').append(showBillsHtml)
}

const getBillsFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-out')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  createBillSuccess,
  createBillFailure,
  getBillsSuccess,
  getBillsFailure
}
