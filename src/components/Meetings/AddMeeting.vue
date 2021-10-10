<template>
    <div>
        <div class="container">
                <div class="form-container">
                    <form @submit.prevent="addMeeting">
                        <h2 class="display-9">Add a new Meeting</h2>
                        <hr class="my-2">

                        <h5 class="bold">
                            Meeting name
                        </h5>
                        <input 
                            name="name" 
                            class="form-control form-control-md" 
                            id="meeting-name" 
                            type="text" 
                            placeholder="Meeting Name" 
                            v-model="name" 
                            required
                        >

                        <h5 class="bold">
                            Description
                        </h5>
                        <div class="input-group">
                            <textarea 
                                name="description" 
                                class="form-control" 
                                aria-label="With textarea" 
                                placeholder="What is the agenda of the meeting?" 
                                v-model="description">
                            </textarea>
                        </div>


                        <h5 class="bold">
                            Date
                        </h5>
                        <input 
                            name="date" 
                            type="date" 
                            class="date-picker" 
                            v-model="date" 
                            required
                        >

                       
                        <h5 class="bold">
                            Start time (hh:mm)
                        </h5>
                        <div class="time">
                            <select name="start-hours" id="time" v-model="startTimeHours">
                                <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 23" :key='index'> {{index}} </option>
                            </select>
                            :
                            <select name="start-minutes" id="time" v-model="startTimeMinutes">
                                <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 59" :key='index'> {{index}} </option>
                            </select>
                        </div>

                        <h5 class="bold">
                            End time (hh:mm)
                        </h5>
                        <div class="time">
                            <select name="end-hours" id="time" v-model="endTimeHours">
                                 <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 23" :key='index'> {{index}} </option>
                            </select>
                            :
                            <select name="end-minutes" id="time" v-model="endTimeMinutes">
                                <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 59" :key='index'> {{index}} </option>
                            </select>
                        </div>

                        <h5 class="bold">
                            EmailIDs of attendees or teams's short
                        </h5>
                        <multiselect v-model="attendees" tag-placeholder="Add this as new tag" 
                        placeholder="john@example, @annual-day, mark@example.com" label="name" track-by="id" 
                        :options="options" :multiple="true" :taggable="true">
                        </multiselect>

                        <p id="tagline">seperate emailids / team's short names by commas - teams short names always begin with @</p>

                        <p class="lead">
                            <input type="submit" class="btn btn-light" value="Add Meeting" />
                        </p>
                    </form>
                </div>
            </div>
        </div>
</template>
<script>
import { addMeeting } from '@/services/meetings';
import { getTeams } from '@/services/teams';
import { getAllUsers } from '@/services/users';
import Multiselect from 'vue-multiselect';

export default {
    name: 'AddMeeting',
    components: {
        Multiselect
    },
    data() {
        return {
            options: [],
            name: '',
            date: '',
            description: '',
            startTimeHours: 0,
            startTimeMinutes: 0,
            endTimeHours: 0,
            endTimeMinutes: 0,
            attendees: [],
        }
    },
    methods: {
        addMeeting() {
            const userAttendees = [];
            const teamAttendees = [];
            this.attendees.forEach( attendee => {
                if( attendee.type === 'user' ) {
                    userAttendees.push( attendee.name );
                } else if ( attendee.type === 'team' ) {
                    teamAttendees.push( attendee.name.slice(1) );
                }
            });
            const requestBody = {
                name: this.name,
                date: this.date,
                description: this.description,
                startTime: {
                    hours: this.startTimeHours,
                    minutes: this.startTimeMinutes
                },
                endTime: {
                    hours: this.endTimeHours,
                    minutes: this.endTimeMinutes
                },
                attendees: userAttendees,
                teams: teamAttendees
            };
            // console.log( this.attendees );
            addMeeting( requestBody )
                .then( response => {
                    this.meetings = response;
                    //this.$toast.success( 'Succesfully added a Meeting' )
                    alert( 'Succesfully added a Meeting' );
                })
                .catch( error => {
                    alert(error);
                    //this.$toast.error( error.response.data.message );
                    // console.log( error );
                });
            this.name = '';
            this.date = '';
            this.description = '';
            this.startTimeHours = 0;
            this.startTimeMinutes = 0;
            this.endTimeHours = 0;
            this.endTimeMinutes = 0;
            this.attendees = []
        }
    },
    async mounted() {
        try {
            let response = await getTeams();
            const teams = response;
            teams.forEach( team => {
                this.options.push({ id: team._id, type: 'team', name: team.shortName[0] === '@' ? team.shortName : `@${team.shortName}`});
            });

            response = await getAllUsers();
            const users = response;
            users.forEach( user => {
                this.options.push( { id: user._id, type: 'user', name: user.email} );
            });
        } catch ( error ) {
            //this.$toast.error( 'Error while fetching Options' );
            alert(error);
        }
    }
}
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
.btn-light {
    margin-top: 20px;
}

#time {
    padding-right: 20px;
    border-radius: 4px;
    height: 30px;
}

.time {
    margin-bottom: 20px;
}


.date-picker, .input-group, #meeting-name {
    width: 100%;
    margin-bottom: 20px;
}
.form-container{
    box-sizing: border-box;
    background-color:lightseagreen;
    padding: 0.8em;
    margin:0;
}
.display-9{
    color:#ffff;
    font-weight:bold;
}
.btn{
    background-color:rgb(6, 134, 146);
    color: white;
    font-weight: bold;
}

</style>