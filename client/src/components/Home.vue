<template>
  <main>
    <div class="search">
      <input type="text" placeholder="Serach" v-model="search" v-on:keyup.enter="getSearch(search)" />
      <button class="search-btn" @click="getSearch(search)">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><path class="cls-1" d="M60.3,0A39.7,39.7,0,0,0,28.9,64L1.47,91.42a5,5,0,0,0,7.11,7.11L36,71.1A39.7,39.7,0,1,0,60.3,0Zm0,69.35A29.65,29.65,0,1,1,90,39.7,29.68,29.68,0,0,1,60.3,69.35Z"/></svg>
      </button>
    </div>

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
              <span class="child-value" v-for="viewChild in viewParent.children" :key="viewChild.name" @click="setImage(viewChild)">{{viewChild.name}}</span>
            </div>
          </div>
        </div>
        <div class="image-view">
          <img class="image" :src="baseUrl + currentImg.path.replace('..', '')" :alt="currentImgData.name">
          <div class="metadata-toggle" @click="metaActive = !metaActive">
            <span v-if="metaActive">x</span>
            <span v-else>i</span>
          </div>
          <div class="metadata" :class="{ active: metaActive }">
              <div class="metadata-parent" v-for="meatParantCategory in Object.keys(currentImg.meta)" :key="meatParantCategory">
                <span class="metadata-parent-title">{{meatParantCategory}}</span>
                <div class="metadata-category" v-for="meatCategory in Object.keys(currentImg.meta[meatParantCategory])" :key="meatCategory">
                  <span class="metadata-child" v-if="currentImg.meta[meatParantCategory][meatCategory].description !== ''">
                    <b>{{meatCategory}}</b>: {{currentImg.meta[meatParantCategory][meatCategory].description}}
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { env } from '../env'
export default {
  name: 'Home',
  props: {
  },
  data () {
    return {
      data: Object,
      currentImg: undefined,
      currentImgData: undefined,
      metaActive: false,
      baseUrl: env.baseUrl
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
      fetch(env.baseUrl, {
        headers,
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => (this.data = data))
    },
    async getSearch (parameter) {
      console.log(parameter)
      if (parameter === undefined || parameter === '') {
        this.getData()
      } else {
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
        fetch(env.baseUrl + '/search/' + parameter, {
          headers,
          mode: 'cors'
        })
          .then(response => response.json())
          .then(data => (this.data = data))
      }
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
.search {
  border-bottom: .125rem solid $asphalt;
  padding: .5rem .5rem;
  position: relative;
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
  .search-btn {
    background: unset;
    border: unset;
    outline: unset;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    &:hover {
      cursor: pointer;
    }
    svg {
      height: 2rem;
      width: 2rem;
      fill: $clouds;
    }
  }
}
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
      z-index: 10;
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
    position: relative;
    justify-content: center;
    .image {
      align-self: center;
    }
  }
  .metadata-toggle {
    position: absolute;
    z-index: 2;
    right: 0;
    margin: .5rem;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    text-align: center;
    box-sizing: border-box;
    // border-radius: 100%;
    border: 1px solid $clouds;
    background: rgba(black, .5);
    font-weight: bold;
    font-size: 1.5rem;
    &:hover {
      cursor: pointer;
    }
  }
  .metadata {
    &.active {
      display: block;
    }
    display: none;
    margin: .5rem;
    position: absolute;
    right: 0;
    background: rgba(black, .5);
    padding: 1rem .5rem;
    max-width: 25rem;
    .metadata-parent {
      &:not(:last-child) {
        margin-bottom: .5rem;
      }
      &:not(:first-child) {
        margin-top: 1rem;
      }
      .metadata-parent-title {
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: .25rem;
        padding-bottom: .25rem;
        display: block;
        border-bottom: 1px solid $asphalt;
        font-size: 1.25rem;
      }
    }
    .metadata-category {
      &:not(:last-child) .metadata-child {
        margin-bottom: .5rem;
        display: block;
      }
    }
  }
}
</style>
