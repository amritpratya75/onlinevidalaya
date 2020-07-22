<template>
<div>
  <div class="modal fade" id="myModal1">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button @click="removeError" class="close" data-dismiss="modal">&times;</button>
          <h4><span class="glyphicon glyphicon-lock"></span> Login</h4>
        </div>
        <div class="modal-body" style="padding:30px 40px;">
            <div class="form-group">
              <label><span class="glyphicon glyphicon-envelope"></span> Email</label>
              <input @click="removeError" type="text" class="form-control" v-model.trim="loginForm.email" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label><span class="glyphicon glyphicon-eye-open"></span> Password</label>
              <input @click="removeError" type="password" class="form-control" v-model.trim="loginForm.password" placeholder="Enter Password">
            </div>
              <button @click="login()" ref="login" class="btn btn-success btn-block">
                <span v-if="!isLoading.loginLoading"><span class="glyphicon glyphicon-off"></span> Login</span>
                <span v-if="isLoading.loginLoading"><i class="fa fa-refresh fa-spin"></i> Loading</span>
                 </button>
              <span v-if="error.loginError" class="help-block">{{error.loginError}}</span>
        </div>
        <div class="modal-footer">
          <p>Not a member? <a data-toggle="modal" href="#myModal2" data-dismiss="modal" style="color:red">Sign Up</a></p>
          <p>Forgot <a data-toggle="modal" href="#myModal4" data-dismiss="modal" style="color:red">Password</a></p>
        </div>
      </div>
      
    </div>
  </div> 



   <div class="modal fade" id="myModal4">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button @click="removeResetError" class="close" data-dismiss="modal">&times;</button>
          <h4><span class="glyphicon glyphicon-lock"></span> Password Reset</h4>
        </div>
        <div class="modal-body" style="padding:30px 40px;">
          <div v-if="!isLoading.emailSent">
            <div class="form-group">
              <label><span class="glyphicon glyphicon-envelope"></span> Email</label>
              <input @click="removeResetError" v-model.trim="resetPassword.email" type="text" class="form-control" placeholder="Enter email">
            </div>
            <button @click="resetPasswordFunc()" ref="login" class="btn btn-success btn-block">
                <span v-if="!isLoading.resetPassword" ><span class="glyphicon glyphicon-off"></span> Reset</span>
                <span v-if="isLoading.resetPassword"><i class="fa fa-refresh fa-spin"></i> Loading</span>
                 </button>
              <span v-if="error.resetPassword" class="help-block">{{error.resetPassword}}</span>    
        </div>
         <div v-if="isLoading.emailSent" class="passwordReset">
          <h3><p>Password Reset Link is send to your email. Please check your mail</p></h3>
          </div>
        </div>
        <div class="modal-footer">
          <p>Not a member? <a data-toggle="modal" href="#myModal2" data-dismiss="modal" style="color:red">Sign Up</a></p>
        </div>
      </div>
      
    </div>
  </div> 
</div>
</template>

<script> 
import { mapState } from 'vuex'
export default {
    name: 'LoginModal',
    computed:{
      ...mapState(['error','isLoading'])
    },
    data(){
      return {
        loginForm: {
        email: '',
        password: ''
      },
      resetPassword:{
        email:''
      }
      }
    },
    methods:{
      login() {
        this.$store.commit('setLoading',{
          loginLoading:true
        })
          this.$store.dispatch('login', {
          email: this.loginForm.email,
          password: this.loginForm.password
          })
        },
        resetPasswordFunc(){
          this.$store.commit('setLoading',{
            resetPassword:true
          })
          this.$store.dispatch('resetPassword',{
            email:this.resetPassword.email
          })
        },
        removeError(){
          this.$store.commit('setError',{
            loginError:''
          })
        },
        removeResetError(){
          this.$store.commit('setError',{
            resetPassword:''
          })
        }
    },
}
</script>

<style scoped>
.passwordReset{
  text-align: center;
  padding: 20px;
}
.help-block{
  color: red;
}
</style>