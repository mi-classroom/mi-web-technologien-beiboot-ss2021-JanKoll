<template>
  <div>
    {{ data }}
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      data: {}
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
        const headers = { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        fetch("http://localhost:3000", { 
          headers,
          // mode: 'cors' 
        })
          .then(response => response.json())
          .then(data => (this.data = data));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
 