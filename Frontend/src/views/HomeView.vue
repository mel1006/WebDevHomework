<template>
  <div class="home-page">
    <header>
      <h1>Main Page - Posts</h1>
    </header>

    <div class="layout">
      <Sidebar class="sidebar-left" />
      <main class="content">


        <section class="posts-list">
          <Post v-for="p in posts" :key="p.id" :post-id="p.id" />
        </section>
        <div class="controls">
          <button @click="resetAllLikes" class="reset-btn">Reset Likes</button>
        </div>
      </main>
      <Sidebar class="sidebar-right" />
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'HomeView',
  components: { Post, Sidebar },
  computed: {
    posts() { return this.$store.getters.posts }
  },
  methods: {
    resetAllLikes() { this.$store.commit('resetLikes') }
  },
  created() {
    this.$store.dispatch('fetchPosts')
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.home-page header {
  text-align: center;
  margin-bottom: 12px;
}

.layout {
  display: flex;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
}

header {
  display: block;
}

.content {
  min-width: 0;
}

.controls {
  margin: 12px 0;
  text-align: left;
  margin-bottom: 5rem;
}

.reset-btn {
  background: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}


@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 0 12px;
  }

  .sidebar-left {
    order: 2;
  }

  .content {
    order: 1;
  }
}
</style>
