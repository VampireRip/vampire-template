<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'template',
  data() {
    return {};
  },
  beforeMount() {

  },
  mounted() {

  },
  destroyed() {

  },
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapMutations({}),
  },
};

</script>

<style scoped lang="scss">

</style>

<template>
<div :id="$options.name" :class="$options.name">

</div>
</template>
