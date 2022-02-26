import { createStore } from "vuex";
import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

const store = createStore({
  state: {
    venues: {},
    weather: {},
    errors: {},
  },
  mutations: {
    SET_WEATHER(state, payload) {
      state.weather = payload;
    },
    SET_VENUE(state, payload) {
      state.venues = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
  },
  actions: {
    async getData({ commit }, payload) {
      try {
        const { status, data } = await axios.get(`${url}show_data`, {
          params: { place: payload.place, venue: payload.venue },
        });

        if (status == 200) {
          commit("SET_WEATHER", data.weather);
          commit("SET_VENUE", data.venue.response.groups[0].items);
        }
      } catch (error) {
        commit("SET_ERRORS", error.response.data.errors);
      }
    },
  },
  getters: {
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
  },
});

export default store;
