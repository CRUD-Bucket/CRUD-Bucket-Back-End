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
.post('/rootfolders', 'folders#createRoot')
.get('/rootfolders/:path', 'folders#showRoot')
.get('/folders/:path', 'folders#index')
.get('/userfolders', 'folders#showByOwner')

//uploads routes
.resources('files')
.resources('folders')

// all routes created
;
