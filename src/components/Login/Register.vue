<template>
<div>
<div class="container my-auto mx-auto">
        <div class="signup-container col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <h5 class="card-title text-center">Sign Up</h5>
                    <form class="form-signin" @submit.prevent= 'registerUser' >
                        <div class="form-label-group">
                            <label for="inputName">Name</label>
                            <input 
                            v-model="data.name" 
                            type="text" 
                            id="inputName" 
                            class="form-control" 
                            placeholder="John Doe" 
                            required 
                            autofocus
                            >
                        </div>
                        <div class="form-label-group">
                            <label for="inputEmail">Email address</label>
                            <input 
                            v-model="data.email" 
                            type="email" 
                            id="inputEmail" 
                            class="form-control" 
                            placeholder="Email address" 
                            required 
                            autofocus
                            >
                        </div>

                        <div class="form-label-group">
                            <label for="inputPassword">Password</label>
                            <input 
                            v-model="data.password" 
                            type="password" 
                            id="inputPassword" 
                            class="form-control" 
                            placeholder="Password" 
                            required
                            >
                        </div>
                        <br />
                        
                        <button 
                        class="btn btn-lg btn btn-outline-light btn-block" 
                        type="submit"
                        >
                        <strong>Sign Up</strong>
                        </button>
                        <div class="text-right">
                            <small>Already Registered? 
                                <router-link to="/login" id="signin">
                                    <strong> SIGN IN </strong>
                                </router-link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

</template>
<script>
import { setAuthenticationDetails } from '@/services/auth';
import { registerUser } from "@/services/users";

export default {
name: 'Register',
data() {
return {
    data: {
        name: '',
        email: '',
        password: ''
    }
}
},
methods: {
async registerUser() {
    try {
        const response = await registerUser( this.data );
        console.log( this.data );
        setAuthenticationDetails( response );
        //this.$toast.success( 'Successfully Registered' );
        this.$router.push( { name: 'login-page' } );
    } catch ( error) {
        alert(error);
        //this.$toast.error( error.response.data.message );
    }
}
}
}
</script>
<style scoped>

.container{
display: flex;
justify-content: center;
align-content: center;
max-width: 100%;
max-height: 100%;
padding: 0;
margin: 0;
position: relative;
}

.signup-container{
box-shadow: 0 25px 45px rgb(0 0 0 / 50%);
background:lightseagreen;
color:white;
backdrop-filter: blur(5px);
padding: 1em;
border: 1px solid lightgray;
}
#signin{
color: white;
}
label{
font-weight: 600;
}
input, input::placeholder{
background: transparent;
color: white;
font-weight: 500;
}
</style>