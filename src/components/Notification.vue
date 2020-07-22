<template>
    <div style="float: right;width: 30%;height: 500px;box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);margin: 5px;">
        <div class="navbar nav-head heading">
            <h4><span style="margin-left: 20px;"></span>News & Notification</h4>
        </div>
        <div class="news">
            <ul v-if="news.news === undefined" class="list-group">
                <li class="video-link">No News Till Now</li>
            </ul>
        <marquee height="90%" direction="up" onmouseover="this.stop()" onmouseout="this.start()">
                <ul class="list-group">
                    <li 
                    v-for="(news,index) in news.news" 
                    :key="index" 
                    class="video-items">
                    <a 
                    @click="showFullNews(index)"
                    class="video-link"
                    data-toggle="modal" 
                    href="#myModal3">
                    {{news.newsHeading}}
                    </a>
                    </li>
                </ul>

    </marquee>
    </div>
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
import { mapState } from 'vuex'
export default {
    name:'Notification',
    computed:{
        ...mapState(['news','error'])
    },
    data(){
        return {
            fullNews:'',
            newsHeading:''
        }
    },
    methods:{
        showFullNews(index){
            this.newsHeading = this.news.news[index].newsHeading
            this.fullNews = this.news.news[index].fullNews
        }
    },
    mounted(){
        this.$store.dispatch('fetchNews')
    }
}
</script>
<style scoped>
.newsHeading{
font-size: 18px;
padding: 15px;
padding-bottom: 5px;
border-bottom: 2px solid black;
}
.fullNews{
font-size: 16px;
padding: 25px;
padding-top: 20px;
}
.news{
    background-color: #3d6188;
     height:90%;
     color: white;
     padding:10px
}
</style>