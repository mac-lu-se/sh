
import { currentUser } from './user.js'
const decoder = new TextDecoder()

/**
 * 
 * @param cmd - command and arguments or string
 * @param shell - run in shell. String is always runned in shell
 * @returns {}
 */
export async function run(cmd, shell = false) {
  const options = {
    stdout: 'piped',
    stderr: 'piped',
    cmd: null
  }
  if (typeof cmd === 'string') {
    options.cmd = ['/bin/sh', '-c', cmd]
  } else if (shell) {
    options.cmd = ['/bin/sh', '-c', escapeShellArgs(cmd)]
  } else {
    options.cmd = cmd
  }
  if (run.verbose) {
    console.info(options.cmd.join(' '))
  }
  
  const p = Deno.run(options)
  const status = await p.status()
  let stdout = ''
  let stderr = ''
  stdout = decoder.decode(await p.output())
  if (run.verbose) {
    console.log(stdout)
  }
  stderr = decoder.decode(await p.stderrOutput())
  if (run.verbose) {
    console.error(stderr)
  }
  p.close()
  return { status, stdout, stderr }
}

run.verbose = false

export function escapeShellArgs(args) {
  return args.map( (arg) => {
    arg = arg.replaceAll(/([\$])/g, (s) => `\\${s}`)
    arg = arg.replaceAll(`'`, `'\\''`)
    if (arg.includes(' ') || arg.includes('\'')) {
      return `'${arg}'`
    }
    return arg
  }).join(' ')
}


export async function runScriptAsCurrentUser() {
  if (Deno.env.get('USER') !== 'root') {
    return {
      status: {
        success: false,
        code: -1
      },
      stdout: '',
      stderr: 'Must be root to run script as current user'
    }
  }
  const user = await currentUser()
  if (!user) {
    return {
      status: {
        success: false,
        code: -1
      },
      stdout: '',
      stderr: 'Current user not found'
    }
  }
  const scriptPath = currentScript()
  const tempScriptPath = await Deno.makeTempFile()
  await Deno.copyFile(scriptPath, tempScriptPath)
  await Deno.chmod(tempScriptPath, 0o755)
  const cmd = ['/usr/bin/sudo', '-H', '-u', user.username, tempScriptPath, ...Deno.args]
  const result = await run(cmd)
  await Deno.remove(tempScriptPath)
  return result
}

export function currentScript() {
  const url = new URL(Deno.mainModule)
  return decodeURI(url.pathname)
}


