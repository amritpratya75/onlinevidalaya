<template>
<div>
    <nav class="navbar bg-info">
        <div class="container">
          <div class="navbar-header">
            <div class="navbar-brand abc">Online<span class="xyz">Vidalaya</span></div>
          </div>
          <ul class="nav navbar-nav navbar-right">
           <li v-if="!showNav"><a data-toggle="modal" href="#myModal2"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li v-if="!showNav"><a data-toggle="modal" href="#myModal1"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
            <li v-if="showNav"><a @click="logout()"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
        </div>
      </nav>
      </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'AppNavbar',
    data(){
      return {
      }
    },
    computed: {
    ...mapState(['user','userProfile']),
    showNav() {
      return Object.keys(this.user).length > 1
    }
  },
  methods:{
    logout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>