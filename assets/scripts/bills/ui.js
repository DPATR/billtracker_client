'use strict'

const store = require('../store')
const api = require('./api.js')

// const getFormFields = require(`../../../lib/get-form-fields`)

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
  // console.log('in ui.js')
  store.signedInID = data.user.id
  // console.log('data.user.email = ' + data.user.id)
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
  $('#create-bill').hide()
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

const deleteBillSuccess = function (data) {
  $('#message').text('Deleted bill successfully')
}

const deleteBillFailure = function (error) {
  console.error(error)
  $('#message').text('Error on delete bill')
}

// const userID = store.signedInID

const filterBillsByUser = (oldArray) => {
  // console.log('In function')
  const userID = store.signedInID
  // console.log(oldArray)
  // console.log(oldArray.user_id)
  return oldArray.user_id === userID
  // return oldArray.user_id < 10
}

const getBillsSuccess = (data) => {
  console.log('Get Bills Success!')
  // console.log(data)
  // ** need userID below to be able to filter the data for user-id before displaying on screen
  // ** pass userID to the handlebar and use in each logic to filter on only that userid
  // console.log('in ui.js')
  // ** Need to filter the object array before I send it to showBillsTemplate function?
  const currentBills = { bills: data.bills }
  const currentBillsArray = currentBills.bills
  console.log(currentBills)
  // console.log(currentBills.bills)
  const newArray = currentBillsArray.filter(filterBillsByUser)
  for (let i = 0; i < newArray.length; i++) {
    console.log(newArray[i])
  }
  // showBillsTemplate is a function that is created by requiring handlebars
  // The function will take 1 parameter - an object array (bills)
  // const showBillsHtml = showBillsTemplate({ bills: data.bills })
  const showBillsHtml = showBillsTemplate({ bills: newArray })
  // $('.content').append(showBillsHtml) // using append will result in duplicate entries in view bills if you click the button more than once
  $('.content').html(showBillsHtml)
  $('#create-bill').hide()
  // add update button logic here
  $('.paybill').on('click', function (event) { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    event.preventDefault()
    // *** if I remove the top heading in the ui for creditor I will needto remove one parent() below:
    $(this).parent().parent().hide()
    const currentBillID = this.id
    console.log('this is the bill that I want to delete ', currentBillID)
    api.deleteBill(currentBillID)
      .then(deleteBillSuccess)
      .catch(deleteBillFailure)
  })
  $('.updatebill').on('click', function (event) { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    event.preventDefault()
    const currentBillID = this.id
    console.log('this is the bill that I want to update ', currentBillID)
    //  **** need to update the record in a modal ***
    //   document.getElementById('billCreditor').value = ''
    //   document.getElementById('billMonth').value = ''
    //   document.getElementById('billAmount').value = ''
    // need to build a string like I did for create bill
    // api.updateBill(currentBillID) // not sure if I need event here but need to point row in array
    //   .then(updateBillSuccess)
    //   .catch(updateBillFailure)
  })
}

const getBillsFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-out')
}

const clearBills = () => {
  $('.content').empty()
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
  deleteBillSuccess,
  deleteBillFailure,
  // updateBillSuccess,
  // updateBillFailure,
  getBillsSuccess,
  getBillsFailure,
  clearBills
}
