<template>
  <div>Sarlink Content</div>
</template>

<script>
export default {
  name: "Starlink",
  mounted() {
    this.$store.dispatch("loadStarlinkData");
  },
};
</script>

<style lang="scss" scoped></style>
