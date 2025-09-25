export default defineEventHandler(async () => {
  const octokit = useOctokit()
  const config = useAppConfig()
  
  // Get repository configuration from environment variables or app config
  const repoOwner = process.env.NUXT_REPO_OWNER || config.repo?.owner || 'microsoft'
  const repoName = process.env.NUXT_REPO_NAME || config.repo?.name || 'vscode'
  
  // Fetch repository details
  const repo = await fetchRepo(repoOwner, repoName)
  
  const repository: Repository = {
    owner: repo.owner.login,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    avatar: repo.owner.avatar_url,
    stars: repo.stargazers_count,
    type: repo.owner.type,
  }

  // Fetch issues from the repository
  const { data: issuesData } = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: repoOwner,
    repo: repoName,
    state: 'all',
    per_page: 50,
    sort: 'updated',
    direction: 'desc',
  })

  // Filter out pull requests (GitHub API includes PRs in issues endpoint)
  const filteredIssues = issuesData.filter(issue => !issue.pull_request)

  const issues: Issue[] = filteredIssues.map(issue => ({
    title: issue.title,
    url: issue.html_url,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
    state: issue.state as 'open' | 'closed',
    number: issue.number,
    author: {
      username: issue.user ? issue.user.login : 'unknown',
      avatar: issue.user ? issue.user.avatar_url : '',
    },
    labels: issue.labels?.map(label => ({
      name: typeof label === 'string' ? label : label.name || '',
      color: typeof label === 'string' ? '000000' : label.color || '000000',
    })) || [],
    comments: issue.comments || 0,
  }))

  return {
    repository,
    issues,
  } as RepoStatus
})
