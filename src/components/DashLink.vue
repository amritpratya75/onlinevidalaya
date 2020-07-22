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
          <a class="video-link" @click="showMaterial(index)">{{video.topicName}}</a>
        </li>
      </ul>
    </div>
    <span v-if="videos.video === undefined" style="margin-left: 30px;" class="video-items">No Videos Found</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DashLink",
  computed: {
    ...mapState(["videos", "error", "isLoading"])
  },
  data() {
    return {
      show: "",
      std: "",
      subject: ""
    };
  },
  methods: {
    showMaterial: function(index) {
      this.$emit("showMaterial", index);
      this.$store.dispatch("watchedVideos", {
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
    removeError() {
      this.$store.commit("setError", {
        videoError: ""
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

<style>
.help-block{
  color: rgb(248, 141, 141);
  margin:10px;
  margin-left:30px;

}
</style>