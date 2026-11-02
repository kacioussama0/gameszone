<script setup lang="ts">
// Brand category logo: round charcoal tile with lime glows in two corners, a thin
// outer ring, a thick gradient ring and the category's icon in gradient. Pure CSS, so it stays
// sharp at any size and follows the design-system tokens.
const props = defineProps<{
  // Icon uploaded in WordPress (transparent, or on a plain background). Only its
  // shape is used: it's painted with the brand gradient.
  image?: string | null
}>()

// Same-origin mask with the background removed (server/api/category-icon.get.ts)
const maskUrl = computed(() => props.image ? `url("/api/category-icon?src=${encodeURIComponent(props.image)}")` : null)
</script>

<template>
  <span class="cat-logo" aria-hidden="true">
    <span class="ring-thin"></span>
    <span class="ring-fill"></span>
    <span class="ring-thick"></span>
    <span v-if="maskUrl" class="icon" :style="{ '--icon-mask': maskUrl }"></span>
  </span>
</template>

<style scoped>
.cat-logo {
  container-type: inline-size;
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  background:
      radial-gradient(circle at 88% 12%, var(--gs-glow-lime), transparent 45%),
      radial-gradient(circle at 12% 88%, var(--gs-glow-green), transparent 45%),
      color-mix(in srgb, var(--gs-surface-dark) 82%, transparent);
  isolation: isolate;
}

/* thin ring just outside the thick one */
.ring-thin {
  position: absolute;
  inset: 12%;
  border: max(1px, .6cqw) solid var(--gs-green);
  border-radius: 50%;
}

/* thick gradient ring: the gradient is cut to a band with a radial mask */
.ring-thick {
  position: absolute;
  inset: 16%;
  border-radius: 50%;
  background: var(--gs-gradient);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 7cqw), #000 calc(100% - 7cqw + 1px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 7cqw), #000 calc(100% - 7cqw + 1px));
}

/* soft green light inside the ring, strongest at the bottom */
.ring-fill {
  position: absolute;
  inset: 16%;
  border-radius: 50%;
  background: linear-gradient(180deg, transparent 45%, var(--gs-glow-green));
  opacity: .6;
}

.icon {
  position: relative;
  z-index: 1;
  /* wider than tall: square icons keep their size, wordmarks get room inside the ring */
  width: 46cqw;
  height: 36cqw;
  background: linear-gradient(135deg, var(--gs-green), var(--gs-lime));
  -webkit-mask: var(--icon-mask) center / contain no-repeat;
  mask: var(--icon-mask) center / contain no-repeat;
}
</style>
