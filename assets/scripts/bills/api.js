'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  console.log('In api.js')
  console.log(data)
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function (data) {
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getBills = function () {
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/bills',
    method: 'GET'
  })
}

const createBill = function (data) {
  console.log('In api.js')
  console.log(data)
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/bills',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateBill = function (data, currentBillID) {
  console.log('In api.js')
  console.log('currentBillID = ' + currentBillID)
  console.log(data)
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/bills/' + currentBillID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteBill = function (currentBillID) {
  // console.log('In api.js, currentBillID = ' + currentBillID)
  return $.ajax({
    url: config.apiOrigin + '/bills/' + currentBillID,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getBills,
  createBill,
  deleteBill,
  updateBill
}
