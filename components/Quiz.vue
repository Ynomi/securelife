<template>
  <v-card class="my-16 pa-16">
    <v-layout>
      <p>{{ qNum + 1 }}問目</p>
      <v-spacer />
      <v-btn
        height="45"
        color="secondary"
        class="pa-1"
        x-small
        @click="stopQuiz()"
        >中止</v-btn
      >
    </v-layout>

    <Q :question="question" :question-num="qNum"></Q>

    <v-card-actions>
      <v-btn
        width="150"
        height="150"
        elevation="24"
        rounded
        outlined
        class="red--text mx-16"
        @click="correctAnswer('o')"
        >o</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        width="150"
        height="150"
        elevation="24"
        rounded
        outlined
        class="blue--text mx-16"
        @click="correctAnswer('x')"
        >x</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Q: () => import('~/components/Questions.vue'),
  },
  data() {
    return {
      question: {}, // 表示する問題
      qNum: 0, // 問題番号
      countCorrectAnswer: 0, // 正解数
      answerList: [], // 選択した解答リスト
    }
  },
  computed: {
    ...mapState('common', ['questionList']),
  },
  created() {
    this.showQuestion()
  },
  methods: {
    ...mapMutations('common', [
      'setCurrentDisplay',
      'setCountCorrectAnswer',
      'setAnswerList',
    ]),
    /**
     * 表示する問題を格納
     */
    showQuestion() {
      this.question = this.questionList[this.qNum]
    },
    /**
     * 正誤判定
     *
     * 正解：countCorrectAnswer（正解数）インクリメント
     * 不正解：なし
     * 共通：answerList（解答リスト）に選択した解答を格納
     *
     * @param {string} answer 選択した解答 {o, x}
     */
    correctAnswer(answer) {
      if (answer === this.question.a) this.countCorrectAnswer++

      this.answerList[this.qNum] = this.answer

      this.qNum++

      this.nextQuestion(this.qNum)
    },
    /**
     * 次の問題処理
     *
     * 次がない場合、正解数と解答リストを store に格納し Result 画面へ遷移する
     */
    nextQuestion(qNum) {
      if (this.questionList[qNum]) {
        this.showQuestion()
      } else {
        this.setCountCorrectAnswer(this.countCorrectAnswer)
        this.setAnswerList(this.answerList)
        this.setCurrentDisplay('result')
      }
    },
    /**
     * クイズの途中で終了する
     */
    stopQuiz() {
      this.setCurrentDisplay('result')
    },
  },
}
</script>
