<template>
  <div class="container-fluid text-center">    
        <div class="row content">

          <div class="col-sm-2 sidenav-left" id="myHeader">
              <div class=head>
                 <h4>Welcome {{userProfile.name}}</h4>
               </div>  
            <div class="left-info">
                <span style="font-size: 14px;font-weight: 600;">Email:</span> {{user.email}}<br>
            </div>  
            <div class="left-info left-link">
               <ul class="list-group">
                   <li class="list-group-item" @click="newsFunc()"><i class="fa fa-newspaper-o"> News</i></li>
                   <li class="list-group-item" @click="videoLec()"><i class="fa fa-video-camera"> Video Lectures</i></li>
                   <li class="list-group-item" @click="notesFunc()"><i class="fa fa-book"> Notes</i></li>
                   <li class="list-group-item" @click="quizFunc()"><i class="fa fa-question-circle"> Quiz</i></li>
               </ul>
            </div>
            
          </div>

          <!-- right important -->
          <div class="col-sm-9 right-side text-left"> 
           <News v-if="isNews"></News>   
           <VideoLect v-if="isVideo"></VideoLect>   
           <Notes v-if="isNotes"></Notes>
           <Quiz v-if="isQuiz"></Quiz>

          </div>      
        </div>
      </div>
</template>

<script>
import VideoLect from '../components/admin/VideoLect'
import Notes from '../components/admin/Notes'
import Quiz from '../components/admin/Quiz'
import News from '../components/admin/News'
import { mapState } from 'vuex'

export default {
    name: 'AdminDashboard',
    computed:{
        ...mapState(['user','userProfile'])
    },
    components:{
        VideoLect,Notes,Quiz,News
    },
    data(){
        return{
            isNews:true,
            isVideo:false,
            isNotes:false,
            isQuiz:false,
        }
    },
    methods:{
        videoLec(){
            this.isNews = false
            this.isVideo = true
            this.isNotes = false
            this.isQuiz = false
        },
        notesFunc(){
            this.isNews = false
            this.isVideo = false
            this.isNotes = true
            this.isQuiz = false
        },
        quizFunc(){
            this.isNews = false
            this.isVideo = false
            this.isNotes = false
            this.isQuiz = true
        },
        newsFunc(){
            this.isNews = true
            this.isVideo = false
            this.isNotes = false
            this.isQuiz = false
        }
    },
    mounted(){
        var elem = document.getElementsByClassName('modal-backdrop')
    while(elem.length > 0){
        elem[0].parentNode.removeChild(elem[0]);
    }
    }
}
</script>

<style scoped>
.head{
    margin-top: 40px;
}
.left-info{height:auto}
</style>