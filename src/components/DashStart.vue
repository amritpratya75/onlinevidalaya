<template>
  <div>
      <div style="float:left;width: 65%;">
              <div class="video-head">Previous Activity</div>
              <div>
                <h4 style="margin-left:30px;padding-top:20px;text-align:center;width:10%;border-bottom:2px solid white"><i class="fa fa-video-camera"></i> Videos</h4>
                <div class="noItems" v-if="userProfile.watchedVideos === undefined">*You have not watched anything*</div>
                <ul class="list-group" style="padding-left: 30px;margin-top: 20px;">
                  <li v-for="(video, index) in userProfile.watchedVideos" :key="index" class="video-items"><a class="video-link" @click="showMaterial(index)">{{video.topicName}}</a></li>
                </ul>
                <h4 style="margin-left:30px;padding-top:20px;text-align:center;width:10%;border-bottom:2px solid white"><i class="fa fa-book"></i> Notes</h4>
                <div class="noItems" v-if="userProfile.watchedNotes === undefined">*You have not watched anything*</div>
                <ul class="list-group" style="padding-left: 30px;margin-top: 20px;">
                  <li v-for="(note, index) in userProfile.watchedNotes" :key="index" class="video-items"><a class="video-link" @click="showWatchedNotes(index)">{{note.topicName}}</a></li>
                </ul>
              </div>
            </div>
            <div  class="score">
              <div class="video-head" style="margin-top: 7px;color: black;border-bottom: 3px solid black;">Score</div>
              <div>
                <div class="noItems" style="color:black;margin-top:20px" v-if="userProfile.quizScore === undefined">*You have not given any quiz till now*</div>
                <ul class="list-group" style="padding-left: 30px;margin-top: 20px;">
                  <li v-for="(score,index) in userProfile.quizScore" :key="index" class="score-items">{{score.class}}<br>{{score.subject}} <span style="float: right;margin-right: 40px;">{{score.score}}</span></li>
                </ul>
              </div>
            </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'DashStart',
    computed:{
      ...mapState(['userProfile']),
    },
    data(){
      return{

      }
    },
    methods:{
      showMaterial:function(index){
        this.$emit('showMaterial',index)
      },
      showWatchedNotes:function(index){
        this.$emit('showWatchedNotes',index)
        this.$store.dispatch('fetchNotesLink',{
        class:this.userProfile.watchedNotes[index].class,
        subject:this.userProfile.watchedNotes[index].subject,
        topicName:this.userProfile.watchedNotes[index].topicName
      })
      }
    }
}
</script>

<style scoped>
.noItems{
  margin: 30px;
  margin-left: 60px;
  font-size: 16px;
}
</style>