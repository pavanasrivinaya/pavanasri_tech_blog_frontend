<template>
  <div>
    <NavBar />
    <div class="search">
      <div class="autocomplete text-center" style="width: 300px">
        <input
          id="myInput"
          v-model="search"
          type="text"
          placeholder="Search for Post"
        />
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div class="page-wrapper">
              <div class="blog-top clearfix">
                <h4 class="pull-left">
                  Blog <a href="#"><i class="fa fa-rss"></i></a>
                </h4>
              </div>
              <!-- end blog-top -->

              <div class="blog-list clearfix">
                <div
                  v-for="post in filteredPosts"
                  :key="post._id"
                  class="blog-box row"
                >
                  <div class="col-md-4">
                    <div class="post-media">
                      <a href="" title="">
                        <img
                          :src="post.photo"
                          alt=""
                          class="img-fluid postimage"
                        />
                        <div class="hovereffect"></div>
                      </a>
                    </div>
                    <!-- end media -->
                  </div>
                  <!-- end col -->

                  <div class="blog-meta big-meta col-md-8">
                    <h4>
                      <a href="" title="">
                        {{ post.title }}
                      </a>
                    </h4>
                    <p>
                      {{ post.description.substring(0, 50) + '...' }}
                    </p>
                    <small class="firstsmall"
                      ><a
                        class="bg-orange"
                        href="tech-category-01.html"
                        title=""
                        >{{ post.category.type }}</a
                      ></small
                    >
                    <small
                      ><a href="" title=""
                        >{{ formatDate(post.created) }}
                      </a></small
                    >
                  </div>

                  <!-- end meta -->
                </div>
                <!-- end blog-box -->

                <hr class="invis" />
              </div>
              <!-- end blog-list -->
            </div>
            <!-- end page-wrapper -->

            <hr class="invis" />

            <div class="row">
              <div class="col-md-12">
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-start">
                    <li class="page-item">
                      <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
          <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div class="sidebar">
              <div class="widget">
                <div class="blog-list-widget">
                  <div class="list-group">
                    <div class="search">
                      <div
                        class="autocomplete text-center"
                        style="width: 300px"
                      >
                        <input
                          id="myInput"
                          v-model="search"
                          type="text"
                          placeholder="Search for Post"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end blog-list -->
              </div>
              <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-5">
                <div class="sidebar">
                  <div class="widget">
                    <h2 class="widget-title">Categories</h2>
                    <hr />
                    <div
                      v-for="category in categories"
                      :key="category._id"
                      class="blog-list-widget"
                    >
                      <div class="list-group">
                        <nuxt-link
                          :to="`/Client/${category._id}`"
                          type="submit"
                        >
                          <div class="w-100 justify-content-between">
                            <h5 class="mb-1">{{ category.type }}</h5>
                          </div>
                        </nuxt-link>
                      </div>
                    </div>
                    <!-- end blog-list -->
                  </div>
                  <!-- end widget -->
                </div>
                <!-- end sidebar -->
              </div>
              <!-- end widget -->
            </div>
            <!-- end sidebar -->
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
import NavBar from '@/components/Client/NavBar'
export default {
  components: {
    NavBar,
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('/api/posts')
      const catResponse = await $axios.$get('/api/categories')
      console.log(response)
      return {
        posts: response.posts,
        categories: catResponse.categories,
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return post.title.match(this.search)
      })
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
<style>
/* .autocomplete {
  margin-top: 107px;
   margin-left: 491px;
  margin-top: 61px;
} */
.autocomplete {
  position: relative;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type='text'] {
  background-color: #f1f1f1;
  width: 100%;
}

input[type='submit'] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 5px solid gray;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}
.space {
  margin-left: 80%;
}
</style>
