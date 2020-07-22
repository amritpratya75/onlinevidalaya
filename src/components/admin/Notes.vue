<template>
  <div>
    <div class="video-head">
      <i class="fa fa-book"></i> Notes
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
      style="margin-left: 20px;margin-top: 25px;color: black;width: 20%;"
    >
      <span v-if="!isLoading.notesLoading">Search</span>
      <span v-if="isLoading.notesLoading">
         <i class="fa fa-refresh fa-spin"></i> Loading
      </span>
    </button>
    <span v-if="error.notesError" class="help-block">{{error.notesError}}</span>


    <div>
      <ul class="list-group" style="padding-left: 30px;margin-top: 60px;">
        <li class="video-items" v-for="(note, index) in notes.note" :key="index">
          {{note.topicName}}
          <button @click="removeNotes(index)" class="btn remove">Remove</button>
        </li>
      </ul>
    </div>

    <span v-if="notes.note === undefined" style="margin-left: 30px;" class="video-items">No Notes Found</span>

    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter Topic Name</label>
      <input @click="removeAddError" v-model="topicName" type="text" class="form-control" placeholder="Enter topic name" />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Upload Pdf</label>
      <input @click="removeAddError" type="file" accept="pdf/*" @change="chooseFile" />
    </div>
    <button
      @click="addNotes()"
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 10%;margin-bottom:30px"
    >
    <span v-if="!isLoading.addNotesLoading">Add</span>
      <span v-if="isLoading.addNotesLoading">
         <i class="fa fa-refresh fa-spin"></i> Loading
      </span></button>
    <span v-if="error.addNotesError" class="help-block">{{error.addNotesError}}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Notes",
  computed: {
    ...mapState(["notes",'isLoading','error'])
  },
  data() {
    return {
      std: "",
      subject: "",
      topicName: "",
      file: ""
    };
  },
  methods: {
    removeNotes(index) {
      this.$store.dispatch("removeNotes", {
        std: this.std,
        subject: this.subject,
        topicName: this.notes.note[index].topicName
      });
    },
    chooseFile(event) {
      this.file = event.target.files[0];
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
    addNotes() {
      this.$store.commit('setLoading',{
          addNotesLoading:true
        })
      this.$store.dispatch("addNotes", {
        std: this.std,
        subject: this.subject,
        topicName: this.topicName,
        file: this.file
      });
      this.topicName = "";
      this.file = "";
    },
     removeError() {
      this.$store.commit("setError", {
        notesError: ""
      });
    },
    removeAddError() {
      this.$store.commit("setError", {
        addNotesError: ""
      });
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