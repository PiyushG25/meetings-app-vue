<template>
  <div id="app">
    <Navbar />
    <div class="container my-3">
      <!--placeholder for Router to show the matching component-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
export default {
  name: 'App',
 
  components: {
   Navbar
  }
 
}
</script>

<style scoped>
</style>
