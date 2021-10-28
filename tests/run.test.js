import { assert, assertEquals } from 'https://deno.land/std@0.93.0/testing/asserts.ts'
import { run, currentScript, escapeShellArgs } from '../run.js'

Deno.test({
  name: 'Successful run',
  fn: async () => {
    const { status, stdout, stderr } = await run(['ls', '-1'])
    assert(status.success)
    assert(stdout.includes('run.js'))
    assertEquals(stderr, '')
  },
})

Deno.test({
  name: 'Failed run',
  fn: async () => {
    const { status, stdout, stderr } = await run(['ls', '--xxxx'])
    assert(!status.success)
    assertEquals(stdout, '')
    assert(stderr.includes('unrecognized option'))
  },
})

Deno.test({
  name: 'Run in shell',
  fn: async () => {
    const { status, stdout, stderr } = await run('ls -l')
    assert(status.success)
    assert(stdout.includes('run.js'))
    assertEquals(stderr, '')
  },
})

Deno.test({
  name: 'get current script',
  fn: () => {
    const path = currentScript()
    assert(path.endsWith('run.test.js'))
  },
})

Deno.test({
  name: 'escape shell args - not needed',
  fn: () => {
    const args = escapeShellArgs(['/bin/ls', '-la', '/tmp'])
    assertEquals(args, '/bin/ls -la /tmp')
  },
})

Deno.test({
  name: 'escape shell args - spaces',
  fn: () => {
    const args = escapeShellArgs(['/bin/ls', '-la', '/my dir'])
    assertEquals(args, `/bin/ls -la '/my dir'`)
  },
})

Deno.test({
  name: 'escape shell args - citation',
  fn: () => {
    const args = escapeShellArgs(['echo', `It is 'cool'`])
    assertEquals(args, `echo 'It is '\\''cool'\\'''`)
  },
})

Deno.test({
  name: 'run as script, escape shell args - citation',
  fn: async () => {
    const { stdout } = await run(['echo', `It is 'cool'`], true)
    assertEquals(stdout, `It is 'cool'\n`)
  },
})