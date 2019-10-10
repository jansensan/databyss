import { isKeyHotkey } from 'is-hotkey'
import { IS_IOS, IS_MAC } from 'slate-dev-environment'
import { IS_LINUX } from '@databyss-org/ui/lib/dom'

export const metaKey = IS_LINUX ? 'alt' : 'mod'
/**
 * Hotkey mappings for each platform.
 *
 * @type {Object}
 */
const HOTKEYS = {
  bold: `${metaKey}+b`,
  italic: `${metaKey}+i`,
  location: `${metaKey}+k`,
  undo: `${metaKey}+z`,
  startOfLine: `ctrl+shift+left`,
  endOfLine: `ctrl+shift+right`,
  startOfDocument: `ctrl+shift+up`,
  endOfDocument: `ctrl+shift+down`,
  nextBlock: `ctrl+shift+p`,
  previousBlock: `ctrl+shift+o`,
}
const APPLE_HOTKEYS = {}
const WINDOWS_HOTKEYS = {}
/**
 * Hotkeys.
 *
 * @type {Object}
 */
const Hotkeys = {}
const IS_APPLE = IS_IOS || IS_MAC
const IS_WINDOWS = !IS_APPLE
const KEYS = []
  .concat(Object.keys(HOTKEYS))
  .concat(Object.keys(APPLE_HOTKEYS))
  .concat(Object.keys(WINDOWS_HOTKEYS))
KEYS.forEach(key => {
  const method = `is${key[0].toUpperCase()}${key.slice(1)}`
  if (Hotkeys[method]) return
  const generic = HOTKEYS[key]
  const apple = APPLE_HOTKEYS[key]
  const windows = WINDOWS_HOTKEYS[key]
  const isGeneric = generic && isKeyHotkey(generic)
  const isApple = apple && isKeyHotkey(apple)
  const isWindows = windows && isKeyHotkey(windows)
  Hotkeys[method] = event => {
    if (isGeneric && isGeneric(event)) return true
    if (IS_APPLE && isApple && isApple(event)) return true
    if (IS_WINDOWS && isWindows && isWindows(event)) return true
    return false
  }
})
/**
 * Export.
 *
 * @type {Object}
 */
export default Hotkeys

export const START_OF_LINE = 'START_OF_LINE'
export const END_OF_LINE = 'END_OF_LINE'
export const START_OF_DOCUMENT = 'START_OF_DOCUMENT'
export const END_OF_DOCUMENT = 'END_OF_DOCUMENT'
export const NEXT_BLOCK = 'NEXT_BLOCK'
export const PREVIOUS_BLOCK = 'PREVIOUS_BLOCK'