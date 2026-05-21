<template>
  <img
    :src="emojiUrl"
    :alt="alt || emoji"
    :width="size"
    :height="size"
    class="openmoji"
    loading="lazy"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  emoji: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  alt: {
    type: String,
    default: ''
  }
})

const emojiUrl = computed(() => {
  const codepoint = emojiToCodepoint(props.emoji)
  return `https://cdn.jsdelivr.net/npm/openmoji@15.1/color/svg/${codepoint}.svg`
})

function emojiToCodepoint(emoji) {
  // Convert emoji to codepoints, removing FE0F (variation selector-16)
  // which OpenMoji doesn't use in filenames
  return [...emoji]
    .map(char => char.codePointAt(0))
    .filter(cp => cp !== 0xFE0F) // Remove variation selector
    .map(cp => cp.toString(16).toUpperCase())
    .join('-')
}
</script>

<style scoped>
.openmoji {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
