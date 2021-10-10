//import service method
import { login } from '@/services/auth';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';

//authentication related data 
const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '', //shared across application
        email: localStorage.getItem( KEY_EMAIL ) || '' //shared across application
    },

    //to check whether the person is logged in or not?
    getters: {
        isAuthenticated( state ) {
            return !!state.token; 
                // is the token not empty or empty? true | false
                //if token is empty=> person is not loggedin and vice versa
        },
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email;
        },
    },
    actions: {
        // credentials = { email: string, password: string }
        // credentials are nothing but the payloads required for actions
        //{ commit } => we are just extracting the commit,
        // so instead of writing context.commit we can just write it as commit() 
        login( { commit }, credentials ) {
            return login( credentials ) // Post request
                        .then( data => {
                            const { token, email } = data //response
        
                            //storing data(token and email) in local storage
                            localStorage.setItem( KEY_TOKEN, token );
                            localStorage.setItem( KEY_EMAIL, email );
                       
                            //commit values returned to store
                            commit( 'setToken', token );
                            commit( 'setEmail', email );
                       
                            return email;
                        });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN ); //Removing token from localStorage
            localStorage.removeItem( KEY_EMAIL ); //Removing email from localStorage
        
            commit( 'setToken', '' );   //setting token to null
            commit( 'setEmail', '' );   //setting email to null

            return Promise.resolve();
        }
    }
}

export default auth;