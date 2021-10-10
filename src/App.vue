<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from '@vue/reactivity'
import Streamerlist from './components/StreamerList.vue'

const user = ref('');
const streamers = ref([]);
const loading = ref(false);
const search = async () => {
  loading.value = true;
  await fetch(`https://whennext.mattschlosser.me/.netlify/functions/whennext?user=${user.value}`, {
    headers: {
      'X-Cache-Bucket': `${btoa(user.value)}`
    }
  }).then(res => res.json())
    .then(s => streamers.value = s).finally(e => loading.value = false);
}

</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <p class="info">
    Find your favourite Twitcher's next stream.<br/>
    Enter <b>your</b> username and we will automatically figure out the next stream
    from among the streamer's you follow.<br/>
    </p>
  <form @submit.prevent="search" :aria-disabled="disabled">
    <input class="input" v-model="user" type="text" :disabled="loading" placeholder="Your Username">
    <button class="input" type="submit" :disabled="loading">Get Schedule</button>
  </form>

  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <p v-if="loading">Loading... please wait</p>
  <Streamerlist v-else-if="streamers.length" :streamers="streamers" />
  <p v-else>Enter your username to get a schedule of all your followed Twticher's, all in one place! Easily find the next time any of your Twitch followed channels goes live!</p>

  <p>Another project by <a target="_blank" href='https://mattschlosser.me'>Matt Schlosser</a></p>
</template>

<style>
.input {
  padding: 1rem;
  font-size: 2rem;
  color: #000000c0;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
