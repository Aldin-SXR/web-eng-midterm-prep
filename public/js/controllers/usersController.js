const usersController = ($scope, $uibModal, toastr, usersService) => {
    usersService.fetch().then(users => {
        $scope.users = users;
        $scope.$apply();
    });

    $scope.openModal = (data) => {
        let modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: "views/modal.html",
            controller: ($scope, $uibModalInstance, $http, data, usersService) => {
                $scope.user = data;
                $scope.updateUser = (user) => {
                    $http.put("/users/" + user._id, user).then(response => {
                        toastr.success("Successfully updated a new user.", "Successful update");
                        $uibModalInstance.close();
                    }, error => {
                        toastr.error("There has been an error while updating a user.", "Unknown error");
                    });
                }
                $scope.submitUser = (user) => {
                    $http.post("/users", user).then(response => {
                        usersService.addUser(user);
                        toastr.success("Successfully added a new user.", "Successful add");
                        $uibModalInstance.close();
                    }, error => {
                        toastr.error("There has been an error while adding a new user.", "Unknown error");
                    });
                }
                $scope.cancel = () => {
                    $uibModalInstance.dismiss("cancel");
                }
            },
            size: "lg",
            resolve: {
                data: () => {
                    return data;
                }
            }
        });

        modal.result.then(() => {

        });
    }

    $scope.openDelete = (data) => {
        let modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: "views/deleteModal.html",
            controller: ($scope, $uibModalInstance, $http, data) => {
                $scope.user = data;
                $scope.deleteUser = (user) => {
                    $http.delete("/users/" + user._id).then(response => {
                        usersService.removeUser(user._id);
                        toastr.success("Successfully deleted a user.", "Successful deletion");
                        $uibModalInstance.close();
                    }, error => {
                        toastr.error("There has been an error while deleting a user.", "Unknown error");
                    });
                }
                $scope.cancel = () => {
                    $uibModalInstance.dismiss("cancel");
                }
            },
            size: "lg",
            resolve: {
                data: () => {
                    return data;
                }
            }
        });
    }
}