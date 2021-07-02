<template>
  <div>
    <NavBar />
    <section class="section">
      <div class="container">
        <h1>About the website</h1>
        <p>
          In this website you can find the blogs on the technologies like
          vue.js, node.js, python, django etc.,
        </p>
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
