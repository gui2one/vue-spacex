<template>
  <div class="card" @mouseover="b_hover = true" @mouseleave="b_hover = false">
    <div class="details">
      <h3 class="mission_name">{{ data.mission_name }}</h3>
      <p class="block-ellipsis">{{ data.details }}</p>

      <p class="date">flight number :{{ data.flight_number }}</p>
      <div v-if="!data.is_tentative">
        <p class="date" v-html="launch_date"></p>
      </div>
      <div v-else>
        <p class="tbd">TBD</p>
      </div>
    </div>
    <div v-if="data.links.mission_patch_small" class="image-container">
      <img v-bind:src="data.links.mission_patch_small" alt="mission patch" loading="lazy" />
    </div>
    <div v-else class="image-container">
      <img src="placeholder_patch.png" alt="mission patch placeholder" loading="lazy" />
    </div>
    <div class="link" v-bind:class="b_hover ? '' : 'hidden'">
      <router-link :to="`/details/${data.flight_number}`">
        Read Details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LaunchCard",
  props: {
    data: Object,
  },
  data: () => {
    return {
      now_millis: new Date().getTime(),
      b_hover: false,
    };
  },
  created() {
    setInterval(() => {
      this.now_millis = new Date().getTime();
    }, 5000);
  },
  computed: {
    launch_date() {
      let diff = this.now_millis - new Date(Date.parse(this.data.launch_date_utc)).getTime();
      let post_fix = "ago";
      if (diff < 0) {
        diff *= -1;
        post_fix = "";
      }
      let years = Math.floor(diff / 365.25 / 24 / 60 / 60 / 1000);
      diff -= years * 365.25 * 24 * 60 * 60 * 1000;
      let months = Math.floor(diff / 31 / 24 / 60 / 60 / 1000);
      diff -= months * 31 * 24 * 60 * 60 * 1000;
      let weeks = Math.floor(diff / 7 / 24 / 60 / 60 / 1000);
      diff -= weeks * 7 * 24 * 60 * 60 * 1000;
      let days = Math.floor(diff / 24 / 60 / 60 / 1000);
      diff -= days * 24 * 60 * 60 * 1000;
      let hours = Math.floor(diff / 60 / 60 / 1000);
      diff -= hours * 60 * 60 * 1000;
      let minutes = Math.floor(diff / 60 / 1000);
      diff -= minutes * 60 * 1000;
      let seconds = Math.floor(diff / 1000);

      let str = "";
      if (years > 0) str += "<strong>" + years + "</strong>y ";
      if (years < 1) {
        if (months > 0) str += "<strong>" + months + "</strong>m ";
        if (weeks > 0) str += "<strong>" + weeks + "</strong>w ";
        if (days > 0) str += "<strong>" + days + "</strong>d ";

        if (hours > 0) str += "<strong>" + hours + "</strong>h ";
        if (minutes > 0) str += "<strong>" + minutes + "</strong>mn ";
        if (seconds > 0) str += "<strong>" + seconds + "</strong>s ";
      }
      return str + " " + post_fix;
    },
  },
  methods: {
    onMouseOver(event) {
      console.log(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: row;
  outline: 1px solid rgba(black, 0.05);
  // height : 150px;
  overflow: hidden;
  // margin : .3em;
  // background: linear-gradient(30deg,  lightblue, white);
  background: #fafafa;
  text-align: left;
  padding-left: 1em;

  box-shadow: 2px 2px 5px rgba(black, 0.1);
}

.card .mission_name {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card .details {
  // flex-basis: 60%;
  max-width: 60%;
  width: 100%;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .date {
    font-size: 0.9em;
  }
}
.card .image-container {
  width: 200px;
  // background: pink;
  position: relative;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.block-ellipsis {
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 43px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card .link {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 30px;
  background: white;
  left: 0px;
  bottom: 0px;

  z-index: 2;
  transition: transform 0.3s;
  a {
    padding-right: 1em;
    display: block;
    width: 100%;
    color: inherit;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &.hidden {
    transform: translateY(30px);
  }
}
@media screen and (min-width: 500px) {
  .card {
    // max-width : 500px;
    // background : red;
  }
}
</style>
