import { Feed } from 'feed'
import { getRequestURL } from 'h3'
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const domain = getRequestURL(event).origin
  const { repository, issues } = await $fetch<RepoStatus>('/api/contributions')
  const feed = new Feed({
    title: `${repository.fullName} Issues`,
    description: `Latest issues and updates from ${repository.fullName} repository`,
    id: domain,
    link: domain,
    language: 'en',
    image: joinURL(domain, 'favicon.png'),
    favicon: joinURL(domain, 'favicon.png'),
    copyright: `CC BY-NC-SA 4.0 2024 © ${repository.owner}`,
    feedLinks: {
      rss: `${domain}/rss.xml`,
    },
  })

  for (const issue of issues) {
    const stateText = issue.state === 'open' ? '🟢 Open' : '🟣 Closed'
    const labelsText = issue.labels.length > 0
      ? ` | Labels: ${issue.labels.map(l => l.name).join(', ')}`
      : ''

    feed.addItem({
      link: issue.url,
      date: new Date(issue.updated_at),
      title: `${stateText}: ${issue.title}`,
      author: [{
        name: issue.author.username,
        link: `https://github.com/${issue.author.username}`,
      }],
      description: `
        <p><strong>Issue #${issue.number}</strong> ${stateText}</p>
        <p>Author: <a href="https://github.com/${issue.author.username}">@${issue.author.username}</a></p>
        <p>Comments: ${issue.comments}</p>
        ${labelsText}
        <p><a href="${issue.url}">View Issue</a></p>
      `,
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
