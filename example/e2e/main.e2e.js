
describe('Example', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('root'))).toExist();
  });

  it('should set, get, remove', async () => {
    await element(by.id('string_a_promise_setget')).tap()
    await expect(element(by.id('string_a_promise_value'))).toHaveText('setget_value_a')
    await element(by.id('string_a_promise_remove')).tap()
    await expect(element(by.id('string_a_promise_value'))).toHaveText('null')
  })

  it('should parallel operation', async () => {
    await Promise.all([
      element(by.id('string_a_promise_setget')).tap(),
      element(by.id('string_b_promise_setget')).tap()
    ])
    await expect(element(by.id('string_a_promise_value'))).toHaveText('setget_value_a')
    await expect(element(by.id('string_b_promise_value'))).toHaveText('setget_value_b')
    await element(by.id('string_a_promise_remove')).tap()
    await element(by.id('string_b_promise_remove')).tap()
  })

  it('should create new instance', async () => {
    await element(by.id('instance')).tap()
    await expect(element(by.id('instance_value'))).toHaveText('1')
  })

  // it('should clear', async () => {
  //   await element(by.id('clear')).tap()
  //   await expect(element(by.id('clear_value'))).toHaveText('0')
  // })

  it('should filter', async () => {
    await element(by.id('filter')).tap()
    await expect(element(by.id('filter_value'))).toHaveText('3')
  })

  it('should foreach', async () => {
    await element(by.id('foreach')).tap()
    await expect(element(by.id('foreach_value'))).toHaveText('alphabravocharlie')
  })

});
