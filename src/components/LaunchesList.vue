<template>
  <div>
    <div class="filters">
      <span v-bind:class="$store.state.launch_list_filter === 'all' ? 'active' : ''" @click="showAll">All</span> |
      <span v-bind:class="$store.state.launch_list_filter === 'past' ? 'active' : ''" @click="showPast">Past</span>
      |
      <span v-bind:class="$store.state.launch_list_filter === 'upcoming' ? 'active' : ''" @click="showUpcoming"
        >Upcoming</span
      >
    </div>

    <div v-if="filtered_data.length === 0">Loading</div>
    <div v-else>
      <span class="count">{{ filtered_data.length }} launches</span>
      <div id="launches">
        <LaunchCard v-bind:data="launch" v-for="launch in filtered_data" v-bind:key="launch.flight_number" />
      </div>
    </div>
  </div>
</template>

<script>
import LaunchCard from "./LaunchCard.vue";
export default {
  name: "LaunchesList",
  components: { LaunchCard },
  data: () => {
    return {
      foo: "hello FOO",
      filter: "upcoming",
    };
  },
  props: ["launches"],

  // created() {
  //   this.$store.dispatch("loadLaunches");
  // },
  computed: {
    filtered_data() {
      switch (this.$store.state.launch_list_filter) {
        case "upcoming":
          return this.$store.state.launches.filter((value) => value.upcoming === true);
        case "past":
          return this.$store.state.launches.filter((value) => value.upcoming !== true);
        case "all":
          return this.$store.state.launches;
        default:
          return [];
      }
    },
  },
  methods: {
    showUpcoming() {
      // this.filter = "upcoming";
      this.$store.commit("setListFilter", "upcoming");
    },
    showPast() {
      // this.filter = "past";
      this.$store.commit("setListFilter", "past");
    },
    showAll() {
      // this.filter = "all";
      this.$store.commit("setListFilter", "all");
    },
  },
};
</script>

<style lang="scss" scoped>
#launches {
  display: grid;
  column-gap: 1em;
  row-gap: 1em;
  // max-width : 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.count {
  display: block;

  text-align: right;
}
.filters {
  margin-bottom: 2em;
  span {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &.active {
      font-weight: bolder;
    }
  }
}
</style>
