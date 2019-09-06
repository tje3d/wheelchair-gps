import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence<{ name: string }>({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    name: '',
  },
  mutations: {
    updateName(state, value: string) {
      state.name = value;
    },
  },
  actions: {},
});
