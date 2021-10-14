<template>
  <div>
    <button @click="onClick">click</button>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, reactive, useContext } from 'vue'

defineProps({
  msg: String
})

defineEmit(["next"])

const context = useContext()
function onClick() {
  context.parent.emit("next", "hello world")
}

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>