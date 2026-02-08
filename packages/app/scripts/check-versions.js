#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(chalk.red(`Error reading ${filePath}:`), error.message);
    return null;
  }
}

function checkVersions() {
  console.log(chalk.blue("Checking versions across project files...\n"));

  // Read package.json
  const packageJson = readJsonFile(path.join(process.cwd(), "package.json"));
  const packageVersion = packageJson?.version;

  // Read app.json
  const appJson = readJsonFile(path.join(process.cwd(), "app.json"));
  const expoVersion = appJson?.expo?.version;

  // Read eas.json if it exists
  const easJsonPath = path.join(process.cwd(), "eas.json");
  const easJson = fs.existsSync(easJsonPath) ? readJsonFile(easJsonPath) : null;

  console.log("Version numbers found:");
  console.log(chalk.cyan("package.json:"), chalk.yellow(packageVersion || "Not found"));
  console.log(chalk.cyan("app.json:   "), chalk.yellow(expoVersion || "Not found"));

  if (easJson) {
    console.log(chalk.cyan("\neas.json build profiles:"));
    Object.entries(easJson.build || {}).forEach(([profile, config]) => {
      const autoIncrement = config.autoIncrement;
      console.log(
        chalk.cyan(`  ${profile}:`),
        chalk.yellow(autoIncrement ? "Auto increment enabled" : "No auto increment")
      );
    });
  }

  // Check for mismatches
  if (packageVersion && expoVersion && packageVersion !== expoVersion) {
    console.log(
      chalk.red("\n⚠️  Version mismatch detected!"),
      `\npackage.json (${packageVersion}) and app.json (${expoVersion}) versions don't match.`
    );
  } else if (packageVersion && expoVersion) {
    console.log(chalk.green("\n✓ Versions are in sync!"));
  }

  // Additional checks for iOS and Android build numbers
  if (appJson?.expo?.ios?.buildNumber) {
    console.log(chalk.cyan("\niOS build number:    "), chalk.yellow(appJson.expo.ios.buildNumber));
  }
  if (appJson?.expo?.android?.versionCode) {
    console.log(
      chalk.cyan("Android version code:"),
      chalk.yellow(appJson.expo.android.versionCode)
    );
  }
}

checkVersions();
