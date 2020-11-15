<template>
  <div id="modal" class="hidden">
    <div class="close_btn" @click="closeModal">X</div>
    <img id="gallery_zoom_img" src="" alt="" />
  </div>
  <div id="gallery">
    <div class="image-container" @click="openModal(index)" v-for="(slide, index) in slides" :key="slide">
      <img :src="slide.src" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  props: ["slides"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.slides);
    this.modal = document.getElementById("modal");
    this.img_node = document.getElementById("gallery_zoom_img");

    // console.log(this.img_node);
  },
  methods: {
    openModal(index) {
      console.log(index);
      this.modal.classList.remove("hidden");
      this.img_node.setAttribute("src", this.slides[index].src);
    },
    closeModal() {
      this.modal.classList.toggle("hidden");
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
#modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: rgba(black, 0.8);

  &.hidden {
    display: none;
  }
  .close_btn {
    position: absolute;
    right: 20px;
    top: 10px;
    color: white;
    font-weight: bold;
    font-size: 2em;
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.5;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

#gallery {
  //   background: hotpink;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.3em;
}

.image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}
</style>
