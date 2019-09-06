<template lang="pug">
div
  link(rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous")
  form#askname(@submit.prevent.stop="onSubmit")
    .form-group
      input.form-control(type="text" v-model="name" placeholder="لطفا نام خود را وارد کنید" autofocus)
    .form-group
      button.btn.btn-primary(type="submit") ورود
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: ""
    };
  },

  methods: {
    onSubmit() {
      if (!this.name || this.name.length === 0) {
        return;
      }

      this.$store.commit("updateName", this.name);
      this.$router.push("/");
    }
  }
});
</script>

<style lang="scss" scoped>
#askname {
  direction: rtl;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>