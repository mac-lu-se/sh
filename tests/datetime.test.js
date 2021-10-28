import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { formatDate } from '../datetime.js'


Deno.test({
  name: "Format date",
  fn: () => {
    const date = new Date('2021-10-28T09:05:17.028Z')
    const formatted = formatDate(date)
    assertEquals(formatted, '2021-10-28 11:05:17')
  },
})