import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { currentUser, locale, lastUser } from '../user.js'

Deno.test({
  name: "Get current user",
  fn: async () => {
    const user = await currentUser()
    assertEquals(user.username, Deno.env.get('USER'))
    assertEquals(user.home, Deno.env.get('HOME'))
  },
})

Deno.test({
  name: "Get current locale",
  fn: async () => {
    assertEquals(await locale(), 'sv_SE')
  },
})

Deno.test({
  name: "Get last user",
  fn: async () => {
    const user = await lastUser()
    assertEquals(user.username, Deno.env.get('USER'))
    assertEquals(user.home, Deno.env.get('HOME'))
  },
})