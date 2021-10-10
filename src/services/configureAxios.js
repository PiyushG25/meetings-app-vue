import axios from 'axios';
//import AppConfig from '@/config';
import store from '@/stores';


//const { apiToken } = AppConfig;

// @todo Logic can be bettered to prevent hard-coding authenticated requests
axios.interceptors.request.use(
    request => {
        if( request.url.includes( 'calendar' ) || request.url.includes( 'meetings' ) || 
            request.url.includes( 'users' ) || request.url.includes( 'teams' )  )  
            {
                request.headers['Authorization'] =   store.state.auth.token;
            }

        return request;
    },
    error => Promise.reject( error )
);


