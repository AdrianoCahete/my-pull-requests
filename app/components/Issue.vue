<script setup lang="ts">
defineProps<{
  data: Issue
}>()

function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num)
}

const stateIcons: Record<Issue['state'], string> = {
  open: 'i-lucide-circle-dot',
  closed: 'i-lucide-check-circle',
}
</script>

<template>
  <div class="flex items-center gap-2 sm:gap-4">
    <template v-if="data.author.username">
      <a
        :href="`https://github.com/${data.author.username}`"
        target="_blank"
        class="size-10 sm:size-12 shrink-0 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm rounded-full"
      >
        <img
          :src="data.author.avatar"
          :alt="data.author.username"
          class="size-full"
          loading="lazy"
        >
      </a>
    </template>
    <template v-else>
      <div
        class="size-10 sm:size-12 shrink-0 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm rounded-full"
      >
        <img
          :src="data.author.avatar"
          :alt="data.author.username"
          class="size-full"
          loading="lazy"
        >
      </div>
    </template>

    <div class="flex-1 flex justify-between gap-2 lg:gap-4 min-w-0">
      <div class="flex flex-col min-w-0 gap-0.5 sm:gap-1">
        <a :href="data.url" target="_blank" class="text-sm sm:text-base flex items-center gap-0.5 sm:gap-1 hover:underline text-neutral-900 dark:text-white">
          <UIcon
            :name="stateIcons[data.state]"
            :class="{
              'text-green-500 dark:text-green-400': data.state === 'open',
              'text-purple-500 dark:text-purple-400': data.state === 'closed',
            }"
            class="size-4 sm:size-5 shrink-0"
          />

          <span class="truncate">{{ data.title }}</span>
        </a>

        <div class="flex gap-2 items-center flex-wrap">
          <a :href="`https://github.com/${data.author.username}`" target="_blank" class="text-sm inline-flex gap-1 hover:text-black dark:hover:text-white">
            <span class="opacity-75">@{{ data.author.username }}</span>
          </a>

          <div v-if="data.labels.length > 0" class="flex gap-1 flex-wrap">
            <span
              v-for="label in data.labels.slice(0, 3)"
              :key="label.name"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              :style="{ backgroundColor: `#${label.color}20`, color: `#${label.color}` }"
            >
              {{ label.name }}
            </span>
            <span v-if="data.labels.length > 3" class="text-xs text-neutral-500">
              +{{ data.labels.length - 3 }} more
            </span>
          </div>

          <div v-if="data.comments > 0" class="flex items-center gap-0.5 text-neutral-500 dark:text-neutral-400">
            <UIcon name="i-lucide-message-circle" class="size-3" />
            <span class="text-xs">{{ formatNumber(data.comments) }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-between shrink-0 text-right">
        <a :href="data.url" target="_blank" class="hover:underline text-xs sm:text-sm">
          #{{ data.number }}
        </a>

        <time :datetime="data.updated_at" class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          {{ useTimeAgo(new Date(data.updated_at)) }}
        </time>
      </div>
    </div>
  </div>
</template>
