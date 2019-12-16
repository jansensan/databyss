import webdriver from 'selenium-webdriver'

export const CHROME = 'chrome'
export const FIREFOX = 'firefox'
export const WIN = 'Windows 10'

const username = process.env.SAUCE_USERNAME
const accessKey = process.env.SAUCE_ACCESS_KEY

export const startSession = async (
  name,
  platformName = WIN,
  browserName = CHROME
) => {
  jest.setTimeout(40000)
  const driver = await new webdriver.Builder()
    .withCapabilities({
      browserName,
      platformName,
      browserVersion: 'latest',
      'goog:chromeOptions': { w3c: true },
      'sauce:options': {
        username,
        accessKey,
        seleniumVersion: '3.141.59',
        build: 'databyss-org/ui',
        name,
        maxDuration: 3600,
        idleTimeout: 1000,
      },
    })
    .usingServer('https://ondemand.saucelabs.com/wd/hub')
    .build()

  const session = await driver.getSession()
  driver.sessionID = session.id_
  return driver
}
