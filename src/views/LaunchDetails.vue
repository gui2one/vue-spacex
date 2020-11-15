<template>
  <div>
    <div>Launch details</div>

    <div v-if="details_data">
      <h1>{{ launch_data.mission_name }}</h1>

      <p>{{ launch_data.details }}</p>

      <Gallery :slides="slides" />

      <!-- <div class="owl-carousel">
        <img v-for="img in launch_data.links.flickr_images" v-bind:key="img" :src="img" alt="" >
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Gallery from "../components/Gallery";
export default {
  name: "LaunchDetails",
  components: { Gallery },
  props: ["flight_number"],
  data() {
    return {
      options: {
        rewind: true,
        width: 800,
        gap: "1rem",
      },
      // slides: [
      //   { src: "https://unsplash.it/500?image=124", alt: "picture 1" },
      //   { src: "https://unsplash.it/500?image=125", alt: "picture 1" },
      //   { src: "https://unsplash.it/500?image=126", alt: "picture 1" },
      //   { src: "https://unsplash.it/500?image=127", alt: "picture 1" },
      // ],
    };
  },

  methods: {
    remove_underscores(string_value) {
      return string_value.replaceAll("_", " ");
    },
  },
  computed: {
    ...mapState({ launches: "launches" }),
    launch_data() {
      return this.launches.filter((value) => value.flight_number == this.flight_number)[0];
    },
    details_data() {
      let d = this.launch_data;
      let obj = {
        flight_number: d.flight_number,
        launch_date: d.launch_date_utc,
      };
      if (d.launch_success != null) {
        obj.launch_success = d.launch_success;
      }
      if (d.links.mission_patch_small != null) {
        obj.mission_patch_small = d.links.mission_patch_small;
      }
      if (d.links.flickr_images.length > 0) {
        obj.flickr_images = d.links.flickr_images;
      }

      return obj;
    },
    slides() {
      let ret = [];
      if (this.launch_data.links.flickr_images.length > 0) {
        for (let i = 0; i < this.launch_data.links.flickr_images.length; i++) {
          ret.push({ src: this.launch_data.links.flickr_images[i], alt: "flicker picture" });
        }
      }
      return ret;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail_container {
  display: flex;
  padding: 0.25em;
  margin: 0.25em;
  outline: 1px solid rgba(black, 0.05);
}
.detail_name {
  // position : absolute;
  width: 200px;
  min-width: 200px;
  // background: #eee;
  text-align: right;
  left: 0px;
  top: 0px;

  &::after {
    content: " : \00a0";
  }
}

.detail_value {
  text-align: left;
}
</style>
