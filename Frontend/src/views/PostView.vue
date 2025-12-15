<template>
  <div class="post-view">
    <h3>Edit Post</h3>
    
    <div v-if="isLoading">Loading post...</div>
    
    <div v-else-if="error" class="error">
      {{ error }}
      <br>
      <router-link to="/">Go back home</router-link>
    </div>

    <div v-else class="form-container">
      <label for="post-body">Post Content</label>
      <textarea id="post-body" v-model="post.body" rows="6"></textarea>
      
      <div class="button-group">
        <button @click="updatePost" class="btn update">Update</button>
        <button @click="deletePost" class="btn delete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  data() {
    return {
      post: {
        id: null,
        body: ''
      },
      isLoading: true,
      error: null
    };
  },
  async mounted() {
    const postId = this.$route.params.id;
    const token = localStorage.getItem('token');

    // Redirect if not logged in
    if (!token) {
      this.$router.push('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to fetch post');
      }

      this.post = await response.json();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async updatePost() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ body: this.post.body })
        });

        if (response.ok) {
          alert('Post updated successfully');
          this.$router.push('/');
        } else {
          alert('Failed to update post');
        }
      } catch (err) {
        console.error(err);
        alert('Error connecting to server');
      }
    },
    async deletePost() {
      const token = localStorage.getItem('token');
      if (!confirm('Are you sure you want to delete this post?')) return;

      try {
        const response = await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert('Post deleted');
          this.$router.push('/');
        } else {
          alert('Failed to delete post');
        }
      } catch (err) {
        console.error(err);
        alert('Error connecting to server');
      }
    }
  }
};
</script>

<style scoped>
.post-view {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  font-weight: bold;
  text-align: left;
}
textarea {
  width: 100%;
  padding: 0.5rem;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 10px;
}
.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}
.update {
  background-color: #42b983;
}
.update:hover {
  background-color: #3aa876;
}
.delete {
  background-color: #e74c3c;
}
.delete:hover {
  background-color: #c0392b;
}
.error {
  color: #e74c3c;
  font-weight: bold;
}
</style>