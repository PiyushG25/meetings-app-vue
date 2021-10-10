import Vue from 'vue'
import Vuex from 'vuex';
import auth from './modules/auth';


Vue.use(Vuex);
// create store
const store = new Vuex.Store({
//modules (like auth)
    modules: {
        auth: auth
    }
});

export default store;