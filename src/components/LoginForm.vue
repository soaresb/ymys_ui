<template>
    <div class="container mt-5">
        <div class="text-center">
            
            <form class="form-login">
                <div class="mb-3">
                    <label for="usernameInput">User name</label>
                    <input v-model="username" type="text" class="form-control form-control-sm" id="usernameInput">
                </div>
                <div class="mb-3">
                    <label for="passwordInput">Password</label>
                    <input v-model="password" type="password" class="form-control form-control-sm" id="passwordInput">
                </div>
                <div class="mb-3">
                    <button @click="handleLogin">Login</button>
                </div>
            </form>
                

        </div>
    </div>
</template>

<script>

import { useToast } from "vue-toastification";

export default {
    name: 'LoginForm',
    props: {
        msg: String
    },
    data(){
        return {
            username : "",
            password : ""
        }
    },
    mounted() {
        const loggedIn = localStorage.getItem("token") !== undefined;
        if (loggedIn) {
             this.$router.push({ path: "/" });
        }
    },
    methods: {
        checkToken() {
            return Promise.all([
                this.$ymysApi.get("/auth/check-token", { params: { token: localStorage.getItem("token") } })
            ]).then((responses) => {
                const [authResponse] = responses;
                if (authResponse.status_code === 200) {
                    return true;
                } else {
                    localStorage.removeItem("token");
                }
                return false;
            });
        },
        clearPassword() {
            this.password = "";
        },
        handleLogin(e) {
            const x = e.preventDefault();
            if (this.username.length === 0) {
                const toast = useToast();
                toast.error ("Please enter a username.", {
                    timeout: 2000,
                    icon: false
                });
            } else if (this.password.length === 0) {
                const toast = useToast();
                toast.error ("Please enter a password.", {
                    timeout: 2000,
                    icon: false
                });
            } else {
                if (this.password.length > 0) {
                    this.$ymysApi.post('/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(response => {
                        if (response && response.status === 200) {
                            localStorage.setItem("token", response.data.results.token);
                        }
                        if (this.$route.redirectedFrom && this.$route.redirectedFrom.fullPath != null){
                            this.$router.push({ path: this.$route.redirectedFrom.path });
                        } else {
                            this.$router.push({ path: "/" });
                        }

                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            const toast = useToast();
                            toast.error ("Invalid username or password.  Please try again.", {
                                timeout: 3000,
                                icon: false
                            });
                            this.clearPassword();
                        }
                        if (error.response.status === 404) {
                            const toast = useToast();
                            toast.error ("A user with this username does not exist.", {
                                timeout: 3000,
                                icon: false
                            });
                            this.clearPassword();
                        }
                    });
                }
            }
        }
    }
    
        
}
</script>

<style>
    .form-login {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;

        label {
            float: left;
            font-weight: bold;
        }
    }

    .form-login input[type="text"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-login input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .form-login input[type="checkbox"] {
        label {
            color: red;
        }
    }

    .form-login button {
        background-color: rgb(32, 193, 203);
        border-color: rgb(32, 193, 203);
        padding: 5px 50px;
        text-transform: uppercase;
        color: #ffffff;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .form-check-label {
        text-align: left;
    }

    .Vue-Toastification__toast {
        min-width: 300px;
        max-width: 350px;
    }

    .Vue-Toastification__toast--error {
        background-color: rgba(211, 73, 78, .85)
    }

</style>
