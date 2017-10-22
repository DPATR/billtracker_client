'use strict'

// const getFormFields = require(`../../../lib/get-form-fields`)

const store = require('../store')
const api = require('./api.js')
// const events = require('./events.js')
// const getFormFields = require(`../../../lib/get-form-fields`)
const showBillsTemplate = require('../templates/bill-listing.handlebars') // When you set a variable to a require that instantiates handlebars, the variable becomes a function.

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
  $('#updateBillModal').modal('hide')
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

const updateBillSuccess = function (data) {
  $('#message').text('Updated bill successfully')
  $('#updateBillModal').modal('hide')
  $('#modalForm').find('input[name="creditor"]').val('')
  $('#modalForm').find('input[name="billing_month"]').val('')
  $('#modalForm').find('input[name="amount_due"]').val('')
}

const updateBillFailure = function (error) {
  console.error(error)
  $('#message').text('Error on update bill')
}

const deleteBillSuccess = function (data) {
  $('#message').text('Deleted bill successfully')
}

const deleteBillFailure = function (error) {
  console.error(error)
  $('#message').text('Error on delete bill')
}

const filterBillsByUser = (oldArray) => { // Filter { bills: data.bills } to only include bills for the signed in user
  const userID = store.signedInID
  return oldArray.user_id === userID
}

const onUpdateBill = function (currentBillID, creditorName, billingMonth, amountDue) { // Update a bill that is owned by the current user who is signed in
  event.preventDefault()
  // console.log('In onUpdateBill!')
  // console.log('currentBillID = ' + currentBillID)
  const updBillData = {
    'bill': {
      'creditor': creditorName,
      'billing_month': billingMonth,
      'amount_due': amountDue
    }
  }
  // console.log(updBillData, currentBillID)
  api.updateBill(updBillData, currentBillID)
    .then(updateBillSuccess)
    .catch(updateBillFailure)
}

const onUpdateSave = function () { // When signed in user enters data in the modal for edit/update bill and clicks on Save Changes button
  // console.log('In onUpdateSave!')
  // console.log(store.currentBillID)
  event.preventDefault()
  const creditorName = $('#modalForm').find('input[name="creditor"]').val()
  const billingMonth = $('#modalForm').find('input[name="billing_month"]').val()
  const amountDue = $('#modalForm').find('input[name="amount_due"]').val()
  // console.log('Modal creditor = ' + creditorName)
  // console.log('Modal billing month = ' + billingMonth)
  // console.log('Modal amount due = ' + amountDue)
  onUpdateBill(store.currentBillID, creditorName, billingMonth, amountDue)
}

const getBillsSuccess = (data) => { // This function will use handlebars to display a list of Bills for signed in user, Delete the bill when use clicks Pay Bill button and Update the bill when user clicks Update Bill button
  $('#create-bill').hide()
  // $('#getBillsButton').hide()
  const currentBills = { bills: data.bills }
  const currentBillsArray = currentBills.bills
  const newArray = currentBillsArray.filter(filterBillsByUser) // Filter array before displaying on screen; { bills: data.bills } includes bills for ALL Users
  const showBillsHtml = showBillsTemplate({ bills: newArray }) // showBillsTemplate is a function created by requiring handlebars; takes 1 param-an object array of bills
  $('.content').html(showBillsHtml) // using $('.content').append(showBillsHtml) will result in duplicate entries on click of View Bills btn if you click the button more than once
  $('.paybill').on('click', function (event) { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    event.preventDefault()
    $(this).parent().parent().hide() // If I remove the top heading in the ui for creditor I will needto remove one parent()
    const currentBillID = this.id
    // console.log('this is the bill that I want to delete ', currentBillID)
    api.deleteBill(currentBillID)
      .then(deleteBillSuccess)
      .catch(deleteBillFailure)
  })
  $('.updatebill').on('click', function (event) { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    const currentBillID = this.id
    // console.log('this is the bill that I want to update ', currentBillID)
    store.currentBillID = currentBillID
    $('#updateBillModal').modal('show')
    $('#modalForm').on('submit', onUpdateSave)
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
