<template>
  <div>
    <NavBar />
    <div class="search">
      <div class="autocomplete text-center" style="width: 300px">
        <input
          id="myInput"
          v-model="search"
          type="text"
          placeholder="Search for Categories"
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
                  List of categories <a href="#"><i class="fa fa-rss"></i></a>
                </h4>
              </div>
              <!-- end blog-top -->

              <div class="blog-list clearfix">
                <div class="blog-box row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(category, index) in filteredCategories"
                        :key="category._id"
                      >
                        <td>{{ category.type }}</td>
                        <td>
                          <nuxt-link
                            :to="`/categories/${category._id}`"
                            type="submit"
                            class="btn tw-button btn-primary"
                          >
                            Edit
                          </nuxt-link>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn dw-button btn-primary"
                            @click="onDeleteCategory(category._id, index)"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- end meta -->
                </div>
                <!-- end blog-box -->

                <hr class="invis" />
              </div>
              <!-- end blog-list -->
            </div>
            <!-- end page-wrapper -->

            <hr class="invis" />
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
      const response = await $axios.$get('/api/categories')
      return {
        categories: response.categories,
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
    title: 'TechBlog || Admin categories page',
    meta: [
      {
        hid: 'AdminCategories',
        name: 'AdminCategories',
        content: 'Admin Categories page which contains all categories',
      },
    ],
  },
  computed: {
    filteredCategories() {
      return this.categories.filter((category) => {
        return category.type.match(this.search)
      })
    },
  },
  methods: {
    onDeleteCategory(id, index) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You want to delete the category',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        closeOnCancel: true,
      }).then((result) => {
        // send request to server
        if (result.value) {
          const link = `/api/categories/${id}`
          axios.delete(link).then((response) => {
            this.categories.splice(index, 1)
          })
          this.$swal('Deleted!', 'Your category has been deleted!', 'success')
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
