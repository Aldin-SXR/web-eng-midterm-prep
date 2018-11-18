const app = angular.module("user-app", [ "ngAnimate", 'ngSanitize', "ui.bootstrap", "toastr" ]);

app.controller("usersController", usersController);
app.service("usersService", usersService);