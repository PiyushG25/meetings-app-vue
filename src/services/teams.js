import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

const  getTeams = async () => {
    const response = await axios.get( `${apiBaseUrl}/teams` );
    return response.data;
};


const addTeam = async ( data ) => {
    const response= await axios.post( `${apiBaseUrl}/teams`, data)
    return response.data;
};


const addMemberToTeam = async( teamId, emailId ) => {
console.log(emailId);
 const response= await axios.patch( `${apiBaseUrl}/teams/${teamId}`,
    {},
    {params: {action:'add_member', email: emailId }});
    console.log(response.data);    
    return response.data;
};

const excuseYourself = async( teamId ) => {
    const response= await axios.patch( `${apiBaseUrl}/teams/${teamId}?action=remove_member`);
    return response.data; 
}


export {
    getTeams,
    addTeam,
    addMemberToTeam,
    excuseYourself
};