export type Repository = {
  owner: string
  name: string
  fullName: string
  description: string | null
  avatar: string
  stars: number
  type: 'User' | 'Organization'
}

export type Issue = {
  title: string
  url: string
  created_at: string
  updated_at: string
  state: 'open' | 'closed'
  number: number
  author: {
    username: string
    avatar: string
  }
  labels: Array<{
    name: string
    color: string
  }>
  comments: number
}

export type RepoStatus = {
  repository: Repository
  issues: Issue[]
}
