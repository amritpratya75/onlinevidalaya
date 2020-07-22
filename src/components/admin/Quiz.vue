<template>
  <div>
    <div class="video-head">
      <i class="fa fa-question-circle"></i> Quiz
    </div>
    <div style="padding-left: 20px;padding-top: 25px;">
      <label>Select Class:</label>
      <select @click="removeError" v-model="std" class="form-control" style="width: 90%;">
        <option disabled value="">Please select one</option>
        <option>Class 1</option>
        <option>Class 2</option>
        <option>Class 3</option>
        <option>Class 4</option>
      </select>
    </div>
    <div style="padding-left: 20px;padding-top: 25px;">
      <label>Select Subject:</label>
      <select @click="removeError" v-model="subject" class="form-control" style="width: 90%;">
        <option disabled value="">Please select one</option>
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
    
    <div class="panel-group" id="accordion">
      <div
        v-for="(q,questIndex) in quiz.shuffleQuestions"
        :key="questIndex"
        class="panel panel-default"
      >
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              :href="'#collapse'+questIndex"
            >Q{{questIndex+1}}.{{q.question}}</a>
          </h4>
        </div>
        <div :id="'collapse'+questIndex" class="panel-collapse collapse in">
          <div class="panel-body">
            <span style="font-weight:600;font-size:15px">Correct Answer :-</span>
            {{q.correct_answer}}
            <br />
            <span style="font-weight:600;font-size:15px">Incorrect Answer :-</span>
            <span v-for="(option,index) in q.incorrect_answer" :key="index">{{option}} ,</span>
            <br />
            <button @click="removeQuiz(questIndex)" class="btn remove">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter Question</label>
      <input @click="removeAddError" v-model="question" type="text" class="form-control" placeholder="Enter question" />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter Correct Answer</label>
      <input
        v-model="correct_answer"
        @click="removeAddError"
        type="text"
        class="form-control"
        placeholder="Enter correct answer"
      />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 10px;width:70%">
      <label>Enter Incorrect Answer</label>
      <input
        v-model="incorrect_answer.option1"
        @click="removeAddError"
        type="text"
        class="form-control"
        placeholder="Enter incorrect answer 1"
      />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 10px;width:70%">
      <input
        v-model="incorrect_answer.option2"
        @click="removeAddError"
        type="text"
        class="form-control"
        placeholder="Enter incorrect answer 2"
      />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 10px;width:70%">
      <input
        v-model="incorrect_answer.option3"
        @click="removeAddError"
        type="text"
        class="form-control"
        placeholder="Enter ncorrect answer 3"
      />
    </div>
    <button
      @click="addQuiz()"
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 10%;margin-bottom:30px"
    >
     <span v-if="!isLoading.quizAddLoading">Add</span>
      <span v-if="isLoading.quizAddLoading">
         <i class="fa fa-refresh fa-spin"></i> Loading
      </span>
    </button>
    <span v-if="error.quizAddError" class="help-block">{{error.quizAddError}}</span>
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
      question: "",
      correct_answer: "",
      incorrect_answer: {
        option1: "",
        option2: "",
        option3: ""
      }
    };
  },
  methods: {
    removeQuiz(questIndex) {
      this.$store.dispatch("removeQuiz", {
        std: this.std,
        subject: this.subject,
        question: this.quiz.shuffleQuestions[questIndex].question,
        correct_answer: this.quiz.shuffleQuestions[questIndex].correct_answer,
        incorrect_answer: this.quiz.shuffleQuestions[questIndex]
          .incorrect_answer
      });
    },
    addQuiz() {
      this.$store.commit('setLoading',{
        quizAddLoading:true
      })
      this.$store.dispatch("addQuiz", {
        std: this.std,
        subject: this.subject,
        question: this.question,
        correct_answer: this.correct_answer,
        incorrect_answer: this.incorrect_answer
      });
      this.question = "";
      this.correct_answer = "";
      this.incorrect_answer.option1 = "";
      this.incorrect_answer.option2 = "";
      this.incorrect_answer.option3 = "";
    },
    fetchQuiz() {
      this.$store.commit('setLoading',{
        quizLoading:true
      })
      this.$store.dispatch("fetchQuiz", {
        class: this.std,
        subject: this.subject
      });
    },
    removeError() {
      this.$store.commit("setError", {
        quizError: ""
      });
    },
    removeAddError(){
      this.$store.commit('setError',{
        quizAddError:''
      })
    }
  }
};
</script>

<style>
.video-items:hover {
  color: black;
}
.remove {
  margin-top: 10px;
  color: white;
  width: 8%;
  background-color: rgb(131, 56, 56);
}
.panel-group {
  width: 70%;
  margin: 20px;
  color: #000;
}
.help-block{
  color: rgb(248, 141, 141);
  margin:10px;
  margin-left:30px;

}
</style>