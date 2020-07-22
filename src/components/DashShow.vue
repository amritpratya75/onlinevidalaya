<template>
  <div>
    <div class="video-head">
            <i class="fa fa-video-camera"></i> Video Lectures
      </div>
      <div>
            <label style="margin-top: 5px;padding:18px;font-size: 19px;margin-left: 20px;">{{title}}</label>
            <div style="margin: 35px;margin-top: 0px;">
            <iframe style="border-radius: 20px;" width="966" height="543" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
      </div>
      
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'DashShow',
    props:['index'],
    computed:{
      ...mapState(['videos','userProfile']),
    },
    data(){
      return {
        title:'',
        link:''
      }
    },
    mounted(){
      if(!this.videos.watched){
        this.title = this.videos.video[this.index].topicName
        this.link = this.videos.video[this.index].videoLink
      }
      else{
        this.title = this.userProfile.watchedVideos[this.index].topicName
        this.link = this.userProfile.watchedVideos[this.index].videoLink
      }
    }
}
</script>

<style>

</style>