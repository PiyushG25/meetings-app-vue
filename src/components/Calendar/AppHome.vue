<template>
<div class="container">
<h2 id="page-title">{{nameofPage}}</h2>
<hr>
<div  class="d-flex ">
  <label>
    <strong>{{this.selectedDate}}</strong>
  </label>
  <div class="date-picker ml-auto" >
          <input 
            type="date" 
            name="datepicker" 
            id="date-picker" 
            :value="this.selectedDate" 
            @input="dateChangeHandler( $event )"
          >
  </div>
</div>
<label>
  <strong>{{new Date( this.selectedDate).toDateString().substring(0,4)}}</strong>
</label>
    <div class = "row" v-if = "status === 'LOADING'">
          <div class = "col-12">
              <div class="alert alert-primary alert-dismissible fade show" role="alert">
                  <button type="button" 
                    class="close" 
                    data-dismiss="alert" 
                    aria-label="Close"
                  >
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                  </button>
                  <strong>Loading Meetings...</strong>
              </div>
          </div>
      </div>

      <div class = "row" v-if = "status === 'ERROR_LOADING'">
          <div class = "col-12">
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <button 
                    type="button" 
                    class="close" 
                    data-dismiss="alert" 
                    aria-label="Close"
                  >
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                  </button>
                  <strong>{{this.error.response.data.message}}</strong>
              </div>
          </div>
      </div>
      <!--No Meetings Message-->
      <div 
        class="container" 
        v-if = "status === 'LOADED'  && this.meetings.length === 0"
      >
        <p class="lead text-center" style="color:crimson">
          <strong>No meetings on {{new Date( this.selectedDate ).toDateString()}}</strong>
        </p>  
      <div class="calendar-hrs">
        <ul 
          class="" 
          id="calendardata" 
          style="list-style-type:none;"
        >
          <li >
            <div  v-for="hour in 24" :key="hour" id="hrs">
              <p class="time-slot">{{hour-1}}</p> 
                <div  class="calendar-hr">
                  <span class="calendar-meeting">     
                  </span>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--Meetings Message-->
    <div 
      class="jumbotron-fluid container" 
      v-else-if = "status === 'LOADED'  && this.meetings.length > 0 "
    >  
      <div class="calendar-hrs">
        <ul class="" id="calendardata" style="list-style-type:none;">
          <li >
            <div  v-for="hour in 24" :key="hour" id="hrs">
              <p class="time-slot">{{hour-1}}</p>
              <div  class="calendar-hr">
                <span class="calendar-meeting d-flex"> 
                  <div  
                    v-for="meeting in meetings" 
                    :key="meeting.id"
                    class="meetingsContainer"
                  >
                      <div v-if="meeting.startTime.hours === hour-1">
                        <div 
                          class="scheduledMeeting"
                        >
                          <p class="meeting-title">{{meeting.name}}</p>
                          <p class="line"></p>
                          <p>Attendees:  
                            <span 
                              v-for="attendee in meeting.attendees" 
                              :key="attendee.id">{{attendee.email}}, 
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>         
                </span>
              </div>
          </div>
        </li>
      </ul>
    </div>
      </div>
  </div>


</template>

<script>
// import CalendarView from '@/components/Calendar/CalendarView';
import { getMeetingsByDate } from '@/services/meetings';

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
name: 'Calendar',
components:{
//  CalendarView
},
data() {
return {
nameofPage: 'Calendar',
// status = 'LOADING' | 'LOADED' | 'ERROR'
status: LOADING,
meetings: [],
error: null,
date:"2021-10-11",
selectedDate: new Date().toISOString().substring( 0, 10 ), 
};
},    
async created() {
try {
const data = await getMeetingsByDate(this.date);
console.log(data);
this.status= 'LOADED';
this.meetings = data; 
}
catch(error) {
    this.status= 'ERROR';
    this.error= error;
}
},
methods: {
  dateChangeHandler( event ) {
      this.selectedDate= event.target.value;
      this.getMeetingsByDate( this.selectedDate );
  },
  getMeetingsByDate( date ){
      getMeetingsByDate( date )
          .then( response => {
              this.status = LOADED;
              this.meetings = response;
          })
          .catch( error => {
              this.status = ERROR_LOADING;
              this.error = error;
              // console.log( error );
          });
  }
},
mounted() {
  this.getMeetingsByDate( this.selectedDate );
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
padding:0;
margin:0;
}
#page-title{
font-weight:650;
}
#hrs{
display: flex;
justify-content: space-between;
}
.time-slot{
width:15px;
}
.line{
padding: 0.1em;
margin: 0;
border-bottom: 1px solid black;
}
.calendar-hr{
display: flex;
height: 5rem;
margin: 2px 0;
margin-left: 0.5em;
margin-right: 0.5em;
background-color:lightseagreen ;
width: 100%;
justify-content: center;
align-items: center;
/*float: right;*/
}
.calendar-meeting{
display:flex;
flex-wrap:wrap;
}
.meetingsContainer{
/*height:fit-content ;*/
margin:0.3em;
padding: 0 ,0.3em ;
justify-content:space-around;
flex-wrap: wrap;
z-index: 0;
width:98%;
background: lightgray;
/*  margin-left: 0.6em;
margin-right: 0.6em;*/
}
.scheduledMeeting{
flex-direction: row;
flex-wrap: wrap;
opacity: 0.9;
margin-top: 0.3em;
padding: 0 0.3em;
/*flex-wrap: wrap;*/
}
.scheduledMeeting p{
padding: 0;
font-size: 1em;
}
.meeting-title{
font-size: 1.5em;
font-weight: bold;
text-align: center;
}
.calendar-widget{
display: flex;
justify-content: right;
height: auto;
}

@media(max-width:800px)
{
.calendar-meeting{
flex-direction: column;
flex-wrap:wrap;
}

.meetings-container{
flex-wrap:wrap;

}

.scheduledMeeting p{
padding: 0;
font-size: 0.7em;
}
.meeting-title{
font-size: 1em;
font-weight: bold;
text-align: center;
}


}

</style>
