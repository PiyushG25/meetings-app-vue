<template>
    <div class="container">       
        <div class="login-container col-sm-9 col-md-7 col-lg-5 mx-auto my-auto">
            <h2>Meetings</h2>
            <h5>A world of Opportunities</h5>
            <hr />
            <form name="form" @submit.prevent="login">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        placeholder="john.doe@example.com"
                        v-model="form.email"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        autocomplete="off"
                        class="form-control"
                        name="password"
                        id="password"
                        v-model="form.password"
                        required
                    />
                </div>
                <div class="form-group">
                    <button 
                        class="btn btn-lg btn btn-outline-light btn-block" 
                        type="submit"
                    >
						<strong>Login</strong>
					</button>
                </div>
            </form>
            <div class="text-right">
                <small>Don't have an account?
                    <router-link to="/register" id="signup">
                        <strong> SIGN UP </strong>                        
                    </router-link>
                </small>
            </div>
        </div>       
    </div>
</template>

<script>
export default {
    name: 'AppLogin',
    data() {
        return {
            processing: false,
            form: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            this.$store.dispatch( 'login', this.form )  //dispatching login action to auth.js
                .then( () => this.$router.push( { name: 'Calendar' } ) )  
                .catch( error => {
                    alert( error.message );
                });
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
    
}

.login-container{
    box-shadow: 0 25px 45px rgb(0 0 0 / 50%);
    background:lightseagreen;
    color:white;
    backdrop-filter: blur(5px);
    padding: 1em;
    border: 1px solid lightgray;
}
#signup{
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