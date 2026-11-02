<script setup lang="ts">
// Small product picture, or the smiling mascot when the product has none (or it fails to load)
const props = withDefaults(defineProps<{
  src?: string | null
  alt?: string
  size: number
  loading?: 'lazy' | 'eager'
}>(), {
  alt: '',
  loading: 'lazy',
})

const failed = ref(false)
watch(() => props.src, () => (failed.value = false))

// A load error that happened before hydration never reaches @error
const img = ref<HTMLImageElement | null>(null)
onMounted(() => {
  if (img.value?.complete && !img.value.naturalWidth) failed.value = true
})
</script>

<template>
  <img
      v-if="src && !failed"
      ref="img"
      :src="src"
      :alt="alt"
      :width="size"
      :height="size"
      :loading="loading"
      @error="failed = true"
  />
  <span
      v-else
      class="thumb-mascot"
      :style="{ width: `${size}px`, height: `${size}px` }"
      role="img"
      :aria-label="alt || undefined"
  >
    <AstroBot head mood="happy" :size="Math.round(size * .78)" />
  </span>
</template>

<style scoped>
.thumb-mascot {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: inherit;
  background: var(--gs-surface);
}
</style>
