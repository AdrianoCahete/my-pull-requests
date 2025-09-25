<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <UApp>
    <NuxtPage />
    <p class="py-6 pb-10 text-sm flex items-center justify-center gap-2 flex-wrap px-4">
      <UButton
        to="https://github.com/AdrianoCahete/nuxt-status-page"
        rel="noopener"
        target="_blank"
        color="neutral"
        variant="subtle"
        size="sm"
        icon="i-simple-icons-github"
      >
        Source code
      </UButton>
      <UButton
        to="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAdrianoCahete%2Fnuxt-status-page&env=NUXT_GITHUB_TOKEN,NUXT_REPO_OWNER,NUXT_REPO_NAME&envDescription=Create%20a%20GitHub%20token%20and%20set%20repository%20details.&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Fpersonal-access-tokens%2Fnew&project-name=repository-status-page&demo-title=Repository%20Status%20Page&demo-description=Create%20a%20website%20with%20an%20RSS%20feed%20to%20track%20issues%20from%20any%20GitHub%20repository."
        target="_blank"
        rel="noopener"
        color="neutral"
        variant="solid"
        size="sm"
        icon="i-simple-icons-vercel"
      >
        Deploy with Vercel
      </UButton>
    </p>
    <ScrollToTop />
  </UApp>
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 font-sans;
}
</style>
