<template>
  <div :class="'star star-' + size">
    <span
      class="star-item"
      v-for="(item, index) in starClass"
      :class="item"
      :key="index"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starClass() {
      const star = []
      for (let i = 0; i < Math.floor(this.score); i++) {
        star.push('on')
      }
      if (this.score * 10 - Math.floor(this.score) * 10 >= 5) {
        star.push('half')
      }
      while (star.length < 5) {
        star.push('off')
      }
      return star
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
                 .star //2x图 3x图
                   float left
                   font-size 0
                   .star-item
                     display inline-block
                     background-repeat no-repeat
                   &.star-48
                     .star-item
                       width 20px
                       height 20px
                       margin-right 22px
                       background-size 20px 20px
                       &:last-child
                         margin-right: 0
                       &.on
                         bg-image('../../assets/img/stars/star48_on')
                       &.half
                         bg-image('../../assets/img/stars/star48_half')
                       &.off
                         bg-image('../../assets/img/stars/star48_off')
                   &.star-36
                     .star-item
                       width 15px
                       height 15px
                       margin-right 6px
                       background-size 15px 15px
                       &:last-child
                         margin-right 0
                       &.on
                         bg-image('../../assets/img/stars/star36_on')
                       &.half
                         bg-image('../../assets/img/stars/star36_half')
                       &.off
                         bg-image('../../assets/img/stars/star36_off')
                   &.star-24
                     .star-item
                       width 10px
                       height 10px
                       margin-right 3px
                       background-size 10px 10px
                       &:last-child
                         margin-right 0
                       &.on
                         bg-image('../../assets/img/stars/star24_on')
                       &.half
                         bg-image('../../assets/img/stars/star24_half')
                       &.off
                         bg-image('../../assets/img/stars/star24_off')
</style>
