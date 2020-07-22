<template>
  <div class="container-fluid text-center">
    <div class="row content">
      <div class="col-sm-2 sidenav-left" id="myHeader">
        <input
          style="display: none"
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="chooseFile"
        />
        <div v-if="isLoading.userPicLoading" class="loader"></div>
        <div v-if="!isLoading.userPicLoading" class="imgProfile">
          <a @click="$refs.fileInput.click()">
            <img v-if="userPic" style="width:100%;height:100%;border-radius:25%" :src="userPic" />
          </a>
        </div>
        <p></p>
        <h4>{{userProfile.name}}</h4>
        <p>
          <button class="btn uploadBtn" v-if="file" @click="uploadPic()">Change</button>
          <button
            class="btn uploadBtn"
            v-if="file"
            @click="resetFile()"
            style="margin-left:10px"
          >Cancel</button>
        </p>
        <div class="left-info">
          <span style="font-size: 14px;font-weight: 600;">Phone:</span>
          {{userProfile.contact}}
          <br />
          <span style="font-size: 14px;font-weight: 600;">Class:</span>
          {{ userProfile.class ? userProfile.class : 'N/A' }}
        </div>
        <div class="left-info left-link">
          <ul class="list-group">
            <li class="list-group-item" @click="home()">
              <i class="fa fa-home">Home</i>
            </li>
            <li class="list-group-item" @click="prof()">
              <i class="fa fa-user">Profile</i>
            </li>
            <li class="list-group-item" @click="videoLec()">
              <i class="fa fa-video-camera">Video Lectures</i>
            </li>
            <li class="list-group-item" @click="not()">
              <i class="fa fa-book">Notes</i>
            </li>
            <li class="list-group-item" @click="quizFunc()">
              <i class="fa fa-question-circle">Quiz</i>
            </li>
          </ul>
        </div>
      </div>

      <!-- right important -->
      <div class="col-sm-9 right-side text-left">
        <DashShow v-if="showdoc" v-bind:index="index"></DashShow>
        <DashStart
          v-if="homeX"
          v-on:showMaterial="openLink($event)"
          v-on:showWatchedNotes="openNotesShow($event)"
        ></DashStart>
        <CompleteProfile v-if="profile"></CompleteProfile>
        <DashLink v-if="video" v-on:showMaterial="openLink($event)"></DashLink>
        <NotesLink v-if="notes" v-on:showMaterial="openNotesShow($event)"></NotesLink>
        <NotesShow v-if="showNotes" v-bind:notesIndex="notesIndex"></NotesShow>
        <Quiz v-if="quiz"></Quiz>
      </div>
    </div>
  </div>
</template>

<script>
import DashLink from "@/components/DashLink.vue";
import CompleteProfile from "@/components/CompleteProfile.vue";
import DashStart from "@/components/DashStart.vue";
import DashShow from "@/components/DashShow.vue";
import NotesLink from "@/components/NotesLink.vue";
import NotesShow from "@/components/NotesShow.vue";
import Quiz from "@/components/Quiz.vue";

import { mapState } from "vuex";

export default {
  components: {
    DashLink,
    CompleteProfile,
    DashStart,
    DashShow,
    NotesLink,
    NotesShow,
    Quiz
  },
  computed: {
    ...mapState(["user", "userProfile", "userPic", "isLoading", "error"])
  },
  data() {
    return {
      file: "",
      index: "",
      notesIndex: "",
      showNotes: false,
      homeX: true,
      profile: false,
      video: false,
      notes: false,
      link: false,
      showdoc: false,
      quiz: false
    };
  },
  methods: {
    resetFile() {
      this.file = "";
    },
    uploadPic() {
      this.$store.commit("setLoading", {
        userPicLoading: true
      });
      this.$store.dispatch("uploadProfileImage", {
        file: this.file
      });
      this.file = "";
    },
    chooseFile(event) {
      this.file = event.target.files[0];
    },
    home: function() {
      this.$store.dispatch("updateVideos", true);
      this.$store.dispatch("updateNotes", true);
      this.homeX = true;
      this.profile = false;
      this.notes = false;
      this.video = false;
      this.showdoc = false;
      this.quiz = false;
      this.showNotes = false;
    },
    prof: function() {
      this.homeX = false;
      this.quiz = false;
      this.profile = true;
      this.notes = false;
      this.video = false;
      this.showdoc = false;
      this.showNotes = false;
    },
    videoLec: function() {
      this.$store.dispatch("updateVideos", false);
      this.homeX = false;
      this.quiz = false;
      this.profile = false;
      this.notes = false;
      this.video = true;
      this.link = true;
      this.showNotes = false;
      this.showdoc = false;
    },
    not: function() {
      this.$store.dispatch("updateNotes", false);
      this.homeX = false;
      this.quiz = false;
      this.profile = false;
      this.video = false;
      this.notes = true;
      this.link = false;
      this.showdoc = false;
      this.showNotes = false;
    },
    quizFunc: function() {
      this.homeX = false;
      this.quiz = true;
      this.profile = false;
      this.video = false;
      this.notes = false;
      this.link = false;
      this.showdoc = false;
      this.showNotes = false;
    },
    openLink: function(index) {
      this.index = index;
      this.homeX = false;
      this.quiz = false;
      this.profile = false;
      this.notes = false;
      this.video = false;
      this.showdoc = true;
      this.showNotes = false;
    },
    openNotesShow: function(index) {
      this.notesIndex = index;
      this.homeX = false;
      this.quiz = false;
      this.profile = false;
      this.notes = false;
      this.video = false;
      this.showdoc = false;
      this.showNotes = true;
    }
  },
  mounted() {
    var elem = document.getElementsByClassName("modal-backdrop");
    while (elem.length > 0) {
      elem[0].parentNode.removeChild(elem[0]);
    }
    window.onscroll = function() {
      myFunction();
    };
    this.$store.dispatch("updateVideos", true);
    this.$store.dispatch("updateNotes", true);
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }
};
</script>

<style scoped>
.imgProfile {
  width: 120px;
  height: 120px;
  background-color: #ccc;
  border: 1px solid black;
  border-radius: 25%;
  margin: 0 auto;
}
.loader {
  margin-top: 30px;
  margin-left: 110px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
