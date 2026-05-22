import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const cwd = process.cwd()
const dryRun = process.argv.includes('--dry-run')

const targets = [
  'src/pages/login.vue',
  'src/pages/demo-api.vue',
  'src/api/modules/demo.ts',
]

const optionalCleanup = [
  'src/types/typed-router.d.ts',
  'src/types/components.d.ts',
]

function removeFile(relativePath) {
  const absolutePath = path.join(cwd, relativePath)
  if (!fs.existsSync(absolutePath))
    return false

  if (!dryRun)
    fs.rmSync(absolutePath, { force: true })

  return true
}

const removed = [...targets, ...optionalCleanup].filter(removeFile)

if (dryRun) {
  console.log(removed.length ? `Demo cleanup would remove:\n${removed.map(item => `- ${item}`).join('\n')}` : 'No demo files found.')
  process.exit(0)
}

console.log(removed.length ? `Removed demo files:\n${removed.map(item => `- ${item}`).join('\n')}` : 'No demo files found.')
console.log('Run pnpm typecheck once to regenerate route/component declaration files after cleanup.')
