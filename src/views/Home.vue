<template>
  <div class="home">
    <LaunchesList />
  </div>
</template>

<script>
// @ is an alias to /src
import LaunchesList from "@/components/LaunchesList.vue";

export default {
  name: "Home",

  data: () => {
    return {};
  },
  components: {
    LaunchesList,
  },
  created() {},
};
</script>
