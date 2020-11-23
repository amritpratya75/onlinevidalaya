import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fb from "./firebase";
import VueGraph from "vue-graph";
import GraphLine3D from "vue-graph/src/components/line3d.js";
import NoteWidget from "vue-graph/src/widgets/note.js";
import LegendWidget from "vue-graph/src/widgets/legends.js";

Vue.component(GraphLine3D.name, GraphLine3D);
Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);

Vue.use(VueGraph);

import "@/assets/main.css";

Vue.config.productionTip = false;

let app = "";
fb.auth.onAuthStateChanged((user) => {
  store.dispatch("fetchUserProfile", user);
  store.dispatch("downloadProfileImage");
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
