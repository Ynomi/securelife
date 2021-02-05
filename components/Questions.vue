<template>
  <div>
    <h1>Question</h1>

    <p v-html="question.q"></p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['question', 'qNum'],
  methods: {
    ...mapMutations('common', ['setAnswerList']),
  },
}
</script>
