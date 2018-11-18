const usersService = function($http) {
    this.users = [ ];

    this.fetch = () => {
        return $http.get("/users").then(response => {
            this.users = response.data;
            return this.users;
        }, error => {
    
        }); 
    }

    this.addUser = (user) => {
        this.users.push(user);
    }

    this.updateUser = (id, user) => {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === id) {
                this.users[i] = {
                    ...this.users[i],
                    ...user
                }
            }
        }
    }

    this.removeUser = (id) => {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id == id) {
                this.users.splice(i, 1);
            }
        }
    }
}