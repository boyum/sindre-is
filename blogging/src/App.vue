<template>
  <div id='app'>
    <header><nav></nav></header>
    <main>
      <router-view/>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,;
  margin: 0;
  padding: 0;
}

button,
input,
textarea,
select,
option {
  font-family: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>
