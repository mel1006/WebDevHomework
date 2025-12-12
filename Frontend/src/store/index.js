import { createStore } from "vuex";

import meImg from "@/assets/me.png";
import tartuImg from "@/assets/tartu.jpg";
import codeImg from "@/assets/code.png";
import { compile } from "vue";

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    currentUser: (state) => state.user,
    postById: (state) => (id) => state.posts.find((p) => p.id === id),
  },
  mutations: {
    incrementLike(state, id) {
      const p = state.posts.find((x) => x.id === id);
      if (p) p.likes++;
    },
    resetLikes(state) {
      state.posts.forEach((p) => {
        p.likes = 0;
      });
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        console.log("Fetched posts:", data);
        const normalized = data.map((p) => ({
          likes: 0,
          ...p,
        }));
        commit("setPosts", normalized);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    logout({ commit }) {
      // optional Backend-Logout
      commit("clearUser");
    },
  },
  modules: {},
});
