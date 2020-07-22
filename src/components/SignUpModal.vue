<template>
<div>
    <div class="modal fade" id="myModal2">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header">
          <button @click="removeError" type="button" class="close" data-dismiss="modal">&times;</button>
          <h4><span class="glyphicon glyphicon-lock"></span> Register</h4>
        </div>
        <div class="modal-body" style="padding:30px 40px;">
            <div class="form-group">
                <label><span class="glyphicon glyphicon-user"></span> Name</label>
                <input @click="removeError"  type="text" class="form-control" v-model.trim="signupForm.name" placeholder="Enter Your Name">
              </div>
            <div class="form-group">
              <label><span class="glyphicon glyphicon-envelope"></span> Email</label>
              <input @click="removeError"  type="text" class="form-control" v-model.trim="signupForm.email" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label><span class="glyphicon glyphicon-eye-open"></span> Password</label>
              <input @click="removeError"  type="password" class="form-control" v-model.trim="signupForm.password" placeholder="Enter password">
            </div>
            <div class="form-group">
                <label><span class="glyphicon glyphicon-phone"></span> Phone No.</label>
                <input @click="removeError"  type="text" class="form-control" v-model.trim="signupForm.contact" placeholder="Enter Phone">
              </div>
              <button @click="signup()" class="btn btn-success btn-block" >
               <span v-if="!isLoading.signUpLoading"><span class="glyphicon glyphicon-off"></span> Register</span>
                <span v-if="isLoading.signUpLoading"><i class="fa fa-refresh fa-spin"></i> Loading</span>
                </button>
              <span v-if="error.signUpError" class="help-block">{{error.signUpError}}</span>
        </div>
        <div class="modal-footer">
          <p>Already a member? <a data-toggle="modal" href="#myModal1" data-dismiss="modal" style="color:red" onclick="alreadyMember()">Login</a></p>
        </div>
      </div>
      
    </div>
  </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SignUpModal',
    computed:{
      ...mapState(['error','isLoading'])
    },
    data(){
      return {
        signupForm: {
        name: '',
        email: '',
        password: '',
        contact: ''
      },
      }
    },
    methods:{
      signup() {
        this.$store.commit('setLoading',{
          signUpLoading:true
        })
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        contact: this.signupForm.contact
      })
    },
     removeError(){
          this.$store.commit('setError',{
            signUpError:''
          })
        }
    },
}
</script>
<style scoped>
.help-block{
  color: red;
}
</style>