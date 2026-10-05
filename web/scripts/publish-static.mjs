import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const web = fileURLToPath(new URL('../', import.meta.url));
const root = path.resolve(web, '..');
const out = path.join(web, 'out');
const entries = await readdir(out);
await rm(path.join(root, '_next'), { recursive: true, force: true });
for (const name of entries) await cp(path.join(out, name), path.join(root, name), { recursive: true });
await writeFile(path.join(root, '.nojekyll'), '');
for (const slug of ['projects','experience','hobbies','skills','books','certificates','gallery','schedule','interests']) {
  const target = slug === 'interests' ? 'hobbies' : slug;
  await writeFile(path.join(root, `${slug}.html`), `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./${target}/"><link rel="canonical" href="https://tanvi3001.github.io/${target}/"><title>Lê Tấn Vĩ · ${target}</title></head><body><a href="./${target}/">Mở trang ${target}</a></body></html>\n`);
}
console.log('Static website exported to repository root; legacy links preserved.');
