import Vue from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'


// by default the index.js will be imported
import Router from 'vue-router';
//import Vuex from 'vuex';

import dateFilter from '@/filters/date';
//import AppSpinner from '@/components/utils/AppSpinner';
import AppAlert from '@/components/utils/AppAlert';
//import AppVotingWidget from '@/components/utils/AppVotingWidget';

// run this code (nothing to import really)
import '@/services/configureAxios';

//toast-notifications
//import VueToast from 'vue-toast-notification';
//import 'vue-toast-notification/dist/theme-default.css';

Vue.filter( 'date', dateFilter );
//Vue.filter( 'currentDate', currentDateFilter );

//Vue.component( 'AppSpinner', AppSpinner );
Vue.component( 'AppAlert', AppAlert );
//Vue.component( 'AppVotingWidget', AppVotingWidget );


Vue.use( Router );

//Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//Vue.use( VueToast );