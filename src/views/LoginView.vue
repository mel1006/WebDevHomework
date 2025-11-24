<template>
  <div class="signup-page">
    <section class="signup-card">
      <h1>Sign up</h1>
      <p class="signup-subtitle">Create an account to start posting.</p>

      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-row">
          <label for="name">Full name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
          />
        </div>

        <div class="form-row">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
          />
        </div>

        <div class="form-row">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
          />
        </div>

        <!-- Error text required by the homework -->
        <p v-if="password && !isPasswordValid" class="password-error">
          {{ errorMessage }}
        </p>

        <button type="submit" :disabled="!isPasswordValid">
          Create account
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LoginView', // route name can stay "login"
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    failedConditions() {
      const pwd = this.password || ''
      const errors = []

      // 1) length: at least 8 and less than 15
      if (pwd.length < 8 || pwd.length >= 15) {
        errors.push('Length must be at least 8 and less than 15 characters')
      }

      // 2) starts with uppercase
      if (!/^[A-Z]/.test(pwd)) {
        errors.push('It should start with an uppercase alphabet')
      }

      // 3) includes at least one uppercase
      if (!/[A-Z]/.test(pwd)) {
        errors.push('Includes at least one uppercase alphabet character')
      }

      // 4) includes at least two lowercase
      const lowerMatches = pwd.match(/[a-z]/g) || []
      if (lowerMatches.length < 2) {
        errors.push('Includes at least two lowercase alphabet characters')
      }

      // 5) includes at least one digit
      if (!/[0-9]/.test(pwd)) {
        errors.push('Includes at least one numeric value')
      }

      // 6) includes "_"
      if (!pwd.includes('_')) {
        errors.push('It should include the character "_"')
      }

      return errors
    },
    isPasswordValid() {
      return this.password !== '' && this.failedConditions.length === 0
    },
    errorMessage() {
      if (!this.password || this.isPasswordValid) return ''
      // The format the homework wants: "the password is not valid - <conditions>"
      return 'The password is not valid - ' + this.failedConditions.join('; ')
    }
  },
  methods: {
    handleSubmit() {
      // Block if invalid (button is already disabled, this is just extra safety)
      if (!this.isPasswordValid) return

      // Fake submit behaviour — you can change this if you like
      alert(`Signup successful for ${this.name || 'user'}!`)

      // Reset fields
      this.name = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.signup-card {
  background: #f4f4f4;
  padding: 1.8rem 2.2rem;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  max-width: 420px;
  width: 100%;
}

.signup-card h1 {
  margin-top: 0;
  margin-bottom: 0.3rem;
  text-align: center;
}

.signup-subtitle {
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.2rem;
  color: #555;
  font-size: 0.95rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  margin-bottom: 0.2rem;
  font-weight: 600;
}

.form-row input {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.password-error {
  margin: 0.3rem 0;
  background: #ffecec;
  border: 1px solid #ffb3b3;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  font-size: 0.85rem;
}

button[type="submit"] {
  margin-top: 0.4rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: #42b983;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* small screens */
@media (max-width: 600px) {
  .signup-card {
    padding: 1.2rem 1.4rem;
  }
}
</style>
