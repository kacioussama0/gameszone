<script setup lang="ts">
import Header3 from "~/components/Header3.vue";

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="site-header mo-left header style-2">
    <Header3 />
  </header>

  <div class="page-content auth-page gz-pattern">
    <div class="container">
      <section class="auth-card">
        <div class="auth-head">
          <AstroBot mood="happy" :size="76" />
          <h1>{{ title }}</h1>
          <p v-if="subtitle">{{ subtitle }}</p>
        </div>

        <slot />
      </section>

      <slot name="after" />
    </div>
  </div>
</template>

<style scoped>
/* PlayStation-style sign-in: one centred card on a soft background */
.auth-page {
  --gs-pattern-opacity: .07;
  padding-block: 48px 64px;
  background:
      radial-gradient(circle at 50% 0%, rgba(107, 181, 66, .14), transparent 55%),
      var(--gs-surface);
}

.auth-card {
  max-width: 460px;
  margin-inline: auto;
  padding: 32px 28px;
  border-radius: 24px;
  background: var(--gs-bg-1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, .08);
}

.auth-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
  text-align: center;
}

.auth-head h1 {
  margin: 8px 0 0;
  font-size: clamp(24px, 3vw, 28px);
}

.auth-head p {
  margin: 0;
  color: var(--gs-muted);
  font-size: 14.5px;
}

@media (max-width: 575.98px) {
  .auth-page {
    padding-block: 24px 40px;
  }

  .auth-card {
    padding: 24px 18px;
    border-radius: 20px;
  }
}
</style>
