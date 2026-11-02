<script setup lang="ts">
// Accepted payment methods as small brand chips (footer). Logos sit on white
// chips so they keep their real colours on the dark footer; the name is always
// shown since several methods share the Algérie Poste logo.
</script>

<template>
  <ul class="pay-logos" :aria-label="$t('footer.payments')">
    <li v-for="m in PAY_METHODS" :key="m.title" class="pay-logo">
      <img v-if="m.logo" :src="m.logo" alt="" loading="lazy" decoding="async" />
      <i v-else :class="m.icon" aria-hidden="true"></i>
      <span>{{ m.title }}</span>
    </li>
  </ul>
</template>

<style scoped>
.pay-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pay-logo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 4px 10px;
  border-radius: 6px;
  background: #fff;
  color: #1a1a1a;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.pay-logo img {
  display: block;
  width: auto;
  height: 18px;
}

.pay-logo i {
  color: var(--gs-primary);
  font-size: 13px;
}
</style>
