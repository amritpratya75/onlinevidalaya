<template>
  <div>
    <graph-line
      :width="700"
      :height="500"
      :shape="'normal'"
      :axis-min="0"
      :axis-max="100"
      :axis-step="20"
      :axis-full-mode="true"
      :labels="getDateAndDurationArray.date"
      :values="getDateAndDurationArray.duration"
    >
      <note :text="'Login Duration'"></note>
      <guideline :tooltip-y="true"></guideline>
    </graph-line>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Graph",
  computed: {
    ...mapState(["userProfile"]),
    getDateAndDurationArray() {
      if (this.userProfile.loginDuration.length) {
        var date = [];
        var duration = []; //[{date:"23Nov",duration:10},{}]
        for (var i = 0; i < this.userProfile.loginDuration.length; i++) {
          date.push(this.userProfile.loginDuration[i].date);
          duration.push(this.userProfile.loginDuration[i].duration);
        }
      }
      return { date, duration };
    },
  },
};
</script>

<style>
</style>