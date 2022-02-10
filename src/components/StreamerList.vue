<script setup>

defineProps({
  streamers: Array
})
const w = window
</script>

<template>
    <ul class="list">
        <li class="list-item" v-for="(streamer, i) in streamers" :key="streamer.streamer">
            <a :href="`https://twitch.tv/${streamer.streamer}`" target="_blank" rel="noreferrer"> 
                <p class="title">{{streamer.streamer}}</p>
                <p>{{new Date(streamer.next_stream.start_time).toLocaleString(w.navigator.language, {
                    dateStyle: "full", timeStyle: "short"})}} - {{streamer.next_stream.title || "Untitled"}}
                </p>
            </a>
        </li>
    </ul>
</template>

<style scoped>
.list {
    max-width: 800px;
    padding-inline-start: 0;
    margin: 0 auto;
}
.list-item {
    padding: 1rem;
    margin: 2.1rem;
    box-sizing: border-box;
    border: 2px solid white;
    border-radius: 2em/6em;
    box-shadow: 0 8px 24px #00000033;
    list-style: none;
    text-align: left;
    transition: all 2000ms cubic-bezier(0.075, 0.82, 0.165, 1);
}
.list-item:hover {
    background-color: #00000033;
}
.title {
    font-size: 2rem;
    line-height: 0rem;
}
</style>