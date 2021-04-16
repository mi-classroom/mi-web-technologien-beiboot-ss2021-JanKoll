<template>
  <div class="search">
    <input type="text" placeholder="Serach" />
  </div>
</template>

<script>
export default {
  name: 'Serach',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$midnight: #2c3e50;
$asphalt: #34495e;
$clouds: #ecf0f1;
$emerald: #2ecc71;
.search {
  border-bottom: .125rem solid $asphalt;
  padding: .5rem .5rem;
  input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size: 2rem;
    height: 3rem;
    color: $clouds;
    // &::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder {
    //   color: $asphalt;
    // }
  }
}
</style>
