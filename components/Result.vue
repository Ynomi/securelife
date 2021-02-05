<template>
  <div>
    <h1>Result Screen</h1>

    <button @click="showTop()">Top</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('common', ['setCurrentDisplay']),
    // クイズの途中で終了する
    showTop() {
      this.setCurrentDisplay('top')
    },
  },
}
</script>
>
