import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import { storageRef } from "../firebase";
import router from "../router/index";
import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    userPic: "",
    userProfile: {
      name: "",
      class: "",
      contact: "",
    },
    videos: {},
    notes: {},
    noteLink: "",
    quiz: {},
    news: {},
    error: {},
    isLoading: {
      loginLoading: false,
      signUpLoading: false,
      userPicLoading: true,
    },
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setUserPic(state, val) {
      state.userPic = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setVideos(state, val) {
      state.videos = val;
    },
    setNotes(state, val) {
      state.notes = val;
    },
    setNoteLink(state, val) {
      state.noteLink = val;
    },
    setUpdateVideos(state, val) {
      state.videos.watched = val;
    },
    setUpdateNotes(state, val) {
      state.notes.watched = val;
    },
    setQuiz(state, val) {
      state.quiz = val;
    },
    setNews(state, val) {
      state.news = val;
    },
    setError(state, val) {
      state.error = val;
    },
    setLoading(state, val) {
      state.isLoading = val;
    },
  },
  actions: {
    async resetPassword({ commit }, form) {
      if (form.email !== "") {
        fb.auth
          .sendPasswordResetEmail(form.email)
          .then(function() {
            commit("setLoading", {
              emailSent: true,
            });
          })
          .catch(function(err) {
            commit("setLoading", {
              resetPassword: false,
            });
            commit("setError", {
              resetPassword: err.message,
            });
          });
      } else {
        commit("setLoading", {
          resetPassword: false,
        });
        if (form.email == "")
          commit("setError", {
            resetPassword: "Enter your E-mail",
          });
      }
    },
    async removeQuiz({ dispatch }, form) {
      const {
        std,
        subject: newSubject,
        question,
        correct_answer,
        incorrect_answer,
      } = form;
      let newObject = {};
      newObject[newSubject] = fb.firestore.FieldValue.arrayRemove({
        correct_answer: correct_answer,
        question: question,
        incorrect_answer: incorrect_answer,
      });
      await fb.quizCollection
        .doc(std)
        .update(newObject)
        .then()
        .catch((err) => {
          console.log(err.message);
        });

      dispatch("fetchQuiz", {
        class: std,
        subject: newSubject,
      });
    },
    async addQuiz({ commit, dispatch }, form) {
      const {
        std,
        subject: newSubject,
        question,
        correct_answer,
        incorrect_answer,
      } = form;
      if (
        std !== "" &&
        newSubject !== "" &&
        question !== "" &&
        correct_answer !== "" &&
        incorrect_answer.option1 !== "" &&
        incorrect_answer.option2 !== "" &&
        incorrect_answer.option3 !== ""
      ) {
        let newObject = {};
        newObject[newSubject] = fb.firestore.FieldValue.arrayUnion({
          correct_answer: correct_answer,
          question: question,
          incorrect_answer: [
            incorrect_answer.option1,
            incorrect_answer.option2,
            incorrect_answer.option3,
          ],
        });
        await fb.quizCollection
          .doc(std)
          .update(newObject)
          .then(() => {
            commit("setLoading", {
              addQuizLoading: false,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });

        dispatch("fetchQuiz", {
          class: std,
          subject: newSubject,
        });
      } else {
        commit("setLoading", {
          addQuizLoading: false,
        });
        if (std === "")
          commit("setError", {
            quizAddError: "Select any Class",
          });
        else if (newSubject === "")
          commit("setError", {
            quizAddError: "Select any Subject",
          });
        else if (correct_answer === "")
          commit("setError", {
            quizAddError: "Enter Correct Answer",
          });
        else if (incorrect_answer.option1 === "")
          commit("setError", {
            quizAddError: "Enter Incorrect Answer 1",
          });
        else if (incorrect_answer.option2 === "")
          commit("setError", {
            quizAddError: "Enter Incorrect Answer 2",
          });
        else if (incorrect_answer.option3 === "")
          commit("setError", {
            quizAddError: "Enter Incorrect Answer 3",
          });
      }
    },
    async removeNotes({ dispatch }, form) {
      const { std, subject: newSubject, topicName } = form;
      let newObject = {};
      newObject[newSubject] = fb.firestore.FieldValue.arrayRemove({
        topicName: topicName,
      });
      await fb.notesCollection
        .doc(std)
        .update(newObject)
        .then()
        .catch((err) => {
          console.log(err.message);
        });
      await storageRef
        .child("notes/" + std + "/" + newSubject + "/" + topicName + ".pdf")
        .delete()
        .then(function() {
          console.log("Successfully deleted");
        })
        .catch((err) => {
          console.log(err.message);
        });

      dispatch("fetchNotes", {
        class: std,
        subject: newSubject,
      });
    },
    async addNotes({ commit, dispatch }, form) {
      const { std, subject: newSubject, topicName, file } = form;
      if (std !== "" && newSubject !== "" && topicName !== "" && file !== "") {
        let newObject = {};
        newObject[newSubject] = fb.firestore.FieldValue.arrayUnion({
          topicName: topicName,
        });
        await fb.notesCollection
          .doc(std)
          .update(newObject)
          .then(() => {
            commit("setLoading", {
              addNotesLoading: false,
            });
            dispatch("fetchNotes", {
              class: std,
              subject: newSubject,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
        await storageRef
          .child("notes/" + std + "/" + newSubject + "/" + topicName + ".pdf")
          .put(file)
          .then(function() {
            console.log("Success");
          });
      } else {
        commit("setLoading", {
          addNotesLoading: false,
        });
        if (std === "")
          commit("setError", {
            addNotesError: "Select Any Class",
          });
        else if (newSubject === "")
          commit("setError", {
            addNotesError: "Select Any Subject",
          });
        else if (topicName === "")
          commit("setError", {
            addNotesError: "Enter a Topic Name",
          });
        else if (file === "")
          commit("setError", {
            addNotesError: "Select a File",
          });
      }
    },
    async removeNews({ dispatch }, form) {
      const { newsHeading, fullNews } = form;
      await fb.newsCollection
        .doc("d9qYOow2oLfzN1M1En6c")
        .update({
          news: fb.firestore.FieldValue.arrayRemove({
            newsHeading: newsHeading,
            fullNews: fullNews,
          }),
        })
        .then(() => {
          dispatch("fetchNews");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    async addNews({ commit, dispatch }, form) {
      const { newsHeading, fullNews } = form;
      if (newsHeading !== "" && fullNews !== "") {
        await fb.newsCollection
          .doc("d9qYOow2oLfzN1M1En6c")
          .update({
            news: fb.firestore.FieldValue.arrayUnion({
              newsHeading: newsHeading,
              fullNews: fullNews,
            }),
          })
          .then(() => {
            commit("setLoading", {
              addNewsLoading: false,
            });
            dispatch("fetchNews");
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        commit("setLoading", {
          addNewsLoading: false,
        });
        if (newsHeading === "")
          commit("setError", {
            addNewsError: "Enter News Heading",
          });
        else if (fullNews === "")
          commit("setError", {
            addNewsError: "Enter Full News",
          });
      }
    },
    async removeVideo({ dispatch }, form) {
      const { std, subject: newSubject, topicName, videoLink } = form;
      let newObject = {};
      newObject[newSubject] = fb.firestore.FieldValue.arrayRemove({
        topicName: topicName,
        videoLink: videoLink,
      });
      await fb.videoCollection
        .doc(std)
        .update(newObject)
        .then()
        .catch((err) => {
          console.log(err.message);
        });

      dispatch("fetchVideos", {
        class: std,
        subject: newSubject,
      });
    },
    async addVideo({ commit, dispatch }, form) {
      const { std, subject: newSubject, topicName, videoLink } = form;
      if (
        std !== "" &&
        newSubject !== "" &&
        topicName !== "" &&
        videoLink !== ""
      ) {
        let newObject = {};
        newObject[newSubject] = fb.firestore.FieldValue.arrayUnion({
          topicName: topicName,
          videoLink: videoLink,
        });
        await fb.videoCollection
          .doc(std)
          .update(newObject)
          .then(() => {
            commit("setLoading", {
              addVideoLoading: false,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
        dispatch("fetchVideos", {
          class: std,
          subject: newSubject,
        });
      } else {
        commit("setLoading", {
          addVideoLoading: false,
        });
        if (std === "")
          commit("setError", {
            addVideoError: "Select Any Class",
          });
        else if (newSubject === "")
          commit("setError", {
            addVideoError: "Select Any Subject",
          });
        else if (topicName === "")
          commit("setError", {
            addVideoError: "Enter a Topic Name",
          });
        else if (videoLink === "")
          commit("setError", {
            addVideoError: "Give a Video Link",
          });
      }
    },
    async fetchNews({ commit }) {
      await fb.newsCollection
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((news) => {
            commit("setNews", news.data());
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    async editProfile({ commit, dispatch }, form) {
      if (form.name !== "" && form.contact !== "" && form.class !== "") {
        const userId = fb.auth.currentUser.uid;
        const user = fb.auth.currentUser;
        await fb.usersCollection
          .doc(userId)
          .update({
            name: form.name,
            contact: form.contact,
            class: form.class,
          })
          .then(() => {
            commit("setLoading", {
              editProfileLoading: false,
            });
          });
        dispatch("fetchUserProfile", user);
      } else {
        commit("setLoading", {
          editProfileLoading: false,
        });
        if (form.name === "")
          commit("setError", {
            profileError: "Enter your Name",
          });
        else if (form.contact === "")
          commit("setError", {
            profileError: "Enetr your Contact",
          });
        else if (form.class === "")
          commit("setError", {
            profileError: "Select a Class",
          });
      }
    },
    async quizScore({ dispatch }, form) {
      const userId = fb.auth.currentUser.uid;
      const user = fb.auth.currentUser;
      await fb.usersCollection.doc(userId).update({
        quizScore: fb.firestore.FieldValue.arrayUnion({
          class: form.class,
          subject: form.subject,
          score: form.score,
        }),
      });

      dispatch("fetchUserProfile", user);
    },
    async fetchQuiz({ commit, dispatch }, filter) {
      if (filter.class !== "" && filter.subject !== "") {
        await fb.quizCollection
          .doc(filter.class)
          .get()
          .then((fetchQuiz) => {
            var quizes = {};
            for (var i in fetchQuiz.data()) {
              if (i == filter.subject) {
                var quiz = fetchQuiz.data()[i];
                quizes = {
                  quiz,
                  class: filter.class,
                  subject: filter.subject,
                };
              }
            }

            dispatch("shuffleQuest", quizes);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        commit("setLoading", {
          quizLoading: false,
        });
        if (filter.class === "")
          commit("setError", {
            quizError: "Select a Class",
          });
        else if (filter.subject === "")
          commit("setError", {
            quizError: "Select a Subject",
          });
      }
    },
    async shuffleQuest({ commit }, quiz) {
      var shuffleQuestions = _.shuffle(quiz.quiz);
      for (var i = 0; i < shuffleQuestions.length; i++) {
        var answers = [...shuffleQuestions[i].incorrect_answer];
        answers.push(shuffleQuestions[i].correct_answer);
        var shuffleAnswers = _.shuffle(answers);
        shuffleQuestions[i].shuffleAnswers = shuffleAnswers;
      }
      var res = {
        shuffleQuestions,
        class: quiz.class,
        subject: quiz.subject,
      };
      if (res.shuffleQuestions.length > 0) {
        commit("setLoading", {
          showQuiz: true,
          quizLoading: false,
        });
      } else {
        commit("setLoading", {
          quizLoading: false,
        });
      }
      commit("setQuiz", res);
    },
    async watchedVideos({ dispatch }, form) {
      const userId = fb.auth.currentUser.uid;
      const user = fb.auth.currentUser;
      await fb.usersCollection.doc(userId).update({
        watchedVideos: fb.firestore.FieldValue.arrayUnion({
          topicName: form.topicName,
          videoLink: form.videoLink,
        }),
      });

      dispatch("fetchUserProfile", user);
    },
    async watchedNotes({ dispatch }, form) {
      const userId = fb.auth.currentUser.uid;
      const user = fb.auth.currentUser;
      await fb.usersCollection.doc(userId).update({
        watchedNotes: fb.firestore.FieldValue.arrayUnion({
          topicName: form.topicName,
          class: form.class,
          subject: form.subject,
        }),
      });
      dispatch("fetchUserProfile", user);
    },
    async updateVideos({ commit }, val) {
      commit("setUpdateVideos", val);
    },
    async updateNotes({ commit }, val) {
      commit("setUpdateNotes", val);
    },
    async login({ commit, dispatch }, form) {
      if (form.email !== "" && form.password !== "") {
        await fb.auth
          .signInWithEmailAndPassword(form.email, form.password)
          .then(({ user }) => {
            dispatch("downloadProfileImage");
            dispatch("fetchUserProfile", user);
          })
          .catch((err) => {
            commit("setLoading", {
              loginLoading: false,
            });
            commit("setError", {
              loginError: err.message,
            });
          });
      } else {
        commit("setLoading", {
          loginLoading: false,
        });
        if (form.email === "")
          commit("setError", {
            loginError: "Email Address Field is empty",
          });
        else if (form.password === "")
          commit("setError", {
            loginError: "Password Field is empty",
          });
      }
    },
    async signup({ commit, dispatch }, form) {
      if (
        form.email !== "" &&
        form.password !== "" &&
        form.name !== "" &&
        form.contact !== ""
      ) {
        await fb.auth
          .createUserWithEmailAndPassword(form.email, form.password)
          .then(() => {})
          .catch((err) => {
            commit("setLoading", {
              signUpLoading: false,
            });
            commit("setError", {
              signUpError: err.message,
            });
          });
        if (fb.auth.currentUser !== null) {
          const user = fb.auth.currentUser;
          await fb.usersCollection
            .doc(user.uid)
            .set({
              name: form.name,
              contact: form.contact,
            })
            .then()
            .catch((err) => {
              console.log(err.message);
            });
          dispatch("fetchUserProfile", user);
        }
      } else {
        commit("setLoading", {
          signUpLoading: false,
        });
        if (form.name === "")
          commit("setError", {
            signUpError: "Name Field is empty",
          });
        else if (form.email === "")
          commit("setError", {
            signUpError: "Email Address Field is empty",
          });
        else if (form.password === "")
          commit("setError", {
            signUpError: "Password Field is empty",
          });
        else if (form.contact === "")
          commit("setError", {
            signUpError: "Contact Field is empty",
          });
      }
    },
    async completeProfile({ commit, dispatch }, form) {
      if (form.class !== "") {
        const userId = fb.auth.currentUser.uid;
        const user = fb.auth.currentUser;
        await fb.usersCollection.doc(userId).set(
          {
            class: form.class,
          },
          { merge: true }
        );
        dispatch("fetchUserProfile", user);
      } else {
        commit("setLoading", {
          addClassLoading: false,
        });
        if (form.class === "")
          commit("setError", {
            profileError: "Select a Class",
          });
      }
    },
    async uploadProfileImage({ dispatch }, form) {
      const userId = fb.auth.currentUser.uid;
      await storageRef
        .child("users/" + userId + "/profile.jpg")
        .put(form.file)
        .then(function() {})
        .catch(() => {});
      dispatch("downloadProfileImage");
    },
    async downloadProfileImage({ commit }) {
      const user = fb.auth.currentUser;
      if (user !== null) {
        await storageRef
          .child("users/" + user.uid + "/profile.jpg")
          .getDownloadURL()
          .then((imgUrl) => {
            commit("setUserPic", imgUrl);
            commit("setLoading", {
              userPicLoading: false,
            });
          })
          .catch(() => {
            commit("setLoading", {
              userPicLoading: false,
            });
            commit("setUserPic", require("@/assets/images/defaultProfile.png"));
          });
      }
    },
    async fetchUserProfile({ commit }, user) {
      if (user !== null) {
        var d = new Date();
        localStorage.setItem("Date", d);
        if (localStorage.getItem("Duration") === null)
          localStorage.setItem("Duration", 0);
        const userProfile = await fb.usersCollection.doc(user.uid).get();
        commit("setUserProfile", userProfile.data());
        commit("setUser", user);

        if (router.currentRoute.path === "/" && userProfile.data().admin) {
          router.push("/adminDashboard");
        }
        if (
          router.currentRoute.path === "/" &&
          userProfile.data().admin === undefined
        ) {
          router.push("/dashboard");
        }
      }
    },
    async logout({ commit }) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      var ld = new Date();
      var ldate = ld.getDate() + " " + months[ld.getMonth()];

      var d = new Date(localStorage.getItem("Date"));
      var date = d.getDate() + " " + months[d.getMonth()];

      var diff = (ld.getTime() - d.getTime()) / 1000;
      var time = Math.abs(Math.floor(diff));
      const userId = fb.auth.currentUser.uid;

      if (ldate === date) {
        await fb.usersCollection.doc(userId).update({
          loginDuration: fb.firestore.FieldValue.arrayRemove({
            date: ldate,
            duration: Math.floor(
              parseInt(localStorage.getItem("Duration")) / 60
            ),
          }),
        });
        var duration = parseInt(localStorage.getItem("Duration")) + time;
        localStorage.setItem("Duration", duration);
      } else {
        localStorage.setItem("Duration", time);
      }

      await fb.usersCollection.doc(userId).update({
        loginDuration: fb.firestore.FieldValue.arrayUnion({
          date: ldate,
          duration: Math.floor(parseInt(localStorage.getItem("Duration")) / 60),
        }),
      });

      await fb.auth.signOut();
      commit("setUserProfile", {});
      commit("setUser", {});
      commit("setUserPic", "");
      commit("setVideos", {});
      commit("setNotes", {});
      commit("setNoteLink", "");
      commit("setQuiz", {});
      commit("setError", {});
      commit("setLoading", {});
      if (!(router.currentRoute.path === "/")) router.push("/");
    },
    async fetchVideos({ commit }, filter) {
      if (filter.class !== "" && filter.subject !== "") {
        await fb.videoCollection
          .doc(filter.class)
          .get()
          .then((fetchVideos) => {
            var videos = {};
            for (var i in fetchVideos.data()) {
              if (i == filter.subject) {
                var video = fetchVideos.data()[i];
                videos = {
                  video,
                  class: filter.class,
                  subject: filter.subject,
                  watched: false,
                };
              }
            }
            commit("setVideos", videos);
            commit("setLoading", {
              videoLoading: false,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        commit("setLoading", {
          videoLoading: false,
        });
        if (filter.class === "")
          commit("setError", {
            videoError: "Select a class",
          });
        else if (filter.subject === "")
          commit("setError", {
            videoError: "Select a subject",
          });
      }
    },
    async fetchNotes({ commit }, filter) {
      if (filter.class !== "" && filter.subject !== "") {
        await fb.notesCollection
          .doc(filter.class)
          .get()
          .then((fetchNotes) => {
            var notes = {};
            for (var i in fetchNotes.data()) {
              if (i == filter.subject) {
                var note = fetchNotes.data()[i];
                notes = {
                  note,
                  class: filter.class,
                  subject: filter.subject,
                  watched: false,
                };
              }
            }
            commit("setNotes", notes);
            commit("setLoading", {
              notesLoading: false,
            });
          });
      } else {
        commit("setLoading", {
          notesLoading: false,
        });
        if (filter.class === "")
          commit("setError", {
            notesError: "Select a class",
          });
        else if (filter.subject === "")
          commit("setError", {
            notesError: "Select a subject",
          });
      }
    },
    async fetchNotesLink({ commit }, form) {
      await storageRef
        .child(
          "notes/" +
            form.class +
            "/" +
            form.subject +
            "/" +
            form.topicName +
            ".pdf"
        )
        .getDownloadURL()
        .then((noteUrl) => {
          commit("setNoteLink", noteUrl);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  modules: {},
});
