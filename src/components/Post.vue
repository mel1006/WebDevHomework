<template>
  <article class="post">
    <div class="post-header">
      <img class="avatar" :src="post.profile_image" alt="profile" />
      <div class="meta">
        <div class="author">{{ post.author }}</div>
        <div class="date">{{ post.date }}</div>
      </div>
    </div>

    <p class="post-text">{{ post.text }}</p>

    <img v-if="post.image_data" class="post-image" :src="post.image_data" alt="post image" />

    <div class="post-actions">
      <button @click="like" class="like-btn">Like</button>
      <span class="likes-count">{{ post.likes }}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: { postId: { type: Number, required: true } },
  computed: {
    post() {
      return this.$store.getters.postById(this.postId) || { author: '', date: '', text: '', profile_image: '', image_data: null, likes: 0 }
    }
  },
  methods: {
    like() { this.$store.commit('incrementLike', this.postId) }
  }
}
</script>

<style scoped>
.post { border:1px solid #eee; padding:12px; margin:8px 0; border-radius:6px; background:#fff; }
.post-header { display:flex; gap:12px; align-items:center; margin-bottom:8px; }
.avatar { width:48px; height:48px; border-radius:50%; object-fit:cover; }
.meta .author { font-weight:700; }
.meta .date { font-size:0.85rem; color:#666; }
.post-text { margin:8px 0; white-space:pre-wrap; }
.post-image { max-width:100%; border-radius:6px; margin-top:8px; }
.post-actions { display:flex; gap:10px; align-items:center; margin-top:10px; }
.like-btn { background:#42b983; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; }
.likes-count { font-weight:600; }
</style>