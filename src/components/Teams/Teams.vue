<template>
        <div class="container">
            <br>
            <h1>Teams</h1>
            <hr>

            <div v-if="this.status === 'LOADING'" 
                class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>Loading Teams...</strong>
            </div>

            <div v-if="this.status === 'ERROR_LOADING'" 
                class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>{{ this.error.response.data.message }}</strong>
            </div>

            <div class="row" v-else-if = "status === 'LOADED'">
                <div class="col-4 d-flex card-container" v-for="team in this.teams" :key="team._id">
                    <div class="card" style="width: 18rem;" >
                        <div class="card-body">
                            <h5 class="card-title">{{ team.name }}</h5>
                            <h6 class="card-title">{{ team.shortName }}</h6>
                            <p  class="card-text">{{ team.description }}</p> 
                            <button type="button" class="btn btn-danger" 
                                @click="excuseYourself( team._id )" >
                                Excuse Yourself
                            </button>
                            <hr>
                            <strong>Members:</strong>
                            <div v-for='member in team.members' 
                                :key="member.userId" style="display: inline">
                                <span class="badge badge-primary" style="margin-left: 10px;">
                                    {{ member.email }}
                                </span>
                            </div>
                            <div style= "padding-top: 10px">
                                <select name="users" id="usersList" style="margin-right: 10px;">
                                    <option value="" selected hidden>Select Member</option>
                                    <option v-for="user in users" :key="user._id" 
                                        :value="user.email" >
                                            {{user.email}}
                                    </option>
                                </select>
                                <button type="button" class="btn btn-primary"  
                                    @click="addMemberToTeam( team._id, $event )">
                                        Add
                                </button>
                            </div>                                    
                        </div>
                    </div>
                </div>
                <div class="col-4 d-flex card-container" >
                    <div class="card addTeamCard" >
                         <b-button v-b-modal.modal-center class="fa fa-plus fa-4x text-center"
                            id="addTeammodal"  @click="addTeamModal=true"></b-button>
                    </div>
                    </div>
                <b-modal id="modal-center"  hide-footer centered title="Add Team" v-model="addTeamModal">
                    <AddTeam v-on:submit-team="submitTeam" :users="this.users"/>
                </b-modal>
                
            </div>
        </div>
</template>

<script>
import AddTeam from './AddTeam';
import {getTeams, excuseYourself, addMemberToTeam} from '@/services/teams'
import { getAllUsers } from '@/services/users'

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR = 'ERROR';

export default {
    name: 'TeamCard',
    components: {
        AddTeam,
    },
    data(){
        return{
        nameofPage:'Teams',
            // status = 'LOADING' | 'LOADED' | 'ERROR'
        status: LOADING,
        teams: [],
        users: [],
        addTeamModal: false,
    
    }; },
    props: {
        isShown: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        submitTeam( addedTeam ) {
            this.addTeamModal = false;
            this.teams = [ ...this.teams, ...addedTeam ];
        },

    async excuseYourself( teamId ) {
            try {
                const response = await excuseYourself( teamId );
                //this.$toast.success( `Left <strong>${response.name}</strong>` );
                alert(`Left ${response.name}`);

                let ind;
                this.teams.forEach( ( team, index ) => {
                    if( team._id === teamId ){
                        ind = index;
                    }
                });

                this.teams = [
                    ...this.teams.slice( 0, ind ),
                    ...this.teams.slice( ind + 1 )
                ]
                return response;
                
            } catch ( error ) {
                //this.$toast.error( error.response.data.message );
                alert(error);
            }
        },

            async addMemberToTeam( teamId, event ) {
             const emailId = event.target.parentElement.children[0].value;
             //console.log(email);
            try {
                let ind;
                const updatedTeam = await addMemberToTeam( teamId,   emailId  );
                 console.log( updatedTeam );
                // console.log(userId);
                //this.$toast.success( `Added <strong>${email}</strong> to <strong>${updatedTeam.name}</strong>` );
                alert(`Added ${emailId} to ${updatedTeam.name}` );

                this.teams.forEach( ( team, index ) => {
                    if( team._id === updatedTeam._id ) {
                        ind = index;
                    }
                });

                this.teams = [
                    ...this.teams.slice( 0, ind ),
                    updatedTeam,
                    ...this.teams.slice( ind + 1 )
                ]
            } catch ( error ) {
                //console.log( error );
                //this.$toast.error( error.response.data.message );
                alert('error');
            }
        } 
    },
    mounted() {
        getTeams()
                .then( response => {
                    this.status = LOADED;
                    this.teams = response;
                })
                .catch( error => {
                    this.status = ERROR;
                    this.error = error;
                    // console.log( error );
                });
        getAllUsers()
            .then( response => {
                this.users = response;
            })
            .catch( error => {
                console.log( error );
            });
    }
}

</script>

<style scoped>
#page-title{
  font-weight:650;
}
.card-text {
    font-weight:300;
}

.card {
    flex-basis: 100%; 
    max-height: 65vh;
}
.card:hover{
   box-shadow: 0px 0px 2px 2px rgb( 218, 165, 31, 0.8);
}
.d-flex {
    margin-bottom: 20px;
}
#usersList{
       background-color:rgb(208, 250, 253);
}
#users {
    height: 30px;
}

.btn-primary{
margin-top:0.5em;
}

#addTeammodal{
    align-content: center;
    background: transparent;
    color: black;
    *max-height: 70%;
    border: none;
    box-shadow: none;
}
#modal-center{
    max-height: 70%;
}
.addTeamCard{
    width: 18rem; 
    height: 100%; 
    cursor: pointer;
    height: 65vh;
    justify-content: center;
}
@media(max-width:800px){
.card-container{
    flex-direction: column;
    box-sizing:border-box;
    align-items:stretch;
    max-width: 90%;
    justify-content:center;
    margin-bottom: 0.5em; 
    flex-basis:30%;
}
select{
    width:55%;
}
.addTeamCard{
    min-height: 65vh;
    flex-wrap:nowrap;
}
}
</style>