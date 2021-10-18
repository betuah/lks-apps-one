<template>
  <v-app dark fill-height>
    <div class="d-flex flex-column align-center my-auto">
      <h1 v-if="error.statusCode === 404" class="text-h1 grey--text text--darken-1 font-weight-thin">
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="text-h1 grey--text text--darken-1 font-weight-thin">
        {{ otherError }}
      </h1>
      <v-btn class="white--text mt-4" color="grey lighten-1" @click="goBack()">
        <v-icon left>arrow_back</v-icon>
        Go Back
      </v-btn>
    </div>
    
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An Error Occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
