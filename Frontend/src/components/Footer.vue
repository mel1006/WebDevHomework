<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <footer class="footer">
        <p>© 2025 Tartu WebDev Homework. All rights reserved.</p>

        <ul class="social-icons">
            <li> <a href="#" class="fa fa-facebook"></a> </li>
            <li> <a href="#" class="fa fa-twitter"></a> </li>
            <li> <a href='#' class="fa fa-instagram"></a></li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    position: fixed;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
}

.social-icons {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 10px;
}

.social-icons li a {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    color: white;
    font-size: 18px;
    text-decoration: none;
    transition: opacity 0.3s;
}

.social-icons li a:hover {
    opacity: 0.7;
}

/* Facebook */
.fa-facebook {
    background: #3B5998;
}

/* Twitter */
.fa-twitter {
    background: #55ACEE;
}

/* Instagram */
.fa-instagram {
    background: #125688;
    color: white;
}
</style>