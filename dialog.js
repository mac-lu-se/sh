import { run } from './run.js'

/**
 * Show a jamf dialog
 * 
 * @param title - title of dialog
 * @param description - text in dialog
 * @param options.buttons - button labels at most 2
 * @param options.iconPath - path to icns-file to show
 * @param options.runInBackground - run the dialog in background
 * 
 * @returns true if button 1 is pressed (or run in background). Return false if button 2 is pressed
 */
export async function showDialog(title, description,
  {buttons, iconPath, runInBackground} = {buttons: ['OK'], iconPath: '', runInBackground: false}) {
    if (buttons?.length === 2 && runInBackground) {
      console.warn('running in background and two buttons is not usuable')
    }
    let cmd = [
      '/Library/Application Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper',
      '-windowType', 'utility',
      '-title', title,
      '-description', description
    ]
    if (! buttons || buttons.length === 0) {
      cmd = cmd.concat(['-button1', 'OK', '-defaultButton', '1'])
    } else {
      if (buttons.length >= 1) {
        cmd = cmd.concat(['-button1', buttons[0], '-defaultButton', '1'])
      }
      if (buttons && buttons.length >= 2) {
        cmd = cmd.concat(['-button2', buttons[1]])
      }
    }
    
    if (iconPath) {
      cmd = cmd.concat('-icon', iconPath, '-iconSize', '64')
    }

    if (runInBackground) {
      cmd.push('&') // To run in background
      await run(cmd, true)
      return true
    }

    const {status} = await run(cmd)
    return status.success 
}