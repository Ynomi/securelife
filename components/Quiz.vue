<template>
  <div>
    <h1>OX_Quiz</h1>

    <button @click="stopQuiz()">中止</button><br />
    <p>{{ qNum + 1 }}問目</p>

    <Q :question="question" :question-num="qNum"></Q>

    <button @click="correctAnswer('o')">o</button><br />
    <button @click="correctAnswer('x')">x</button>
  </div>
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
      answerList: [], // 洗濯した解答リスト
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
      if (answer === this.question.a) {
        this.countCorrectAnswer++
      }
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
