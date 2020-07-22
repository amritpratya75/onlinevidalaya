<template>
<div>
<div class="video-head">
            <i class="fa fa-video-camera"></i> Notes
      </div>

          <div>
            <label style="margin-top: 5px;padding:18px;font-size: 19px;margin-left: 20px;">{{title}}</label>
            <div style="margin: 35px;margin-top: 0px;">
              <iframe :src="noteLink" width="70%" height="600px">
              </iframe>
            </div>
          </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NotesShow',
  props:['notesIndex'],
  computed:{
    ...mapState(['notes','noteLink','userProfile'])
  },
  data(){
    return {
      title:'',
    }
  }, 
  mounted(){
      if(!this.notes.watched){
        this.title = this.notes.note[this.notesIndex].topicName    
      }
      else{
        this.title = this.userProfile.watchedNotes[this.notesIndex].topicName
      }
    }

}
</script>

<style>

</style>