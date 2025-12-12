<template>
  <div class=" signup-page">
    <section class="signup-card">
      <div class="form">
        <h3>SignUp</h3>
        <form @submit.prevent="SignUp">
          <div class="form-row">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" required v-model="email">
          </div>
          <div class="form-row">
            <label id="password" for="password">Password</label>
            <input type="password" name="password" required v-model="password">
          </div>
          <p v-if="password && !isPasswordValid" class="password-error">
            {{ errorMessage }}
          </p>
          <button type="submit" :disabled="!isPasswordValid">SignUp</button>
        </form>
      </div>
    </section>
  </div>

</template>


<script>
export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    failedConditions() {
      const pwd = this.password || "";
      const errors = [];

      if (pwd.length < 8 || pwd.length >= 15)
        errors.push("Length must be at least 8 and less than 15 characters");
      if (!/^[A-Z]/.test(pwd))
        errors.push("It should start with an uppercase alphabet");
      if (!/[A-Z]/.test(pwd))
        errors.push("Includes at least one uppercase alphabet character");
      const lowerMatches = pwd.match(/[a-z]/g) || [];
      if (lowerMatches.length < 2)
        errors.push("Includes at least two lowercase alphabet characters");
      if (!/[0-9]/.test(pwd))
        errors.push("Includes at least one numeric value");
      if (!pwd.includes("_")) errors.push('It should include the character "_"');

      return errors;
    },
    isPasswordValid() {
      return this.password !== "" && this.failedConditions.length === 0;
    },
    errorMessage() {
      if (!this.password || this.isPasswordValid) return "";
      return "The password is not valid - " + this.failedConditions.join("; ");
    }
  },
  methods: {
    SignUp() {
      if (!this.isPasswordValid) return;

      const payload = { email: this.email, password: this.password };

      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      })
        .then(async (res) => {
          const text = await res.text();
          try {
            const data = JSON.parse(text);
            console.log("Signup response:", data);
          } catch {
            console.error("Response is not JSON:", text);
          }
        })
        .catch((e) => {
          console.error("Error on Signup:", e);
        });

      // Reset fields
      this.email = "";
      this.password = "";
    }
  }
};
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
