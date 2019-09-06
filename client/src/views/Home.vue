<template lang="pug">
#home
  l-map(:zoom="zoom" :center="center" :options="mapOptions")
    l-tile-layer(:url="url")
    template(v-for="(marker, index) in markers")
      l-marker(:lat-lng="marker" :key="index")
</template>

<script lang="ts">
import Vue from "vue";
import { latLng } from "leaflet";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      updateTimeout: undefined as number | undefined,
      zoom: 17,
      center: latLng(36.286514, 59.615716),
      markers: [],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      mapOptions: {
        zoomSnap: 0.0
      }
    };
  },

  methods: {
    init() {
      navigator.geolocation.watchPosition(this.onWatchPosition, console.warn, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    },

    onWatchPosition(pos: Position) {
      console.warn(pos.coords);

      axios.get(
        `http://localhost:3000/update?name=${this.$store.state.name}&lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
      );
    },

    update() {
      axios
        .get("http://localhost:3000/")
        .then(res => {
          this.markers = res.data;
          this.updateTimeout = setTimeout(() => this.update(), 1000);
        })
        .catch(e => {
          console.warn(e);
          this.updateTimeout = setTimeout(() => this.update(), 1000);
        });
    }
  },

  created() {
    this.onWatchPosition = this.onWatchPosition.bind(this);
  },

  beforeDestroy() {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = undefined;
    }
  },

  mounted() {
    this.init();
    this.update();
  }
});
</script>


<style lang="scss" scoped>
#home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>