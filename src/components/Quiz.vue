<template>
  <div>
    <div class="video-head">
      <i class="fa fa-question-circle"></i> Quiz
    </div>
    <div style="padding-left: 20px;padding-top: 25px;">
      <label>Select Class:</label>
      <select @click="removeError" v-model="std" class="form-control" style="width: 90%;">
        <option disabled value>Please select one</option>
        <option>Class 1</option>
        <option>Class 2</option>
        <option>Class 3</option>
        <option>Class 4</option>
      </select>
    </div>
    <div style="padding-left: 20px;padding-top: 25px;">
      <label>Select Subject:</label>
      <select @click="removeError" v-model="subject" class="form-control" style="width: 90%;">
        <option disabled value>Please select one</option>
        <option>English</option>
        <option>Mathematics</option>
        <option>Physics</option>
        <option>Science</option>
        <option>Chesitry</option>
      </select>
    </div>
    <button
      @click="fetchQuiz"
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 20%;"
    >
    <span v-if="!isLoading.quizLoading">Search</span>
      <span v-if="isLoading.quizLoading">
        <i class="fa fa-refresh fa-spin"></i> Loading
      </span>
    </button>
    <span v-if="error.quizError" class="help-block">{{error.quizError}}</span>


    <div v-if="isLoading.showQuiz" class="quiz_container">
      <div v-for="(q,questIndex) in quiz.shuffleQuestions" :key="questIndex" class="items">
        <span class="question">Q{{questIndex+1}}.{{q.question}}</span>
        <ul class="list-group">
          <li
            v-for="(options,answerIndex) in q.shuffleAnswers"
            :key="answerIndex"
            @click.prevent="selectedAnswer(questIndex,answerIndex)"
            :class="answerClass(questIndex,answerIndex)"
            class="answer-group-item"
          >{{options}}</li>
        </ul>
      </div>

      <button @click="showResult()" class="btn btn-block submit_button">Submit</button>
      <span
        v-if="showScore"
        style="margin-left: 20px;display:inline-block;font-size: 16px;"
      >Your Score is {{score}}/{{quiz.shuffleQuestions.length}}.</span>
    </div>
    <div style="margin-top:60px">
    <span v-if="!isLoading.showQuiz" style="margin-left: 30px;" class="video-items">No Quiz Found</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Quiz",
  computed: {
    ...mapState(["quiz",'error','isLoading'])
  },
  data() {
    return {
      std: "",
      subject: "",
      selectedAnswers: {},
      showScore: false,
      score: 0
    };
  },
  methods: {
    removeError() {
      this.$store.commit("setError", {
        quizError: ""
      });
    },
    showResult() {
      this.score = 0;
      for (var i = 0; i < this.quiz.shuffleQuestions.length; i++) {
        var correct_answer = this.quiz.shuffleQuestions[i].correct_answer;
        var selected_answer = this.quiz.shuffleQuestions[i].shuffleAnswers[
          this.selectedAnswers[i]
        ];
        if (correct_answer === selected_answer) this.score++;
      }
      this.showScore = true;
      this.$store.dispatch("quizScore", {
        class: this.quiz.class,
        subject: this.quiz.subject,
        score: this.score + "/" + this.quiz.shuffleQuestions.length
      });
    },
    selectedAnswer(questIndex, answerIndex) {
      this.$set(this.selectedAnswers, questIndex, answerIndex);
    },
    fetchQuiz() {
      this.$store.commit('setLoading',{
        quizLoading:true
      })
      this.$store.dispatch("fetchQuiz", {
        class: this.std,
        subject: this.subject
      });
      this.selectedAnswers = {};
      this.showScore = false;
    },
    answerClass(questIndex, answerIndex) {
      if (this.selectedAnswers[questIndex] !== undefined) {
        if (this.selectedAnswers[questIndex] === answerIndex) {
          return "selected";
        }
      }
      return null;
    }
  },
  mounted() {
    if (this.quiz.subject !== undefined) {
      this.subject = this.quiz.subject;
      this.std = this.quiz.class;
    }
  }
};
</script>

<style scoped>
.selected {
  background-color: lightblue !important          ;
}
.quiz_container {
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 20px;
  width: 90%;
  margin-left: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.submit_button {
  margin-left: 20px;
  color: black;
  width: 20%;
  display: inline-block;
  background-color: rgb(165, 165, 231);
}
.question {
  font-size: 17px;
  padding: 15px 15px;
  font-weight: 600;
}
.answer-group-item {
  position: relative;
  border-radius: 8px;
  display: block;
  font-size: 15px;
  padding: 15px 15px;
  border: none;
  margin: 10px;
  background-color: rgb(160, 160, 160);
  cursor: pointer;
}
.answer-group-item:nth-child(1) {
  margin-top: 20px;
}
</style>