<template>
  <div class="page">
    <h1>Add Post</h1>

    <form class="card" @submit.prevent="submit">
      <label for="body">Post body</label>

      <textarea
        id="body"
        v-model="body"
        rows="6"
        placeholder="Write your post here..."
        required
      ></textarea>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="actions">
        <button type="submit">Create</button>
        <button type="button" class="secondary" @click="$router.push('/')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPostView",
  data() {
    return {
      body: "",
      error: "",
    };
  },
  methods: {
    async submit() {
      this.error = "";

      const token = localStorage.getItem("token");
      if (!token) {
        this.error = "Not authenticated";
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: this.body }),
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to create post");
        }

        // Go back to home after success
        this.$router.push("/");
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  background: #fff;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.secondary {
  background: #eee;
}

.error {
  margin-top: 10px;
  color: #b00020;
}
</style>
