<template>
  <div class="home-page">
    <header>
      <h1>Main Page - Posts</h1>
    </header>
    <button class="logout-btn" @click="logout">Logout</button>
    <div class="layout">
      <Sidebar class="sidebar-left" />
      <main class="content">


        <section class="posts-list">
  <div
    v-for="p in posts"
    :key="p.id"
    class="post-card"
    @click="openPost(p.id)"
  >
    <div class="post-meta">
      <span>#{{ p.id }}</span>
      <span v-if="p.created_at">{{ formatDate(p.created_at) }}</span>
    </div>
    <div class="post-body">{{ p.body }}</div>
  </div>
</section>

<div class="controls">
  <button class="add-btn" @click="$router.push('/add')">Add Post</button>
  <button class="delete-btn" @click="deleteAll">Delete all posts</button>
</div>
      </main>
      <Sidebar class="sidebar-right" />
    </div>
  </div>
</template>

<script>

import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'HomeView',
  components: { Sidebar },
  computed: {
    posts() { return this.$store.getters.posts }
  },
  methods: {
    openPost(id) {
  this.$router.push(`/posts/${id}`);
},

formatDate(iso) {
  return new Date(iso).toLocaleString();
},

async deleteAll() {
  const token = localStorage.getItem("token");
  if (!token) return;

  await fetch("http://localhost:3000/api/posts", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  this.$store.dispatch("fetchPosts");
},

 logout() {
  localStorage.removeItem("token");
  this.$store.commit("setUser", null);
  this.$router.push("/login");
}



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

.add-btn {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.delete-btn {
  background: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.logout-btn {
  background: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.post-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  background: #fff;
}

.post-card:hover {
  background: #f7f7f7;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

.post-body {
  margin-top: 8px;
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
