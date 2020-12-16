import { EmailValidatorAdapter } from './Adapter'

function makeSystemUnderTest() {
  const systemUnderTest = new EmailValidatorAdapter()
  return systemUnderTest
}

describe('EmailValidatorAdapter', () => {
  test('Deve retornar "false" se emailValidator retornar "false"', () => {
    const systemUnderTest = makeSystemUnderTest()
    const isValid = systemUnderTest.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })
})
