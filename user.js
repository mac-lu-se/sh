import { run } from './run.js'

async function uidToUser(uidOrUsername) {
  const { status, stdout } = await run(['id', '-P', uidOrUsername.toString()])
  if (!status.success) {
    return null
  }
  // Get first field (username)
  // ling-jda:********:904518429:1412170593::0:0:Johan Dahl:/Users/ling-jda:/bin/zsh
  const [username, , uid, gid, , , , name, home, shell] = stdout.split(':')
  return { username, uid: parseInt(uid), gid: parseInt(gid), name, home, shell }
}

/**
 * Return current logged in user
 * 
 * @returns username or null
 */
export async function currentUser() {
  const stat = await Deno.lstat("/dev/console")
  if (!stat?.uid) {
    return null
  }
  return uidToUser(stat.uid)
}

/**
 * Return current locale eg sv_SE, en_US ...
 * @returns current locale
 */
export async function locale() {
  const { stdout } = await run(['/usr/bin/defaults', 'read', '.GlobalPreferences', 'AppleLocale'])
  return stdout.trim()
}

/**
 * Get of last user logged in
 * @returns {object}
 */
export async function lastUser() {
  const { stdout } = await run(['/usr/bin/defaults', 'read', '/Library/Preferences/com.apple.loginwindow', 'lastUserName'])
  return uidToUser(stdout.trim())
}