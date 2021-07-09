<template>
  <!-- creating post data -->
  <div>
    <NavBar />
    <section id="nav-top" class="section">
      <div class="container">
        <h1 class="text-center">Add Post</h1>
        <form>
          <!-- Category DropDown -->
          <div class="col mb-3">
            <label>Select category</label>
            <select
              v-model="categoryID"
              class="form-select form-control"
              aria-label="Default select example"
            >
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
                required
              >
                {{ category.type }}
              </option>
            </select>
          </div>

          <!-- Title dropdown -->
          <div class="col mb-3">
            <label style="margin-bottom: 0px">Title: </label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="Enter the title"
              style="width: 100%"
            />
          </div>
          <!-- description dropdown -->
          <div class="col mb-3">
            <label style="margin-bottom: 0px">Description </label>
            <textarea
              v-model="description"
              type="text"
              class="form-control"
              placeholder="Description of the blog"
              style="height: 100px"
            />
          </div>

          <!-- Photo file -->
          <div class="col mb-3">
            <label style="margin-bottom: 0px">Add Photo: </label>
            <div class="a-row a-spacing-top-medium">
              <label class="choosefile-button">
                <input type="file" required @change="onFileSelected" />
                <p style="margin-top: -70px">{{ fileName }}</p>
              </label>
            </div>
          </div>
          <!-- Button -->
          <hr />
          <div class="col">
            <button type="submit" class="btn btn-primary" @click="onAddPost">
              Add post
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/Admin/NavBar'
export default {
  components: {
    NavBar,
  },
  async asyncData({ $axios }) {
    try {
      const categories = $axios.$get('/api/categories')

      const [catResponse] = await Promise.all([categories])
      return {
        categories: catResponse.categories,
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      title: '',
      categoryID: null,
      description: '',
      selectedFile: '',
      fileName: '',
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
      this.fileName = event.target.files[0].name
    },
    async onAddPost() {
      try {
        const data = new FormData()
        data.append('title', this.title)
        data.append('description', this.description)
        data.append('categoryID', this.categoryID)
        data.append('photo', this.selectedFile, this.selectedFile.name)
        this.$swal('Successfully added')
        const result = await this.$axios.$post('/api/posts', data)
        this.$router.push('/Admin/adminhome')

        console.log(result)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
#nav-top {
  margin-top: 10px;
}
</style>
