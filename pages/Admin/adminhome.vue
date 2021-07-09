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
                  List of Blogs <a href="#"><i class="fa fa-rss"></i></a>
                </h4>
              </div>
              <!-- end blog-top -->

              <div class="blog-list clearfix">
                <div
                  v-for="(post, index) in filteredPosts"
                  :key="post._id"
                  class="blog-box row"
                >
                  <div class="col-md-4">
                    <div class="post-media">
                      <a href="" title="">
                        <img
                          :src="`https://pavanatechblog.herokuapp.com/uploads/${post.photo}`"
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
                      <nuxt-link :to="`/Adminposts/${post._id}`" title="">
                        {{ post.title }}
                      </nuxt-link>
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
                    <nuxt-link
                      :to="`/posts/${post._id}`"
                      type="submit"
                      class="btn tw-button btn-primary"
                    >
                      Edit
                    </nuxt-link>
                    <button
                      type="submit"
                      class="btn dw-button btn-primary"
                      @click="onDeletePost(post._id, index)"
                    >
                      Delete
                    </button>
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
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>
  </div>
</template>
<script>
import NavBar from '@/components/Admin/NavBar'
import * as axios from 'axios'
export default {
  components: {
    NavBar,
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('/api/posts')
      console.log(response)
      return {
        posts: response.posts,
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
  head: {
    title: 'TechBlog || AdminHomepage',
    meta: [
      {
        hid: 'AdminHomePage',
        name: 'AdminHomePage',
        content: 'Admin home page which contains the posts',
      },
    ],
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
    onDeletePost(id, index) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        closeOnCancel: true,
      }).then((result) => {
        // send request to server
        if (result.value) {
          const link = `/api/posts/${id}`
          axios.delete(link).then((response) => {
            this.posts.splice(index, 1)
          })
          this.$swal('Deleted!', 'Your post has been deleted!', 'success')
        }
      })
    },
  },
}
</script>
<style>
.autocomplete {
  margin-top: 107px;
}
.autocomplete {
  position: relative;
  display: inline-block;
  margin-left: 491px;
  margin-top: 61px;
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
</style>
