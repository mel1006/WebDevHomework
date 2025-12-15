<template>
  <div class="home-page">
    <header><h1>Main Page - Posts</h1></header>
    <div class="layout">
      <Sidebar class="sidebar-left" />
      <main class="content">
        <div class="controls">

          <button @click="logout" class="logout-btn">Logout</button>
          <button @click="$router.push('/add')" class="add-btn">Add Post</button>
          <button @click="deleteAllPosts" class="delete-btn">Delete All</button>
        </div>
        <section class="posts-list">
          <div v-if="posts.length === 0">No posts found. Add one!</div>

          <Post v-for="p in posts" :key="p.id" :post="p" />
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'HomeView',
  components: { Post, Sidebar },
  data() {
    return {
      posts: [] 
    }
  },
  async mounted() {
    await this.fetchPosts();
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      // rdirect to login 
      this.$router.push('/login');
    },
    async fetchPosts() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return;
      }
      try {
        const res = await fetch('http://localhost:3000/api/posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          this.posts = await res.json();
        } else if (res.status === 401 || res.status === 403) {
          this.logout();
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteAllPosts() {
        const token = localStorage.getItem('token');
        if(!confirm("Delete all posts?")) return;
        
        await fetch('http://localhost:3000/api/posts', {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        this.fetchPosts(); 
    }
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
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
}

header {
  display: block;
}

.content {
  min-width: 0;
}

.controls {
  margin: 12px 0;
  display:flex;
  gap:10px;
}

.add-btn {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background: #ff6b6b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn {
  background: #7f8c8d;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
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
