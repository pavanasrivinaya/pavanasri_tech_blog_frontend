<template>
  <header class="tech-header header">
    <div class="container-fluid">
      <nav
        class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse"
      >
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand"><img src="" alt="" />TechBlog_Client</a>
        <div id="navbarCollapse" class="ml-5 collapse navbar-collapse space1">
          <ul class="navbar-nav mr-auto space">
            <li class="nav-item">
              <nuxt-link to="/Client" class="nav-link">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/Client/about" class="nav-link">About</nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <!-- end container-fluid -->
  </header>
  <!-- end market-header -->
</template>
<script>
export default {
  name: 'Navbar',
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('http://localhost:3000/api/categories')
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  },
}
</script>
