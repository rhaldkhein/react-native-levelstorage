import { Buffer } from 'buffer'

describe('Example', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('root'))).toExist();
  });

  it('string: set, get, remove', async () => {

    await element(by.id('string_promise_setget')).tap()
    await expect(element(by.id('string_promise_value'))).toHaveText('value_string')
    await element(by.id('string_promise_remove')).tap()
    await expect(element(by.id('string_promise_value'))).toHaveText('null')

    await element(by.id('string_callback_setget')).tap()
    await expect(element(by.id('string_callback_value'))).toHaveText('value_string')
    await element(by.id('string_callback_remove')).tap()
    await expect(element(by.id('string_callback_value'))).toHaveText('null')
  })

  it('buffer: set, get, remove', async () => {
    const value = Buffer.from([1, 2, 3])

    await element(by.id('buffer_promise_setget')).tap()
    await expect(element(by.id('buffer_promise_value'))).toHaveText(value.toString('base64'))
    await element(by.id('buffer_promise_remove')).tap()
    await expect(element(by.id('buffer_promise_value'))).toHaveText('null')

    await element(by.id('buffer_callback_setget')).tap()
    await expect(element(by.id('buffer_callback_value'))).toHaveText(value.toString('base64'))
    await element(by.id('buffer_callback_remove')).tap()
    await expect(element(by.id('buffer_callback_value'))).toHaveText('null')
  })

  it('parallel operation', async () => {
    const value = Buffer.from([1, 2, 3])
    await Promise.all([
      element(by.id('string_promise_setget')).tap(),
      element(by.id('buffer_promise_setget')).tap()
    ])
    await expect(element(by.id('string_promise_value'))).toHaveText('value_string')
    await expect(element(by.id('buffer_promise_value'))).toHaveText(value.toString('base64'))
    await element(by.id('string_promise_remove')).tap()
    await element(by.id('buffer_promise_remove')).tap()
  })

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })

});
