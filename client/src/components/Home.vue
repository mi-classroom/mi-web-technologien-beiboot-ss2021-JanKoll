<template>
  <div class="image-wrapper">
    <ul class="image-nav">
      <li v-for="image in data" :key="image.name" @click="getImage(image.name)">
        {{ image.name }}
      </li>
    </ul>
    <div class="image-preview" v-if="currentImgData">
      <div class="image-view-nav">
        <div class="image-view-nav-parent" v-for="viewParent in currentImgData.children" :key="viewParent.name">
          <span class="parent-value">{{viewParent.name}}</span>

          <div class="image-view-nav-child" >
            <span class="child-value" v-for="viewChild in viewParent.children" :key="viewChild.name" @click="setImage(viewChild)"
            >{{viewChild.name}}</span>
          </div>
        </div>
      </div>
      <div class="image-view">
        <img class="image" :src="'http://localhost:3000/' + currentImg.path" :alt="currentImgData.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
  },
  data () {
    return {
      data: Object,
      currentImg: undefined,
      currentImgData: undefined
    }
  },
  beforeMount () {
    this.getData()
  },
  methods: {
    async getData () {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      fetch('http://localhost:3000', {
        headers,
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => (this.data = data))
    },
    getImage (image) {
      const item = this.data.filter(function (elem) { if (elem.name === image) return elem })[0]
      this.currentImgData = item
      this.currentImg = item.children[0].children[0]
    },
    setImage (image) {
      this.currentImg = image
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$midnight: #2c3e50;
$asphalt: #34495e;
$clouds: #ecf0f1;
$emerald: #2ecc71;
.image-wrapper {
  display: flex;
  .image-nav {
    padding: .5rem;
    border-right: .125rem solid $asphalt;
    min-width: 15rem;
    li {
      padding: .25rem 0;
      &:first-child {
        padding-top: 0;
      }
      &.active, &:hover {
        color: $emerald;
        cursor: pointer;
      }
    }
  }
  .image-preview {
    width: 100%;
    .image-view-nav {
      display: flex;
      width: 100%;
      align-content: stretch;
      position: relative;
      border-bottom: .125rem solid $asphalt;
      height: 4rem;

      .image-view-nav-parent {
        font-weight: bold;
        flex-grow: 1;
        background: $midnight;
        position: relative;
        .parent-value {
          line-height: 4rem;
          padding: 0 .5rem;
          font-size: 1.5rem;
          display: block;
          &.active, &:hover {
            color: $emerald;
            cursor: pointer;
          }
        }
        &:not(:last-child) {
          border-right: .125rem solid $asphalt;
        }
        &:last-child .image-view-nav-child {
          border-right: none;
          right: 0;
        }
        &:hover .image-view-nav-child {
          display: block;
        }
        .image-view-nav-child {
          border: .125rem solid $asphalt;
          display: none;
          position: absolute;
          left: -.125rem;
          right: -.125rem;
          font-size: 1rem;
          line-height: 1.5;
          height: unset;
          background: $midnight;
          .child-value {
            padding: .25rem .5rem;
            display: block;
            &.active, &:hover {
              color: $emerald;
              cursor: pointer;
            }
          }
          &:hover {
            display: block;
          }
        }
      }
    }
  }
  .image-view {
    height: 100%;
    display: flex;
    justify-content: center;
    .image {
      align-self: center;
    }
  }
}
</style>
