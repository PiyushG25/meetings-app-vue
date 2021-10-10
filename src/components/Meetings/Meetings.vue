<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 clearfix">
                    <div class="clearfix">
                        <h1>Meetings</h1>
                        <hr> 
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 clearfix">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                    <router-link :to="{ name: 'FilterMeeting' }" class = "mr-3 nav-link" active-class="active" exact>
                        Filter / Search Meeting
                    </router-link></li>
                  <li class="nav-item">
                    <router-link :to="{ name: 'AddMeeting' }" class="nav-link" active-class="active" exact >
                        Add Meeting
                    </router-link></li></ul>
                </div>
            </div>
        </div>
                <router-view></router-view>
            
        </div>
</template>

<script>
export default {
    components: {
    }
}
</script>
<style scoped>
.container {
    margin-bottom: 20px;
}
</style>
