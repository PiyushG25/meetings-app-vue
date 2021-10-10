<template>
 <div>
        <div class="container">
       <div class="form-container" >
        <h2 class="display-9">Search for Meetings</h2>
                    <hr class="my-2">
                    <div class="dropdown">
                        <h5 class="bold">
                            Date
                        </h5>
                        <div class="form-group">
                            <select class="form-control" id="exampleFormControlSelect1 period" 
                              name="period" @change="inputChangeHandler( $event )">
                                <option value="all">ALL</option>
                                <option value="past">PAST</option>
                                <option selected value="present">TODAY</option>
                                <option value="future">UPCOMING</option>
                            </select>
                        </div>
                    </div>
                    <h5 class="bold">
                        Search for 
                    </h5>
                    <div class="input-group">
                        <textarea name="search-words" class="form-control" 
                            placeholder="Search using words which describe the meeting" 
                            aria-label="With textarea" 
                            @change="inputChangeHandler( $event )">
                        </textarea>
                    </div>
                    <p class="lead">
                        <button type="button" class="btn btn-light" @click="searchMeetings">Search</button>
                    </p>
        </div><br>
        </div>
        <MeetingsList :period="this.period" :search-words="this.searchWords" ref="meetingList"/>
    </div>
</template>
<script>
import MeetingsList from './MeetingsList';

export default {
     
    components:{
        MeetingsList
    },
    data() {
        return{
            period: 'present',
            searchWords: '',
        }
    },
    methods: {
        inputChangeHandler ( event ) {
            if( event.target.name === 'period' ) {
                this.period = event.target.value;
            }
            if( event.target.name === 'search-words' ) {
                this.searchWords = event.target.value;
            }
        },
        searchMeetings() {
            this.$refs.meetingList.searchMeetings();
        }
    },
}

</script>
<style scoped>
.container {
    margin-bottom: 20px;
}
.nav-link{
    text-decoration: none;
}
.dropdown {
    margin-bottom: 20px;
}

.btn-light {
    margin-top: 20px;
}

.unbold {
    font-weight: normal;
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
.form-control option.active{
    background-color:rgb(20, 203, 219);
    color: #ffff;
}
.btn{
    background-color:rgb(6, 134, 146);
    color: white;
    font-weight: bold;
}
option{
    background-color:rgb(208, 250, 253);
    font-weight: 600;
}
</style>