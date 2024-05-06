// https://platform.moonshot.cn/docs/api/chat#%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF
import path from 'path'
import fs from 'fs-extra'
import OpenAI from 'openai'
import { fileURLToPath } from 'url'

// @ts-ignore
import matter from 'gray-matter'
import { IArticle } from '@/typings'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const AuthorizationKey = 'demo api key' // 需要自己配置kimi的秘钥
const client = new OpenAI({
  baseURL: 'https://api.moonshot.cn/v1',
  apiKey: AuthorizationKey,
})

export async function updateArticleSEO(filePath: string, seo: { description: string; keywords: string }) {
  const fileContent = await fs.readFile(filePath, 'utf8')
  const { content, data } = matter(fileContent)
  const file = matter.stringify(content, {
    ...data,
    head: [
      ['meta', { name: 'description', content: seo.description }],
      ['meta', { name: 'keywords', content: seo.keywords }],
    ],
  })
  await fs.writeFile(filePath, file)
}

enum TaskStatus {
  exist = 'exist',
  error = 'error',
  success = 'success',
}

async function generateSEOHead(filePath: string) {
  const content = await fs.readFile(filePath, 'utf8')
  const { data } = matter(content)
  if (Array.isArray(data.head)) {
    console.log(`${data.title}已经有了head标签`)
    return TaskStatus.exist
  }

  const completion = await client.chat.completions.create({
    model: 'moonshot-v1-8k',
    messages: [
      {
        role: 'system',
        content:
          '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
      },
      {
        role: 'system',
        content:
          '接下来用户会给你一份markdown格式的文件内容，你需要根据文件内容，生成适合SEO优化的description和keywords，并使用JSON格式返回，返回的JSON只包含description和keywords两个字段',
      },
      {
        role: 'user',
        content,
      },
    ],
    temperature: 0.3,
  })
  const res = completion.choices[0].message.content
  if (!res) {
    return TaskStatus.error
  }
  console.log('res:', res)
  const seo = parseResponse(res)
  console.log('seo data:', seo)
  await updateArticleSEO(filePath, seo)
  return TaskStatus.success
}

function parseResponse(content: string) {
  const rows = content.split('\n')
  const str = rows.slice(1, rows.length - 1).join('\n')
  return JSON.parse(str) as { description: string; keywords: string }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
async function main() {
  const articles = (await fs.readJSON('../data/meta.json')) as IArticle[]

  let cnt = 0 // 统计已完成的文章数量
  const RPM = 3 // 当前账号一分钟内可以发送的请求数量
  const queue = []
  for (const article of articles) {
    if (article.fullPath) {
      try {
        const filePath = path.resolve(__dirname, '../views/article', article.fullPath)
        console.log(`开始${article.title} 文章seo`)
        const startDate = +new Date()
        const ans = await generateSEOHead(filePath)
        if (ans === TaskStatus.exist) {
          cnt++
        } else if (ans === TaskStatus.success) {
          cnt++
          if (queue.length < RPM) {
            queue.push(startDate)
          } else {
            await sleep(queue[0] + 60 * 1000 - +new Date())
            queue.shift()
            queue.push(startDate)
          }
        }
      } catch (e) {
        console.error(`${article.title} 文章seo生成失败`)
      }
    }
  }
  console.log(`任务完成，最终${cnt}文件`)
}
//
// start(filePath)

main()
