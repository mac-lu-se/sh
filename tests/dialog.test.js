import {assertEquals} from "https://deno.land/std@0.110.0/testing/asserts.ts"
import { showDialog } from '../dialog.js'

Deno.test({
  name: "dialog",
  fn: async () => {
    const iconPath = '/Applications/Utilities/Unison LU.app/Contents/Resources/Unison.icns'
    const result = await showDialog('Test', 'Some test text',
      { buttons: ['OK', 'Cancel'], iconPath })
    console.log({result})
    assertEquals("world", "world");
  },
});