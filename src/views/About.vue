<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="">
      <Calendar placeholder="Popup" v-model="date" :showIcon="true"  />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      date: null,
    }
  }
}
</script>