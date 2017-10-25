  # DESCRIPTION

  This is an application designed to keep track of bills that are due for payment each month.

  Each user will have their own collection of bills that cannot be viewed by other system users.

  Authorization:

  1. When accessing the application for the first time, the person must Sign Up with an email address and password and then Sign In.
  2. An option to Change Password will be available once you are signed in.
  3. You should Sign Out before exiting the game.

  View Bills:

  1. Generates a list of bills that are due for payment in any given month.
  2. Options exist to edit existing bills and pay existing bills.
  3. After editing or paying a bill, the list of bills will refresh for viewing.
  4. After paying a bill, it will be removed from the list of bills and the database.

  Create Bill:

  1. Generates a new bill that is due for payment in any given month.
  2. After crediting a bill, the list of bills will refresh for viewing.

  Author: Denise Patriquin Date: 10/24/2017

## VIEW ONLINE

Client Bill Tracker Application:  https://dpatr.github.io/billtracker_client/

API Bill Tracker Application:  https://cryptic-headland-52960.herokuapp.icom

API GitHub Repository:  https://github.com/DPATR/billtracker_api

## TECHNOLOGIES

1. JavaScript
2. jQuery for DOM manipulation and event handling
3. AJAX for interacting with an API
4. CSS for styles
5. Bootstrap
6. Handlebars for templating
7. Modal dialog box

## PLANNING AND APPROACH

Wireframe: https://imgur.com/A16uUpk

User Stories: https://imgur.com/jzAzqdI

Approach:

I used a top-down analysis for this project.  The API was designed and tested first.  The Client was designed and tested using the API structure and data.

For the Client, I began by writing pseudo-code and then built code modules.

I used test scenarios and each module was unit tested.  I followed with integration and end-to-end testing for the application as a whole.

## FUTURE ENHANCEMENTS

1. Code refactoring to include breaking out the Authentication events and the Billing Resource events.
