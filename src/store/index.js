import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    foo: "hello Foo ! ;)",
    launches: [],
    launch_list_filter: "upcoming",
    loading: true,
    starlink_raw_data: "",
    satellites_infos: [],
  },
  mutations: {
    loadLaunches(state, payload) {
      state.launches = payload;
      state.loading = false;
      // console.log(state.loading);
    },
    loadStarlinkData(state, payload) {
      state.starlink_raw_data = payload;
      // console.log(state.starlink_raw_data);
    },
    setListFilter(state, payload) {
      state.launch_list_filter = payload;
      // console.log(state.launch_list_filter);
    },
    setSatellitesInfos(state, payload) {
      state.satellites_infos = payload;
      // console.log(state.satellitesInfos);
    },
  },
  actions: {
    loadLaunches(context) {
      let local_launches = window.localStorage.getItem("launches");
      let local_launches_date = window.localStorage.getItem("launches_date");
      let local_launches_date_expiry = 5 * 60 * 1000;
      // console.log(local_launches_date);
      let time_diff = new Date().getTime() - new Date(local_launches_date).getTime();

      // console.log(time_diff);
      let launch_data_has_expired = time_diff > local_launches_date_expiry;
      if (window)
        if (local_launches == null || launch_data_has_expired) {
          if (launch_data_has_expired) console.log("data has expired, reloading");
          axios.get("https://api.spacexdata.com/v3/launches").then((response) => {
            // console.log(response.data)
            context.commit("loadLaunches", response.data);
            window.localStorage.setItem("launches", JSON.stringify(response.data));
            window.localStorage.setItem("launches_date", new Date().toISOString());
          });
        } else {
          context.commit("loadLaunches", JSON.parse(window.localStorage.getItem("launches")));
          console.log("Loaded Data from LocalStorage");
        }
    },

    loadStarlinkData(context) {
      let local_starlink = window.localStorage.getItem("starlink_raw_data");
      let local_starlink_date = window.localStorage.getItem("starlink_raw_data_date");
      let local_starlink_date_expiry = 5 * 60 * 1000;
      // console.log(local_starlink_date);
      let time_diff = new Date().getTime() - new Date(local_starlink_date).getTime();

      console.log(time_diff);
      let starlink_data_has_expired = time_diff > local_starlink_date_expiry;
      if (local_starlink == null || starlink_data_has_expired) {
        if (starlink_data_has_expired) console.log("Starlink data has expired, reloading");
        axios.get("php/loadStarlinkData.php").then((response) => {
          context.commit("loadStarlinkData", response.data);
          window.localStorage.setItem("starlink_raw_data", response.data);
          window.localStorage.setItem("starlink_raw_data_date", new Date().toISOString());
        });
      } else {
        context.commit("loadStarlinkData", local_starlink);
        console.log("Loaded Starlink Raw Data from LocalStorage");
      }
    },

    setSatellitesInfos(context, payload) {
      context.commit("setSatellitesInfos", payload);
    },
  },
  modules: {},
  getters: {
    getLaunches: (state) => state.launches,
    getUpcomingLaunches: (state) => state.launches.filter((value) => value.upcoming === true),
    // getStarlinkRawData: (state) => state.starlink_raw_data,
  },
});
