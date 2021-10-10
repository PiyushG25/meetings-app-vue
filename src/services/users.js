import axios from 'axios';
import AppConfig from '@/config';

const {apiBaseUrl , apiToken} = AppConfig;
const getAllUsers = async() => {
	const response= await axios.get( `${apiBaseUrl}/users?token=${apiToken}` )
					// console.log( response.data );
					return response.data;
				}

const registerUser = ( data ) => {
					return axios.post( `${apiBaseUrl}/auth/register`, data )
								.then( response => {
									// console.log( response.data );
									return response.data;
								})
								.catch( error => {
									// console.log( error );
									throw error;
								});
				}
				

export {
	getAllUsers,
  registerUser
}