const { withMainActivity } = require('@expo/config-plugins')

/**
 * Expo config plugin that injects HealthConnectPermissionDelegate.setPermissionDelegate(this)
 * into MainActivity.onCreate(). This is required by react-native-health-connect to register
 * the ActivityResultLauncher for permission requests.
 *
 * The library's built-in plugin (app.plugin.js) only modifies AndroidManifest.xml —
 * this companion plugin handles the MainActivity side.
 */
const withHealthConnectPermissions = (config) => {
  return withMainActivity(config, (config) => {
    const mainActivity = config.modResults

    if (mainActivity.language !== 'kt') {
      throw new Error('withHealthConnectPermissions: Only Kotlin MainActivity is supported')
    }

    let contents = mainActivity.contents

    const importStatement =
      'import dev.matinzd.healthconnect.permissions.HealthConnectPermissionDelegate'

    // Add import if not already present
    if (!contents.includes(importStatement)) {
      // Insert after the last existing import
      const lastImportIndex = contents.lastIndexOf('import ')
      const endOfLastImport = contents.indexOf('\n', lastImportIndex)
      contents =
        contents.slice(0, endOfLastImport + 1) +
        `${importStatement}\n` +
        contents.slice(endOfLastImport + 1)
    }

    const delegateCall = 'HealthConnectPermissionDelegate.setPermissionDelegate(this)'

    // Add setPermissionDelegate call after super.onCreate() if not already present
    if (!contents.includes(delegateCall)) {
      const superOnCreatePattern = /super\.onCreate\(.*?\)/
      const match = contents.match(superOnCreatePattern)
      if (match) {
        const insertPosition = contents.indexOf(match[0]) + match[0].length
        contents =
          contents.slice(0, insertPosition) +
          `\n    ${delegateCall}` +
          contents.slice(insertPosition)
      }
    }

    mainActivity.contents = contents
    return config
  })
}

module.exports = withHealthConnectPermissions
