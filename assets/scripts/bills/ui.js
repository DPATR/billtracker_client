'use strict'

const store = require('../store')
const api = require('./api.js')
const showBillsTemplate = require('../templates/bill-listing.handlebars') // When you set a variable to a require that instantiates handlebars, the variable becomes a function.

const signUpSuccess = function (data) {
  $('#message').text('Sign up was successful')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-up')
}

const signInSuccess = function (data) {
  store.signedInID = data.user.id
  store.user = data.user
  store.signedIn = true
  api.getBills()
    .then(getBillsSuccess)
    .catch(getBillsFailure)
  $('#message').text('Sign in was successful')
  $('#sign-in').hide()
  $('#sign-up').hide()
}

const signInFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-in')
}

const changePasswordSuccess = function (data) {
  api.getBills()
    .then(getBillsSuccess)
    .catch(getBillsFailure)
  $('#message').text('Change password was successful')
  $('#change-password').hide()
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#message').text('Error on change-password')
}

const signOutSuccess = function (data) {
  $('#message').text('Sign out was successful')
  store.user = null
  store.signedIn = false
  $('.buttons').hide()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#change-password').hide()
  $('#create-bill').hide()
  $('#updateBillModal').modal('hide')
  clearBills()
}

const signOutFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-out')
}

const createBillSuccess = function (data) {
  api.getBills()
    .then(getBillsSuccess)
    .catch(getBillsFailure)
  $('#message').text('Create bill was successful')
  $('#create-bill').hide()
}

const createBillFailure = function (error) {
  console.error(error)
  $('#message').text('Error on create bill')
}

const updateBillSuccess = function (data) {
  api.getBills()
    .then(getBillsSuccess)
    .catch(getBillsFailure)
  $('#message').text('Update bill was successful')
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
  api.getBills()
    .then(getBillsSuccess)
    .catch(getBillsFailure)
  $('#message').text('Pay Bill was successful')
}

const deleteBillFailure = function (error) {
  console.error(error)
  $('#message').text('Error on delete bill')
}

const onUpdateSave = function () { // When signed in user enters data in the modal for edit/update bill and clicks on Save Changes button
  event.preventDefault()
  const currentBillID = store.currentBillID
  const creditor = $('#modalForm').find('input[name="creditor"]').val()
  const billingMonth = $('#modalForm').find('input[name="billing_month"]').val()
  const amountDue = $('#modalForm').find('input[name="amount_due"]').val()
  const updBillData = {
    'bill': {
      'creditor': creditor,
      'billing_month': billingMonth,
      'amount_due': amountDue
    }
  }
  api.updateBill(updBillData, currentBillID)
    .then(updateBillSuccess)
    .catch(updateBillFailure)
}

const getBillsSuccess = (data) => { // This function will use handlebars to display a list of Bills for signed in user, Delete the bill when use clicks Pay Bill button and Update the bill when user clicks Update Bill button
  $('#create-bill').hide()
  $('#content').show()
  const showBillsHtml = showBillsTemplate({ bills: data.bills }) // showBillsTemplate is a function created by requiring handlebars; takes 1 param-an object array of bills
  $('.content').html(showBillsHtml) // using $('.content').append(showBillsHtml) will result in duplicate entries on click of View Bills btn if you click the button more than once
  $('.paybill').on('click', function (event) { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    event.preventDefault()
    $(this).parent().parent().hide()
    const currentBillID = $(this).data('id')
    api.deleteBill(currentBillID)
      .then(deleteBillSuccess)
      .catch(deleteBillFailure)
  })
  $('.updatebill').on('click', function (event) { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    event.preventDefault()
    $('#updateBillModal').modal('show')
    const currentBillID = $(this).data('id') // changed after handlebars change on button:  data-id="{{bill.id}}"
    store.currentBillID = currentBillID
    const currentCreditor = $(this).data('billcreditor')
    const currentBillMonth = $(this).data('billmonth')
    const currentAmountDue = $(this).data('amountdue')
    $('#modalForm').find('input[name="creditor"]').val(currentCreditor)
    $('#modalForm').find('input[name="billing_month"]').val(currentBillMonth)
    $('#modalForm').find('input[name="amount_due"]').val(currentAmountDue)
    $('#submit-update').on('click', onUpdateSave)
  })
}

const getBillsFailure = function (error) {
  console.error(error)
  $('#message').text('Error on get bills')
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
  updateBillSuccess,
  updateBillFailure,
  getBillsSuccess,
  getBillsFailure,
  clearBills
}
