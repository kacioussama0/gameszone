// The server runs Linux but the site is built on a Mac, and npm only installs sharp's
// binaries for the machine it runs on. Without the Linux ones the image server (/_ipx,
// used for share previews) fails, so they are copied into .output after every build.
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const require = createRequire(import.meta.url)
const versions = require('sharp/package.json').optionalDependencies
const target = join(process.cwd(), '.output/server/node_modules/@img')
const temp = mkdtempSync(join(tmpdir(), 'sharp-linux-'))

for (const name of ['@img/sharp-linux-x64', '@img/sharp-libvips-linux-x64']) {
  const tarball = execFileSync('npm', ['pack', `${name}@${versions[name]}`, '--silent'], { cwd: temp }).toString().trim()
  const dir = join(target, name.replace('@img/', ''))
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  execFileSync('tar', ['-xzf', join(temp, tarball), '-C', dir, '--strip-components=1'])
  console.log(`added ${name}@${versions[name]}`)
}

rmSync(temp, { recursive: true, force: true })
