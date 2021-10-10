import axios from 'axios';
import Appconfig from '@/config';
import { successHandler, errorHandler } from './helper';


const TOKEN_KEY = 'token';
const USER_KEY = 'user';

//credentials (emailId and token ) impported from /modules/auth.js
export const login = ( credentials ) => {
    return axios.post(
                `${Appconfig.apiBaseUrl}/auth/login`,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json' //format of the data
                    }
                }
            )
                .then( successHandler ) //helper function from 'helper.js'
                .catch( errorHandler ); //helper function from 'helper.js'
};

export const setAuthenticationDetails = ( data ) => {
    const { token, ...user } = data;
    localStorage.setItem( TOKEN_KEY, token );
    localStorage.setItem( USER_KEY, JSON.stringify( user ) );
}