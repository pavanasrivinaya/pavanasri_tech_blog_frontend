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
        <strong>
          <a class="navbar-brand"
            ><img src="" class="link" alt="" />TechBlog_Admin</a
          >
        </strong>
        <div id="navbarCollapse" class="ml-5 collapse navbar-collapse space1">
          <ul class="navbar-nav mr-auto space">
            <li class="nav-item">
              <nuxt-link to="/Admin/home" class="nav-link">Blogs</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/Admin/categories" class="nav-link"
                >Categories</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link to="/create_posts" class="nav-link"
                >Add Post</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link to="/create_category" class="nav-link"
                >Add category</nuxt-link
              >
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
}
</script>
<style>
.link {
  text-decoration: none;
}
img.link:hover {
  color: white;
}
</style>
