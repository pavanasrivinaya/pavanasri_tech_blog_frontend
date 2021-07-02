<template>
  <!-- Creating a category form -->
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
              placeholder="Add Category:"
              style="width: 100%"
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
              @click="onAddCategory"
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
      minLength: minLength(4),
      maxLength: maxLength(15),
    },
  },
  mixins: [validationMixin],
  data() {
    return {
      type: '',
      isActive: false,
    }
  },
  methods: {
    async onAddCategory() {
      const data = {
        type: this.type,
      }
      this.$swal('Successfully added')

      const response = await this.$axios.$post('/api/categories', data)
      console.log(response)
    },
  },
}
</script>

<style>
#nav-top {
  margin-top: 10px;
}

.error {
  color: red;
}
</style>
