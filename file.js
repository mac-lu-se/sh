export async function addLine(path, line) {
  let content = ''
  try {
    content = await Deno.readTextFile(path)
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) {
      throw e
    }
    await Deno.writeTextFile(path, line + '\n')
    return true
  }
  const lineExists = content.split('\n').includes(line)
  if (lineExists) {
    return false
  }
  let newContent = content
  if (content.length > 0 && !content.endsWith('\n')) {
    newContent += '\n'
  }
  newContent += line + '\n'
  await Deno.writeTextFile(path, newContent)
  return true
}

/**
 * Get stat record of path
 * @param path
 * @returns stat or null (if it don't exist)
 */
export async function fileInfo(path) {
  try {
    return await Deno.stat(path)
  } catch (_err) {
    return null
  }
}