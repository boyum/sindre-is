<template>
  <h1>{{ article.title }}</h1>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchItem', route.params.id);
  },
  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id];
    },
  },
};
</script>
