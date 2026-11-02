<script setup lang="ts">
import Header3 from "~/components/Header3.vue";

defineProps<{
  title: string
}>()

const { account, initials, logout } = useAccount()
const route = useRoute()

const links = [
  { to: '/account', icon: 'iconly-Curved-Home', label: 'account.overview', exact: true },
  { to: '/account/orders', icon: 'iconly-Curved-Bag', label: 'account.orders' },
  { to: '/account/settings', icon: 'iconly-Curved-Setting', label: 'account.settings' },
]

const isActive = (link: { to: string, exact?: boolean }) =>
    link.exact ? route.path === link.to : route.path.startsWith(link.to)

const isLeaving = ref(false)
const onLogout = async () => {
  isLeaving.value = true
  try {
    await logout()
  } finally {
    isLeaving.value = false
  }
}
</script>

<template>
  <header class="site-header mo-left header style-2">
    <Header3 />
  </header>

  <div class="page-content bg-light">
    <div class="content-inner account-page">
      <div class="container account-layout">

        <!-- Side menu (a scrollable tab row on phones) -->
        <aside class="account-side">
          <div class="who">
            <span class="avatar" aria-hidden="true">{{ initials }}</span>
            <span class="who-text">
              <b>{{ account?.first_name }} {{ account?.last_name }}</b>
              <small dir="ltr">{{ account?.email }}</small>
            </span>
          </div>

          <nav class="side-nav" :aria-label="$t('account.menu')">
            <NuxtLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                class="side-link"
                :class="{ active: isActive(link) }"
                :aria-current="isActive(link) ? 'page' : undefined"
            >
              <i :class="link.icon" aria-hidden="true"></i>{{ $t(link.label) }}
            </NuxtLink>
            <button type="button" class="side-link logout" :disabled="isLeaving" @click="onLogout">
              <i class="iconly-Curved-Logout" aria-hidden="true"></i>{{ $t('account.logout') }}
            </button>
          </nav>
        </aside>

        <main class="account-main">
          <h1 class="account-title">{{ title }}</h1>
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.account-side {
  position: sticky;
  top: 96px;
  padding: 18px;
  border-radius: 20px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
}

.who {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--gs-surface);
}

.avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--gs-gradient);
  color: var(--gs-on-brand);
  font-weight: 800;
}

.who-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.who-text b {
  font-size: 15px;
}

.who-text small {
  overflow: hidden;
  color: var(--gs-muted);
  font-size: 12.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.side-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--gs-ink);
  font-size: 14.5px;
  font-weight: 600;
  text-align: start;
  white-space: nowrap;
}

.side-link i {
  font-size: 19px;
  color: var(--gs-muted);
}

.side-link:hover {
  background: var(--gs-surface);
  color: var(--gs-ink);
}

.side-link.active {
  background: var(--gs-surface);
  box-shadow: inset 3px 0 0 var(--gs-green);
}

:global([dir="rtl"] .account-page .side-link.active) {
  box-shadow: inset -3px 0 0 var(--gs-green);
}

.side-link.active i {
  color: var(--gs-primary);
}

.side-link.logout {
  margin-top: 8px;
  color: var(--gs-danger);
}

.side-link.logout i {
  color: var(--gs-danger);
}

.account-title {
  margin: 0 0 18px;
  font-size: clamp(22px, 3vw, 28px);
}

/* Phones: identity on top, then the links as a scrollable chip row */
@media (max-width: 991.98px) {
  .account-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .account-side {
    position: static;
    padding: 14px;
  }

  .who {
    padding-bottom: 12px;
  }

  .side-nav {
    flex-direction: row;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .side-nav::-webkit-scrollbar {
    display: none;
  }

  .side-link {
    flex: none;
    padding: 8px 12px;
    font-size: 13.5px;
  }

  .side-link.active,
  :global([dir="rtl"] .account-page .side-link.active) {
    box-shadow: inset 0 -2px 0 var(--gs-green);
  }

  .side-link.logout {
    margin-top: 0;
  }
}
</style>
