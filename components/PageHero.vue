<script setup lang="ts">
// Dark title band for shopping pages (cart, checkout), matching the product
// page's top band. Uses the .gz-dark token scope, so it stays dark in both themes.
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section class="page-hero gz-dark">
    <div class="container hero-inner">
      <div class="hero-text">
        <h1 class="hero-title">{{ title }}</h1>
        <p v-if="subtitle" class="hero-sub">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.aside" class="hero-aside">
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
  padding-block: 36px;
  background:
      radial-gradient(circle at 92% -20%, var(--gs-glow-lime), transparent 45%),
      radial-gradient(circle at 0% 140%, var(--gs-glow-green), transparent 50%),
      var(--gs-bg-2);
}

.hero-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
}

.hero-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  color: var(--gs-ink);
  font-family: var(--gs-font-heading);
  font-size: clamp(26px, 3.4vw, 40px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -.01em;
}

/* the same brand bar as the home category headings */
.hero-title::before {
  content: "";
  flex: none;
  width: 6px;
  height: 1em;
  border-radius: 6px;
  background: var(--gs-gradient);
}

.hero-sub {
  margin: 6px 0 0;
  padding-inline-start: 18px;
  color: var(--gs-muted);
  font-size: 15px;
}

@media (max-width: 575.98px) {
  .page-hero {
    padding-block: 24px;
  }
}
</style>
