<template>

<div class="p-grid p-fluid">  
  <div class="p-col-12">
    
    <div class="card card-w-title">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld :msg="hiMsg"/>
    </div>
  </div>
</div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      hiMsg: 'Welcome to Your Vue.js App',
    }
  },
  name: 'Welcome',  
  components: {
    HelloWorld
  }
}
</script>
