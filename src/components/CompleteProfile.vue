<template>
  <div>
    <div class="video-head"><i class="fa fa-book"></i> Profile</div>
    <div class="left">
      <div
        class="form-group"
        style="margin-left: 40px; padding-top: 25px; width: 50%"
      >
        <label>Name</label>
        <input
          @click="removeError"
          v-model="profile.name"
          type="text"
          class="form-control"
        />
        <br />
        <label>Email</label>
        <input
          @click="removeError"
          type="text"
          class="form-control"
          :value="profile.email"
          disabled
        />
        <br />
        <label>Phone No.</label>
        <input
          @click="removeError"
          type="text"
          v-model="profile.contact"
          class="form-control"
        />
        <br />
      </div>
      <div
        v-if="!userProfile.class"
        style="
          padding: 20px;
          width: 60%;
          font-size: 18px;
          border-bottom: 1px solid white;
          font-weight: 600;
        "
      >
        Add Your Class
      </div>
      <div style="margin-left: 40px; padding-top: 25px">
        <label>Enter Your Class:</label>
        <select
          @click="removeError"
          v-model="profile.class"
          class="form-control"
          style="width: 50%"
        >
          <option disabled value>Please select one</option>
          <option>Class 4</option>
          <option>Class 5</option>
          <option>Class 6</option>
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
        </select>
      </div>
      <button
        v-if="!userProfile.class"
        @click="completeProfile()"
        class="btn btn-block"
        style="margin-left: 40px; margin-top: 25px; color: black; width: 10%"
      >
        <span v-if="!isLoading.addClassLoading">Add Class</span>
        <span v-if="isLoading.addClassLoading">
          <i class="fa fa-refresh fa-spin"></i> Loading
        </span>
      </button>
      <button
        v-if="userProfile.class"
        @click="editProfile()"
        class="btn btn-block"
        style="
          margin-bottom: 20px;
          margin-left: 40px;
          margin-top: 25px;
          color: black;
          width: 20%;
        "
      >
        <span v-if="!isLoading.editProfileLoading">Edit Profile</span>
        <span v-if="isLoading.editProfileLoading">
          <i class="fa fa-refresh fa-spin"></i> Loading
        </span>
      </button>
      <span v-if="error.profileError" class="help-block">{{
        error.profileError
      }}</span>
      <span style="margin-left: 40px">
        <strong>Note:-</strong> To change Profile Picture click on it.
      </span>
    </div>
    <div class="right">
      <Graph></Graph>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Graph from "./Graph";
export default {
  name: "CompleteProfile",
  components: {
    Graph,
  },
  computed: {
    ...mapState(["user", "userProfile", "error", "isLoading"]),
  },
  data() {
    return {
      profile: {
        name: "",
        email: "",
        contact: "",
        class: "",
      },
    };
  },
  methods: {
    editProfile() {
      this.$store.commit("setLoading", {
        editProfileLoading: true,
      });
      this.$store.dispatch("editProfile", {
        name: this.profile.name,
        contact: this.profile.contact,
        class: this.profile.class,
      });
    },
    completeProfile() {
      this.$store.commit("setLoading", {
        addClassLoading: true,
      });
      this.$store.dispatch("completeProfile", {
        class: this.profile.class,
      });
    },
    removeError() {
      this.$store.commit("setError", {
        profileError: "",
      });
    },
  },
  mounted() {
    this.profile.name = this.userProfile.name;
    this.profile.email = this.user.email;
    this.profile.contact = this.userProfile.contact;
    if (this.userProfile.class !== undefined)
      this.profile.class = this.userProfile.class;
  },
};
</script>

<style scoped>
.help-block {
  color: red;
  margin: 10px;
  margin-left: 40px;
}
.left {
  float: left;
  width: 40%;
}
.right {
  float: right;
  padding: 20px;
}
</style>