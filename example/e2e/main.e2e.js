import { Buffer } from 'buffer'

describe('Example', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have main screen', async () => {
    await expect(element(by.id('root'))).toExist();
  });

  it('set, get, remove', async () => {
    // string
    await element(by.id('string_a_setget')).tap()
    await expect(element(by.id('string_a_value'))).toHaveText('setget_value_a')
    await element(by.id('string_a_remove')).tap()
    await expect(element(by.id('string_a_value'))).toHaveText('null')
    // buffer
    const buffer = Buffer.from([1, 2, 3])
    await element(by.id('buffer_setget')).tap()
    await expect(element(by.id('buffer_value'))).toHaveText(buffer.toString('base64'))
    await element(by.id('buffer_remove')).tap()
    await expect(element(by.id('buffer_value'))).toHaveText('null')
    // number key
    await element(by.id('number_setget')).tap()
    await expect(element(by.id('number_value'))).toHaveText('setget_value_number')
    await element(by.id('number_remove')).tap()
    await expect(element(by.id('number_value'))).toHaveText('null')
  })

  it('parallel operation', async () => {
    await Promise.all([
      element(by.id('string_a_setget')).tap(),
      element(by.id('string_b_setget')).tap()
    ])
    await expect(element(by.id('string_a_value'))).toHaveText('setget_value_a')
    await expect(element(by.id('string_b_value'))).toHaveText('setget_value_b')
    await element(by.id('string_a_remove')).tap()
    await element(by.id('string_b_remove')).tap()
  })

  it('create new instance', async () => {
    await element(by.id('instance')).tap()
    await expect(element(by.id('instance_value'))).toHaveText('1')
  })

  it('clear', async () => {
    await element(by.id('clear')).tap()
    await expect(element(by.id('clear_value'))).toHaveText('0')
  })

  it('keys, values, filter', async () => {
    await element(by.id('filter')).tap()
    await expect(element(by.id('filter_keys'))).toHaveText('4')
    await expect(element(by.id('filter_values'))).toHaveText('4')
    await expect(element(by.id('filter_itemskey'))).toHaveText('2')
    await expect(element(by.id('filter_itemsvalue'))).toHaveText('3')
  })

  it('foreach', async () => {
    await element(by.id('foreach')).tap()
    await expect(element(by.id('foreach_value'))).toHaveText('alphabravocharlie')
  })

});
