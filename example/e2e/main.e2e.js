import { Buffer } from 'buffer'

describe('Example', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('root'))).toExist();
  });

  it('set, get, remove', async () => {

    await element(by.id('string_a_promise_setget')).tap()
    await expect(element(by.id('string_a_promise_value'))).toHaveText('value_string_a')
    await element(by.id('string_a_promise_remove')).tap()
    await expect(element(by.id('string_a_promise_value'))).toHaveText('null')

    await element(by.id('string_a_callback_setget')).tap()
    await expect(element(by.id('string_a_callback_value'))).toHaveText('value_string_a')
    await element(by.id('string_a_callback_remove')).tap()
    await expect(element(by.id('string_a_callback_value'))).toHaveText('null')
  })

  it('parallel operation', async () => {
    await Promise.all([
      element(by.id('string_a_promise_setget')).tap(),
      element(by.id('string_b_promise_setget')).tap()
    ])
    await expect(element(by.id('string_a_promise_value'))).toHaveText('value_string_a')
    await expect(element(by.id('string_b_promise_value'))).toHaveText('value_string_b')
    await element(by.id('string_a_promise_remove')).tap()
    await element(by.id('string_b_promise_remove')).tap()
  })

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })

});
