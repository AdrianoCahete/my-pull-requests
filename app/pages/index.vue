<script setup lang="ts">
const colorMode = useColorMode()
const { data: repoStatus } = await useFetch<RepoStatus>('/api/contributions')

if (!repoStatus.value) {
  throw createError('Could not load repository status')
}

const { repository, issues } = repoStatus.value
const repoUrl = `https://github.com/${repository.fullName}`
const ownerUrl = `https://github.com/${repository.owner}`

const openIssues = issues.filter(issue => issue.state === 'open')
const closedIssues = issues.filter(issue => issue.state === 'closed')

useHead({
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate', type: 'application/rss+xml', title: `${repository.fullName} issues`, href: '/feed.xml' },
  ],
})
const url = useRequestURL()
useSeoMeta({
  title: `${repository.fullName} Status`,
  description: `Track the latest issues and status updates for ${repository.fullName} repository.`,
  ogTitle: `${repository.fullName} Status`,
  ogDescription: `Track the latest issues and status updates for ${repository.fullName} repository.`,
  twitterCard: 'summary_large_image',
  ogImage: `${url.origin}/og.png`,
  twitterImage: `${url.origin}/og.png`,
})
</script>

<template>
  <UContainer class="p-4 sm:p-6 lg:p-8 lg:pt-10 max-w-3xl">
    <div class="flex flex-col items-center gap-2">
      <a :href="repoUrl" target="_blank">
        <UAvatar
          :src="repository.avatar"
          :alt="repository.fullName"
          size="xl"
          :class="repository.type === 'Organization' ? 'rounded-lg' : 'rounded-full'"
        />
      </a>
      <h1 class="text-2xl sm:text-3xl text-center">
        <a :href="repoUrl" target="_blank">
          {{ repository.fullName }}
        </a>
        <span class="animate-pulse">Status</span>
      </h1>
      <p v-if="repository.description" class="text-center text-neutral-500 dark:text-neutral-400 max-w-lg">
        {{ repository.description }}
      </p>

      <div class="flex items-center gap-4 mt-2">
        <div class="flex items-center gap-1 text-green-600 dark:text-green-400">
          <UIcon name="i-lucide-circle-dot" class="size-4" />
          <span class="text-sm">{{ openIssues.length }} open</span>
        </div>
        <div class="flex items-center gap-1 text-purple-600 dark:text-purple-400">
          <UIcon name="i-lucide-check-circle" class="size-4" />
          <span class="text-sm">{{ closedIssues.length }} closed</span>
        </div>
        <div class="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
          <UIcon name="i-lucide-star" class="size-4" />
          <span class="text-sm">{{ new Intl.NumberFormat().format(repository.stars) }}</span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
        <ClientOnly>
          <UButton
            :aria-label="'Toggle dark mode'"
            :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="link"
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          :to="ownerUrl"
          external
          target="_blank"
          :aria-label="`${repository.owner}'s GitHub profile`"
          icon="i-lucide-user"
          color="neutral"
          variant="link"
        />
        <UButton
          :to="repoUrl"
          external
          target="_blank"
          aria-label="Repository on GitHub"
          icon="i-lucide-github"
          color="neutral"
          variant="link"
        />
        <UButton
          to="/feed.xml"
          external
          target="_blank"
          aria-label="RSS Feed"
          icon="i-lucide-rss"
          color="neutral"
          variant="link"
        />
      </div>
      <USeparator class="mt-2 sm:mt-6 mb-6 sm:mb-10 w-1/2 mx-auto animate-pulse" />
    </div>

    <div class="flex flex-col gap-6 sm:gap-10">
      <Issue v-for="issue of issues" :key="issue.url" :data="issue" />
    </div>
  </UContainer>
</template>
