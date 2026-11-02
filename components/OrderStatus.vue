<script setup lang="ts">
const props = defineProps<{ status: string }>()

// WooCommerce status -> label key + tone
const TONES: Record<string, string> = {
  pending: 'warn',
  'on-hold': 'warn',
  failed: 'danger',
  cancelled: 'muted',
  refunded: 'muted',
  processing: 'info',
  completed: 'success',
}

const tone = computed(() => TONES[props.status] || 'muted')
</script>

<template>
  <span class="order-status" :class="`is-${tone}`">
    <span class="dot" aria-hidden="true"></span>
    {{ $te(`account.status.${status}`) ? $t(`account.status.${status}`) : status }}
  </span>
</template>

<style scoped>
.order-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  white-space: nowrap;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.is-success { background: var(--gs-success-soft); color: var(--gs-success); }
.is-info { background: rgba(107, 181, 66, .14); color: var(--gs-primary); }
.is-warn { background: var(--gs-warning-soft); color: var(--gs-warning); }
.is-danger { background: var(--gs-danger-soft); color: var(--gs-danger); }
.is-muted { background: var(--gs-surface); color: var(--gs-muted); }
</style>
