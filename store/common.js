// state: state の管理
export const state = () => ({
  currentDisplay: '', // 現在表示している画面情報
  settingInformation: {}, // settings.json の内容
  questionList: [], // 問題リスト
  answerList: [], // 解答リスト
  countCorrectAnswer: 0, // 正解数
})

// getters
export const getters = {}

// mutations: state の変更
export const mutations = {
  setCurrentDisplay(state, value) {
    state.currentDisplay = value
  },
  setSettingInformation(state, value) {
    state.settingInformation = value
  },
  setQuestionList(state, value) {
    state.questionList = value
  },
  setAnswerList(state, value) {
    state.answerList = value
  },
  setCountCorrectAnswer(state, value) {
    state.countCorrectAnswer = value
  },
}
