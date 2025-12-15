<template>
  <article class="post" @click="goToPost">
    <div class="post-header">
      <div class="meta">
        <div class="author">User ID: {{ post.user_id }}</div> 
        <div class="date">{{ formatDate(post.date) }}</div>
      </div>
    </div>
    <p class="post-text">{{ post.body }}</p> 
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: { 
    post: { type: Object, required: true } 
  },
  methods: {
    goToPost() {
      this.$router.push(`/posts/${this.post.id}`);
    },
    formatDate(dateString) {
        if(!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    }
  }
}
</script>

<style scoped>
.post { border:1px solid #eee; padding:12px; margin:8px 0; border-radius:6px; background:#fff; cursor: pointer; transition: box-shadow 0.2s; }
.post:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.meta { font-size: 0.85rem; color: #666; margin-bottom: 8px; }
.post-text { white-space:pre-wrap; margin:8px 0; }
</style>