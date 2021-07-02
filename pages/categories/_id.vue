<template>
  <!-- Updatings a category form -->
  <div>
    <NavBar />
    <section id="nav-top" class="section">
      <div class="container">
        <h1 class="text-center">Add Category</h1>
        <form>
          <!-- Category dropdown -->
          <div
            class="col mb-3"
            :class="{ 'form-group--error': $v.type.$error }"
          >
            <input
              v-model.trim="$v.type.$model"
              type="text"
              class="form-control"
              style="width: 100%"
              :placeholder="category.type"
            />
            <div v-if="!$v.type.minLength" class="error">
              Category type must have at least
              {{ $v.type.$params.minLength.min }} letters.
            </div>
            <div v-if="!$v.type.maxLength" class="error">
              Category type must have at least
              {{ $v.type.$params.maxLength.max }} letters.
            </div>
          </div>
          <!-- Button -->
          <hr />
          <div
            v-if="!$v.type.required || !$v.type.minLength || !$v.type.maxLength"
            class="col"
          >
            <button class="btn btn-primary" :disabled="!isActive">
              Add Category
            </button>
          </div>
          <div v-else class="col">
            <button
              class="btn btn-primary"
              :disabled="isActive"
              @click="onUpdateCategory"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import NavBar from '@/components/Admin/NavBar'
export default {
  components: {
    NavBar,
  },
  validations: {
    type: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(10),
    },
  },
  mixins: [validationMixin],
  async asyncData({ $axios, params }) {
    try {
      const category = $axios.$get(`/api/categories/${params.id}`)
      // const post = $axios.$get(`http://localhost:3000/api/posts/${params.id}`)
      const [catResponse] = await Promise.all([category])
      console.log(catResponse)

      return {
        category: catResponse.category,
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      type: '',
      isActive: false,
    }
  },
  methods: {
    async onUpdateCategory() {
      const data = {
        type: this.type,
      }
      this.$swal('Successfully Updated')

      const result = await this.$axios.$put(
        `/api/categories/${this.$route.params.id}`,
        data
      )
      console.log(result)
      this.$router.push('/Admin/adminhome')
    },
  },
}
</script>
