<template>
  <div id="statistics">
    <h3>Statistics</h3>
    <span>
      Launches :
      <span v-bind:style="{ color: 'green', fontWeight: 'bold' }">{{ getSuccessNum }}</span> /
      <span v-bind:style="{ color: 'red', fontWeight: 'bold' }">{{ getFailureNum }}</span>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Stats",
  computed: {
    ...mapState({
      launches: "launches",
    }),
    getSuccessNum() {
      let success_num = this.launches.filter((value) => {
        return value.launch_success == true && value.upcoming == false;
      }).length;

      return success_num;
    },
    getFailureNum() {
      let failure_num = this.launches.filter((value) => {
        return value.launch_success == false && value.upcoming == false;
      }).length;
      return failure_num;
    },
  },
};
</script>

<style lang="scss" scoped></style>
