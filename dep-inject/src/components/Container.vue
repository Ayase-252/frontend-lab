<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance, reactive, useContext } from 'vue'

defineProps({
  msg: String
})

const instance = getCurrentInstance()
console.log(instance)


const result = []
function appendResult(e) {
  console(e)
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>