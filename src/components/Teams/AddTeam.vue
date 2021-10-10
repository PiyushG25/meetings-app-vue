<template>
    <div>
        <div class="container">
            <form @submit.prevent="addTeam">
                <div class="form-group">
                    <h5>Team Name</h5>
                    <input 
											type="text" 
											class="form-control" 
											id="team-name"  
											placeholder="Team Name" 
											v-model="name" 
											required
										>
                </div>
                <div class="form-group">
                    <h5>Team Short Name</h5>
                    <small class="form-text text-muted">Short should start with @ and - seperates the words </small>
                    <input 
											type="text" 
											class="form-control" 
											id="team-short-name" 
											placeholder=" @short-name" 
											v-model="shortName" 
											required
										>
                </div>
                <h5>Description</h5>
                <div class="input-group">
                    <textarea name="team-description" placeholder="Description" 
											id="team-description" class="form-control" aria-label="With textarea" 
											v-model="description" required></textarea>
                </div>
                <div>
                    <h5>Add Members</h5>
                    <multiselect v-model="members" tag-placeholder="Add this a new tag" 
											placeholder="Search for a team member" label="email" 
											track-by="email" :options="options" 
											:multiple="true" :taggable="true">
										</multiselect>
                </div>
                <button type="submit" class="btn btn-light">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import { addTeam } from '@/services/teams';
import Multiselect from 'vue-multiselect';

export default {
    components: {
        Multiselect
    },
    props: ["users"],
    data() {
        return {
            options: [],
            name: '',
            shortName: '',
            description: '',
            members: []
        }
    },
    methods: {
        async addTeam() {
            const requestBody = {
                name: this.name,
                shortName: this.shortName,
                description: this.description,
                members: this.members.map( member => member.email )
            }
            
            try {
                const response = await addTeam( requestBody );
                alert( `Created Team` );
                this.$emit('submit-team', response);
                
            } catch ( error ) {
                    this.name = '';
                    this.shortName = '';
                    this.description = '';
                    this.members = []
                    alert( error.response.data.message );
            }
        }
    },
    mounted() {
        this.options = this.users;
    }
}
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
#team-description {
    margin-bottom: 20px;
}

#option {
    background-color: gray;
}

.btn-light {
    height: 30px;
    margin-top: 20px;
    padding-top: 3px;
    background-color:rgb(6, 134, 146);
    color: white;
    font-weight: bold;
    border: none;
}

#users {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    padding-left: 5px;
    background-color: white;
    border-radius: 4px;
    border-color: lightgray;
}
</style>