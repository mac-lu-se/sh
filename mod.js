import { currentUser, locale, lastUser } from './user.js'
import { run, runScriptAsCurrentUser } from './run.js'
import { addLine, fileInfo } from './file.js'
import { showDialog } from './dialog.js'
import { formatDate } from './datetime.js'

export default {
  addLine,
  currentUser,
  fileInfo,
  formatDate,
  lastUser,
  locale,
  run,
  runScriptAsCurrentUser,
  showDialog
}