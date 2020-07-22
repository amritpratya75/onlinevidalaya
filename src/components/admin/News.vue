<template>
  <div>
    <div class="video-head">
      <i class="fa fa-newspaper-o"></i> News
    </div>
    <div>
      <ul
        v-if="news.news === undefined"
        class="list-group"
        style="padding-left: 30px;margin-top: 60px;"
      >
        <li class="video-items">No News Add Some</li>
      </ul>
      <ul class="list-group" style="padding-left: 30px;margin-top: 60px;">
        <li v-for="(news,index) in news.news" :key="index" class="video-items">
          <a
            @click="showFullNews(index)"
            class="video-link"
            data-toggle="modal"
            href="#myModal3"
          >{{news.newsHeading}}</a>
          <button @click="removeNews(index)" class="btn remove">
            Remove
            </button>
        </li>
      </ul>
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter News Heading</label>
      <input
        @click="removeError"
        v-model="addNewsHeading"
        type="text"
        class="form-control"
        placeholder="Enter news heading"
      />
    </div>
    <div class="form-group" style="padding-left: 20px;padding-top: 25px;width:70%">
      <label>Enter Full News</label>
      <textarea
        @click="removeError"
        v-model="addFullNews"
        class="form-control"
        style="height:100px"
        placeholder="Enter Full News"
      ></textarea>
    </div>
    <button
      @click="addNews()"
      class="btn btn-block"
      style="margin-left: 20px;margin-top: 25px;color: black;width: 10%;margin-bottom:30px"
    >
    <span v-if="!isLoading.addNewsLoading">Add</span>
      <span v-if="isLoading.addNewsLoading">
        <i class="fa fa-refresh fa-spin"></i> Loading
      </span>
    </button>
    <span v-if="error.addNewsError" class="help-block">{{error.addNewsError}}</span>

    <div class="modal fade" id="myModal3" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">News & Notification</h4>
          </div>
          <div class="modal-body">
            <div class="newsHeading">{{newsHeading}}</div>
            <p class="fullNews">{{fullNews}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "News",
  computed: {
    ...mapState(["news",'error','isLoading'])
  },
  data() {
    return {
      addFullNews: "",
      addNewsHeading: "",
      fullNews: "",
      newsHeading: ""
    };
  },
  methods: {
    showFullNews(index) {
      this.newsHeading = this.news.news[index].newsHeading;
      this.fullNews = this.news.news[index].fullNews;
    },
    removeNews(index) {
      this.$store.dispatch("removeNews", {
        newsHeading: this.news.news[index].newsHeading,
        fullNews: this.news.news[index].fullNews
      });
    },
    addNews() {
      this.$store.commit('setLoading',{
          addNewsLoading:true
        })
      this.$store.dispatch("addNews", {
        newsHeading: this.addNewsHeading,
        fullNews: this.addFullNews
      });
      this.addNewsHeading = "";
      this.addFullNews = "";
    },
    removeError() {
      this.$store.commit("setError", {
        addNewsError: ""
      });
    }
  },
  mounted() {
    this.$store.dispatch("fetchNews");
  }
};
</script>

<style scoped>
.help-block{
  color: rgb(248, 141, 141);
  margin:10px;
  margin-left:30px;

}
.newsHeading {
  color: #000;
  font-size: 18px;
  padding: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
}
.fullNews {
  color: #000;
  font-size: 16px;
  padding: 25px;
  padding-top: 20px;
}
.news {
  background-color: #3d6188;
  height: 90%;
  color: white;
  padding: 10px;
}
.video-items {
  width: 70%;
}
.remove {
  margin-left: 20px;
  color: white;
  width: 8%;
  background-color: rgb(131, 56, 56);
}
</style>