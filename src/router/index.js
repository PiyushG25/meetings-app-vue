import Router from 'vue-router';
import store from '@/stores';

//@ -> src/folder
import Home from '@/components/Calendar/AppHome';
import Meetings from '@/components/Meetings/Meetings';
import AddMeeting from '@/components/Meetings/AddMeeting';
import FilterMeeting from '@/components/Meetings/FilterMeetings';
//import MeetingsList from '@/components/Meetings/MeetingsList';
import Teams from '@/components/Teams/Teams';
//import AddTeam from '@/components/Teams/AddTeam';
import Login from '@/components/Login/AppLogin';
import Register from '@/components/Login/Register';


const router = new Router({
    mode : 'history',
    routes: [
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'Calendar',
            path: '/calendar',
            component: Home
        },
        {
            name: 'Meetings',
            path: '/meetings',
            component: Meetings,
            props: true,
            children: [
                {
                    name: 'FilterMeeting',
                    path: '',
                    component:FilterMeeting,
                    props:true,
                },
                {
                    name:'AddMeeting',
                    path:'add',
                    component: AddMeeting,
                    props: true,
                }
            ]
        },
        {
            name: 'Teams',
            path: '/teams',
            component: Teams
            /*children:[
                {
                    name:'add-team',
                    path: '/add'
                }
            ]*/
        }
    ]

});

// Global auth guard
router.beforeEach(( to, from, next ) => {
    if( to.name !== 'login'  && !store.getters.isAuthenticated && to.name!== 'register' ) {
        return next({
            name: 'login'
        });
    }    
     next();
});


export default router;