<template>
    <div class="login-page">
        <section class="login-card">
            <h3>Login</h3>
            <form @submit.prevent="login">
                <div class="form-row">
                    <label for="email">Email</label>
                    <input id="email" type="email" required v-model="email" />
                </div>
                <div class="form-row">
                    <label for="password">Password</label>
                    <input type="password" required v-model="password" />
                </div>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                <div id="buttons">
                    <button type="submit">Login</button>
                    <button @click="$router.push('/signup')" type="button">Go to SignUp</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async login() {
            const payload = { email: this.email, password: this.password };

            try {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem("token", data.token); 
                    console.log("Login successful");
                    this.$router.push("/");
                } else {
                    this.errorMessage = "Login failed";
                }
            } catch (e) {
                this.errorMessage = "Server error: " + e.message;
                console.error("Login error:", e);
            }

            this.email = "";
            this.password = "";
        }
    }
};
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
}

.login-card {
    background: #f4f4f4;
    padding: 2rem;
    border-radius: 12px;
    max-width: 420px;
    width: 100%;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

.login-card h3 {
    margin-bottom: 1rem;
    text-align: center;
}

.form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;
}

.form-row label {
    font-weight: 600;
    margin-bottom: 0.2rem;
}

.form-row input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
}

button[type="submit"] {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    background-color: #42b983;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-right: 5rem;
}

button[type="button"] {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    background-color: #42b983;
    color: white;
    font-weight: 600;
    cursor: pointer;
}

.error-message {
    background: #ffecec;
    color: #b00020;
    padding: 0.5rem;
    border-radius: 6px;
    margin-bottom: 0.8rem;
}

#buttons {
    display: flex;
    justify-content: space-between;
}
</style>
