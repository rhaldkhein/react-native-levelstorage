const { device, expect, element, by } = require('detox')

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have welcome screen', async () => {
    await expect(element(by.id('root'))).toBeVisible()
  })

  it('set, get, remove', async () => {
    await element(by.id('string_promise_setget')).tap()
    await expect(element(by.id('string_promise_value'))).toHaveText('value_string')
    await element(by.id('string_promise_remove')).tap()
    await expect(element(by.id('string_promise_value'))).toHaveText('null')
  })

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })
})
