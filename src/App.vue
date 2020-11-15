<template>
  <div id="nav">
    <router-link to="/">Home</router-link> | <router-link to="/stats">Stats</router-link> |
    <router-link to="/about">About</router-link> | <router-link to="/starlink">Starlink</router-link>
  </div>

  <div class="container">
    <template v-if="loading">
      Loading Data .... please wait
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => {
    return {
      // launches: [],
      // loading: true,
    };
  },

  created() {
    this.$store.dispatch("loadLaunches");
  },
  computed: {
    ...mapState({ loading: "loading" }),
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  letter-spacing: -0.01em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
