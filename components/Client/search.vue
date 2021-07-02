<template>
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
</template>
<script>
export default {
  name: 'Search',
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
}
</script>
