<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <button @click="showQuiz()">GoToQuiz</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      title: 'SecureLife',
    }
  },
  computed: {
    ...mapState('common', ['questionList']),
  },
  methods: {
    ...mapMutations('common', ['setCurrentDisplay', 'setQuestionList']),
    /**
     * クイズコンポーネントを表示する
     *
     * 現在はSample
     * 問題のジャンル等を導入する場合、手前に処理を挟む
     */
    showQuiz() {
      axios
        .get('./question/sample.json')
        .then((response) => {
          this.shuffleQuestion(response.data.questionList)
          this.setCurrentDisplay('quiz')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 取得した問題をシャッフルして store に格納する
    shuffleQuestion(questionList) {
      for (let i = questionList.length - 1; i >= 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        // 配列を入れ替える
        ;[questionList[i], questionList[r]] = [questionList[r], questionList[i]]
      }
      // 問題をVuexに格納する
      this.setQuestionList(questionList)
    },
  },
}
</script>
