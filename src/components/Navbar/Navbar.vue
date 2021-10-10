<template>
<!--b4-navbar-minimal-ul-->
<nav class="navbar navbar-expand"  v-if="isAuthenticated">
    <div class="container px-1" id="desktop-view"> 
        <ul class="nav navbar-nav" v-if="isAuthenticated">
            <li class="nav-item"  >
                <router-link class="nav-link" to="/calendar" active-class="active" exact><strong>Calendar</strong></router-link>
            </li>
            <li class="nav-item" >
                <router-link class="nav-link" to="/meetings" active-class="active" exact ><strong>Meetings</strong></router-link>
            </li>
            <li class="nav-item" >
                <router-link class="nav-link" to="/teams" active-class="active" exact><strong>Teams</strong></router-link>
            </li>
        </ul>
        <!---->
            <ul class="nav navbar-nav" v-if="isAuthenticated">
                <li class="nav-item nav-link">
                    <router-link to="#" class="user"><strong><b-icon icon="person-fill"></b-icon> {{email}}</strong></router-link>
                </li>
                <li class="nav-item nav-link" >
                    <!--<span class="nav-link cursor-pointer" @click="logout()"><strong>Logout</strong></span>-->
                    <b-button variant="outline-info" class="mb-2 logout-btn " style="color:rgb(6, 134, 146);" @click="logout()">
                        <b-icon icon="power" aria-hidden="true"></b-icon><strong>Logout</strong>
                        </b-button>
                </li>
            </ul>

        <!---->
    </div>

<div class="container-mobile" id="mobile-view" v-if="isAuthenticated">
<nav class="navbar" >
<div>
    <h4>MyMeetings</h4>
</div>


<div class="col-xs-6" >
    <div class="hamburger-wrap">
    <button class="hamburger" type="button" @click="menuOpen = !menuOpen">
        <span class="hamburger__line"></span>
        <span class="hamburger__middle"></span>
        <span class="icon-bar hamburger__line"></span>          
    </button>
    </div>
</div>

<div class="row dropdown" :class="{ 'dropdown-after' : menuOpen } ">
<ul class="nav navbar-nav" >
            <li class="nav-item" @click="menuOpen=!menuOpen" >
                <router-link class="nav-link" to="/calendar" active-class="active" exact >Calendar</router-link>
            </li>
            <li class="nav-item" @click="menuOpen=!menuOpen">
                <router-link class="nav-link" to="/meetings" active-class="active" exact >Meetings</router-link>
            </li>
            <li class="nav-item" @click="menuOpen=!menuOpen">
                <router-link class="nav-link" to="/teams" active-class="active" exact>Teams</router-link>
            </li>
                <li class="nav-item" @click="menuOpen=!menuOpen">
                    <span class="nav-link">
                            <router-link to="#" exact class="user">{{email}}</router-link>
                    </span>
                </li>
                <li class="nav-item" @click="menuOpen=!menuOpen">
                        <b-button variant="outline-info" class="mb-2 logout-btn"
                        style="color:rgb(6, 134, 146);" @click="logout()">
                        <b-icon icon="power" aria-hidden="true"></b-icon><strong>Logout</strong>
                        </b-button>
                </li>
        </ul>
        
</div>
</nav>
</div>
</nav>

</template>

<script>
import Appconfig from '@/config';

export default {
name : 'Navbar',
    data() {
        return {
            apiBaseUrl: Appconfig.apiBaseUrl,
            menuOpen: false
        }
    },
        computed: {
    // ...mapState( [ 'email' ] ),
    // ...mapGetters( [ 'isAuthenticated' ] )
    email() {
        return this.$store.state.auth.email;
    },
    isAuthenticated() {
        return this.$store.getters.isAuthenticated;
    }
},
methods: {
    logout() {
        this.$store.dispatch( 'logout' )
            .then( () => this.$router.push( { name: 'login' } ) );
    }
}
};
</script>

<style scoped>
nav {
    padding:0;
    margin:0;
}

#mobile-view
{
display: none;
}

.logout-btn{
border:none;
}
.logout-btn:hover{
background: none;
}

.user{
color:rgb(6, 134, 146);
}
.nav-link{
    font-size: 1em;
    color:black;
}

.navbar {
padding-right: 2em;
background-color:rgb(236, 236, 236);
width: 100%;
}

/******Media Queries******/ 
@media(max-width:800px)
{
#desktop-view{
display: none;
}

.navbar{
    padding:0;
    margin:0;
}

.container-mobile {
margin:0;
height: 4rem;
display: flex;
justify-content: space-between;
border-radius: 0px;
max-width:100%;
width:98%;
padding-left:1em;
}



.hamburger-wrap {
width: 1em;
margin-right: 0.5em;
display: flex;
justify-content: flex-end;
align-items: center;
float:right;
}


.hamburger {
width: 2.5em;
height: 2.5em;
*background-color: black;
*border-radius: 4px;
}

.hamburger:focus {
outline: none;
}

.hamburger__line,
.hamburger__middle {
display: block;
width: 1.5em;
height: 2px;
border-radius: 2px;
background-color: lightseagreen;
margin-top: 0.4em;
margin-bottom: 0.4em;
}

.hamburger__middle {
width: 1.2em;
margin-left: 0.3em;
}

.dropdown {
margin-top: auto;
height: 0;
background-color:rgb(236, 236, 236);
*transition: height 0.2s ease;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
z-index: 3;
}

.dropdown-after {
height: auto;

*transition: height 0.2s ease;
}

.nav {
list-style: none;
}

.nav-item {
display: block;
width: 100%;
text-align: center;
padding-top: 1em;
padding-bottom: 0.5em;
font-weight: bolder;
font-size: 1.3em;

}


.nav-link {
color: black;
}

#mobile-view
{
display:flex;
}   

}
</style>