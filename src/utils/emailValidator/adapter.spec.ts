import { EmailValidatorAdapter } from './Adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

function makeSystemUnderTest() {
  const systemUnderTest = new EmailValidatorAdapter()
  return systemUnderTest
}

describe('EmailValidatorAdapter', () => {
  test('Deve retornar "false" se validator retornar "false"', () => {
    const systemUnderTest = makeSystemUnderTest()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = systemUnderTest.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  test('Deve retornar "true" se validator retornar "true"', () => {
    const systemUnderTest = makeSystemUnderTest()
    const isValid = systemUnderTest.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })
})
