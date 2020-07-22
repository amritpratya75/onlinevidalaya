<template>
  <div>
    <div class="video-head">
      <i class="fa fa-video-camera"></i> Video Lectures
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
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 20%;"
      @click="fetchVideos"
    >
      <span v-if="!isLoading.videoLoading">Search</span>
      <span v-if="isLoading.videoLoading">
        <i class="fa fa-refresh fa-spin"></i> Loading
      </span>
    </button>
    <span v-if="error.videoError" class="help-block">{{error.videoError}}</span>
    <div>
      <ul class="list-group" style="padding-left: 30px;margin-top: 60px;">
        <li v-for="(video, index) in videos.video" class="video-items" v-bind:key="index">
          {{video.topicName}}
          <button @click="removeVideo(index)" class="btn remove">Remove</button>
        </li>
      </ul>
    </div>
    <span v-if="videos.video === undefined" style="margin-left: 30px;" class="video-items">No Videos Found</span>

    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter Topic Name</label>
      <input @click="removeAddError" v-model="topicName" type="text" class="form-control" placeholder="Enter topic name" />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter Video Link</label>
      <input @click="removeAddError" v-model="videoLink" type="text" class="form-control" placeholder="Enter video link" />
    </div>
    <button
      @click="addVideo()"
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 10%;margin-bottom:30px"
    >
    <span v-if="!isLoading.addVideoLoading">Add</span>
      <span v-if="isLoading.addVideoLoading">
        <i class="fa fa-refresh fa-spin"></i> Loading
      </span></button>
    <span v-if="error.addVideoError" class="help-block">{{error.addVideoError}}</span>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VideoLect",
  computed: {
    ...mapState(["videos",'error','isLoading'])
  },
  data() {
    return {
      std: "",
      subject: "",
      topicName: "",
      videoLink: ""
    };
  },
  methods: {
    removeVideo(index) {
      this.$store.dispatch("removeVideo", {
        std: this.std,
        subject: this.subject,
        topicName: this.videos.video[index].topicName,
        videoLink: this.videos.video[index].videoLink
      });
    },
    fetchVideos() {
      this.$store.commit('setLoading',{
          videoLoading:true
        })
      this.$store.dispatch("fetchVideos", {
        class: this.std,
        subject: this.subject
      });
    },
    addVideo() {
      this.$store.commit('setLoading',{
          addVideoLoading:true
        })
      this.$store.dispatch("addVideo", {
        std: this.std,
        subject: this.subject,
        topicName: this.topicName,
        videoLink: this.videoLink
      });
    },
    removeError() {
      this.$store.commit("setError", {
        videoError: ""
      });
    },
    removeAddError(){
      this.$store.commit("setError", {
        addVideoError: ""
      });
    }
  },
  mounted() {
    if (this.videos.subject !== undefined) {
      this.subject = this.videos.subject;
      this.std = this.videos.class;
    }
  }
};
</script>

<style scoped>
.video-items:hover {
  color: black;
}
.remove {
  margin-left: 20px;
  color: white;
  width: 8%;
  background-color: rgb(131, 56, 56);
}
.help-block{
  color: rgb(248, 141, 141);
  margin:10px;
  margin-left:30px;

}
</style>