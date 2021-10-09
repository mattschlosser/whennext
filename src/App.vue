<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from '@vue/reactivity'
import HelloWorld from './components/HelloWorld.vue'
import Streamerlist from './components/StreamerList.vue'

const user = ref('');
const streamers = ref([]);
const loading = ref(false);
const search = async () => {
  loading.value = true;
  await new Promise(res => setTimeout(res, 2000));
  loading.value = false;
  // streamers.value = [{"streamer":"freckledscience","next_stream":
  // {"id":"eyJzZWdtZW50SUQiOiJjMGRlYTI2Yy02NTAyLTRiYWYtODVmNC1kYTg1NmVhZDg2YWIiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MH0=",
  // "start_time":"2021-10-09T22:00:00Z","end_time":"2021-10-10T03:00:00Z","title":"Freckledscience !!",
  // "canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},
  // {"streamer":"ChaelCodes","next_stream":{"id":"eyJzZWdtZW50SUQiOiI5ODNmMzI0NC1jYzBlLTRhODMtYjEyYS1jMmMyYzIxYzJmOWMiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MH0=",
  // "start_time":"2021-10-10T15:00:00Z","end_time":"2021-10-10T20:00:00Z","title":"Open-Source Sunday - Rails ConfBuddies","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"csharpfritz","next_stream":{"id":"eyJzZWdtZW50SUQiOiI3ODdhYmU0OC00ZjdhLTQxY2QtODRiMi04NmNmYTUxNzlmZWYiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MH0=","start_time":"2021-10-10T19:00:00Z","end_time":"2021-10-10T21:00:00Z","title":"Blazor and .NET development","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"KevinPowellCSS","next_stream":{"id":"eyJzZWdtZW50SUQiOiI3MmZiOWE1Mi01ZjM3LTRkZWMtYjcxOS0wZDNhMDY4ZTA5NjYiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-11T13:30:00Z","end_time":"2021-10-11T15:30:00Z","title":"Having fun with CSS","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"Cdubya719","next_stream":{"id":"eyJzZWdtZW50SUQiOiI5ZWVmYWFiMy1iOTFiLTRiMDUtOGUwOS1iMTU2ZmUwODkxNDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-11T15:00:00Z","end_time":"2021-10-11T21:00:00Z","title":"games Games GAMES!","canceled_until":null,"category":{"id":"66082","name":"Games + Demos"},"is_recurring":true}},{"streamer":"AishaCodes","next_stream":{"id":"eyJzZWdtZW50SUQiOiJiNTQ5OThmOS05NTg3LTRiNjItYWQxNy1lYzNjODA4ZmUxNDciLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-11T16:00:00Z","end_time":"2021-10-11T18:00:00Z","title":"Language Learning","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"hellomayuko","next_stream":{"id":"eyJzZWdtZW50SUQiOiI3YzI4ZmYyZS0yNzJlLTQ5NWItOTEyMC00M2ZjMTcyZTNkZDkiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-11T16:30:00Z","end_time":"2021-10-11T19:00:00Z","title":"Muko's Cafe: Co-work/Co-study session with chill vibes!","canceled_until":null,"category":{"id":"509658","name":"Just Chatting"},"is_recurring":true}},{"streamer":"endingwithali","next_stream":{"id":"eyJzZWdtZW50SUQiOiIyZWE1NzI4Ny04YTdlLTQ3ZWYtOGJhMi01ZjAzODY3NjA1YjYiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-11T19:00:00Z","end_time":"2021-10-11T23:00:00Z","title":"💀 Tooling on projects 💀","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"BaldBeardedBuilder","next_stream":{"id":"eyJzZWdtZW50SUQiOiI3ZjQ5MTQ2NS00NWJiLTRmNzYtYjIwMC1kNTMzNDQ3ODRlMWYiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-12T18:00:00Z","end_time":"2021-10-12T21:00:00Z","title":"","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"Fimion","next_stream":{"id":"eyJzZWdtZW50SUQiOiJiZTk4YmM2MS1iOGE5LTRmMDUtODQ0Ni0yZmZkMmJmMzkxZGQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-12T21:00:00Z","end_time":"2021-10-12T22:00:00Z","title":"Programming and things!","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"LearnWithLeon","next_stream":{"id":"eyJzZWdtZW50SUQiOiI0Njg1NWUxYy00MTYxLTQ5Y2EtYWY2NS02ZWI4Y2U4Nzc2ZDkiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-12T22:30:00Z","end_time":"2021-10-13T01:30:00Z","title":"Free Web Development Bootcamp!","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"Instafluff","next_stream":{"id":"eyJzZWdtZW50SUQiOiI3MTgzMDIxYy1kMDljLTRjMjItOWNhZC05ZWIyYmY4ZTdkZmMiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-13T16:00:00Z","end_time":"2021-10-13T21:00:00Z","title":"🐹 Comfy Corner with Instafluff!","canceled_until":null,"category":{"id":"509658","name":"Just Chatting"},"is_recurring":true}},{"streamer":"stuck_overflow","next_stream":{"id":"eyJzZWdtZW50SUQiOiI3MTM3YjliYi0wNjNjLTQ1NzMtOGE3OC1jZGQ2MGNmMThiN2EiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-14T19:00:00Z","end_time":"2021-10-14T23:00:00Z","title":"","canceled_until":null,"category":null,"is_recurring":true}},{"streamer":"cassidoo","next_stream":{"id":"eyJzZWdtZW50SUQiOiI1NzgxOWVjYS05N2I2LTQwNTYtODU3Yi04NTE3MzBiOGVjZWYiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-14T19:30:00Z","end_time":"2021-10-14T21:30:00Z","title":"Coding and Chatting!","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}},{"streamer":"CodingGarden","next_stream":{"id":"eyJzZWdtZW50SUQiOiJlYzhjZWViYi05ZjdiLTQ0YzgtOGU1OS0xN2I4NTI0ZGMyNGEiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=","start_time":"2021-10-15T17:30:00Z","end_time":"2021-10-15T21:30:00Z","title":"CODE","canceled_until":null,"category":{"id":"509670","name":"Science & Technology"},"is_recurring":true}}]
  // loading.value = true;
  await fetch(`https://whennext.mattschlosser.me/.netlify/functions/whennext?user=${user.value}`).then(res => res.json())
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
  <p v-else>Search for your favourite streamer's stream above</p>

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
