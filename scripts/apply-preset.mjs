import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const cwd = process.cwd()
const presetName = process.argv[2]
const dryRun = process.argv.includes('--dry-run')

if (!presetName) {
  console.error('Usage: pnpm preset:apply <preset-name> [--dry-run]')
  process.exit(1)
}

const presetDir = path.join(cwd, 'presets', presetName)
const metaPath = path.join(presetDir, 'meta.json')
const filesDir = path.join(presetDir, 'files')

if (!fs.existsSync(metaPath)) {
  console.error(`Preset "${presetName}" not found.`)
  process.exit(1)
}

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))

function walk(dir) {
  if (!fs.existsSync(dir))
    return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name)
    if (entry.isDirectory())
      return walk(absolutePath)
    return [absolutePath]
  })
}

const sourceFiles = walk(filesDir).filter(file => path.basename(file) !== '.gitkeep')

console.log(`Preset "${presetName}" found.`)
if (meta.description)
  console.log(`Description: ${meta.description}`)

if (!sourceFiles.length) {
  console.log('No files to apply yet. Use the README as integration notes.')
  process.exit(0)
}

for (const source of sourceFiles) {
  const relativePath = path.relative(filesDir, source)
  const target = path.join(cwd, relativePath)
  const exists = fs.existsSync(target)
  const action = exists ? 'skip existing' : 'copy'
  console.log(`${action}: ${relativePath}`)

  if (!dryRun && !exists) {
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.copyFileSync(source, target)
  }
}

if (dryRun)
  console.log('Dry run complete. No files were changed.')
