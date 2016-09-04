'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

//folder routes
.post('/folders', 'folders#create')
.get('/folders', 'folders#index')
.get('/folders/:id', 'folders#show')
.patch('/folders/:id', 'folders#update')
.delete('/folders/:id', 'folders#destroy')

//file routes
.post('/files', 'files#create')
.get('/files', 'files#index')
.get('/files/:id', 'files#show')
.patch('/files/:id', 'files#update')
.delete('/files/:id', 'files#destroy')

// all routes created
;
