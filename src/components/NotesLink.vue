<template>
  <div>
    <div class="video-head">
      <i class="fa fa-video-camera"></i> Notes
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
      @click="fetchNotes"
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 20%;">
      <span v-if="!isLoading.notesLoading">Search</span>
      <span v-if="isLoading.notesLoading">
        <i class="fa fa-refresh fa-spin"></i> Loading
      </span>
    </button>
    <span v-if="error.notesError" class="help-block">{{error.notesError}}</span>
    <div>
      <ul class="list-group" style="padding-left: 30px;margin-top: 60px;">
        <li class="video-items" v-for="(note, index) in notes.note" :key="index">
          <a class="video-link" @click="showMaterial(index)">{{note.topicName}}</a>
        </li>
      </ul>
    </div>
    <span v-if="notes.note === undefined" style="margin-left: 30px;" class="video-items">No Notes Found</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NotesLink",
  computed: {
    ...mapState(["notes",'error','isLoading'])
  },
  data() {
    return {
      std: "",
      subject: ""
    };
  },
  methods: {
    showMaterial: function(index) {
      this.$emit("showMaterial", index);
      this.$store.dispatch("fetchNotesLink", {
        topicName: this.notes.note[index].topicName,
        class: this.std,
        subject: this.subject
      });
      this.$store.dispatch("watchedNotes", {
        topicName: this.notes.note[index].topicName,
        class: this.std,
        subject: this.subject
      });
    },
    fetchNotes() {
      this.$store.commit('setLoading',{
          notesLoading:true
        })
      this.$store.dispatch("fetchNotes", {
        class: this.std,
        subject: this.subject
      });
    },
    removeError() {
      this.$store.commit("setError", {
        notesError: ""
      });
    }
  },
  mounted() {
    if (this.notes.subject !== undefined) {
      this.subject = this.notes.subject;
      this.std = this.notes.class;
    }
  }
};
</script>

<style>
</style>