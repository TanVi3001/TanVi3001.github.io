import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
await mkdir('public', { recursive: true })
await cp(resolve('../assets'), resolve('public/assets'), { recursive: true })
const pages = {}
for (const file of await readdir('content')) {
  if (file.endsWith('.html')) pages[file.replace('.html', '')] = await readFile(`content/${file}`, 'utf8')
}
await writeFile('src/data/pages.json', JSON.stringify(pages, null, 2))
