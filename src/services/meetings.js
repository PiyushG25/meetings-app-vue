import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;
const  getMeetingsByDate = async (currentDate) => {
    const response = await axios.get(`${apiBaseUrl}/calendar` ,{
        params: {
            date: currentDate
        }
    } );
    return response.data;
};


const searchMeetings = async ( period, search ) => {
    const response =await axios.get( `${apiBaseUrl}/meetings`, {
        params:{
            period:period,
            search:search
        }
    });
            return response.data;
}

const addAttendee = async( id, data ) => {
    const response = await axios.patch( `${apiBaseUrl}/meetings/${id}`,{},
    { params:{ action:'add_attendee', email:data}});
        return response.data;  
};

const excuseMeeting = async( meetingId ) => {
    const response = await axios.patch( `${apiBaseUrl}/meetings/${meetingId}?action=remove_attendee`)
        return response.data;
};

const addMeeting = async( data ) => {
    const response = await axios.post( `${apiBaseUrl}/meetings`, data )
        return response.data;
};

export {
    getMeetingsByDate,
    searchMeetings,
    addAttendee,
    excuseMeeting,
    addMeeting
};