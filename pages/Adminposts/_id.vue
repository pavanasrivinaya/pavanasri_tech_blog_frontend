<template>
  <div>
    <NavBar />
    <section class="section single-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div class="page-wrapper">
              <div class="blog-title-area text-center">
                <ol class="breadcrumb hidden-xs-down">
                  <li class="breadcrumb-item">
                    <nuxt-link to="/Admin/adminhome">Home</nuxt-link>
                  </li>
                  <li class="breadcrumb-item active">
                    {{ post.title }}
                  </li>
                </ol>
                <span class="color-orange"
                  ><a href="#" title="">{{ post.category.type }}</a></span
                >
                <h3>{{ post.title }}</h3>
                <div class="blog-meta big-meta">
                  <small
                    ><a href="#" title="">{{
                      formatDate(post.created)
                    }}</a></small
                  >
                </div>
                <!-- end meta -->
              </div>
              <!-- end title -->
              <div class="single-post-media">
                <img
                  :src="`https://pavanatechblog.herokuapp.com/uploads/${post.photo}`"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <!-- end media -->
              <div class="blog-content">
                <div class="pp">
                  <p>
                    {{ post.description }}
                  </p>
                </div>
                <!-- end pp -->
              </div>
              <!-- end content -->
              <!-- end row -->
              <hr class="invis1" />
            </div>
            <!-- end page-wrapper -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>
  </div>
</template>
<script>
import NavBar from '@/components/Admin/NavBar'
export default {
  components: {
    NavBar,
  },
  async asyncData({ $axios, params }) {
    try {
      const singlePost = $axios.$get(`/api/posts/${params.id}`)
      const [postResponse] = await Promise.all([singlePost])
      console.log(postResponse)
      return {
        post: postResponse.post,
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
