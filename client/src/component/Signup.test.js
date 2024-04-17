const validateSignup = require('./validateSignup');

test('valid signup', () => {
    expect(validateSignup('user@example.com', 'Password123!')).toBeTruthy();
});

test('invalid email', () => {
    expect(validateSignup('userexample.com', 'Password123!')).toBeFalsy();
});

test('password too short', () => {
    expect(validateSignup('user@example.com', 'Pass!')).toBeFalsy();
});

test('valid signup with minimum criteria met', () => {
    expect(validateSignup('valid@example.com', 'Pass123!')).toBeTruthy();
});

test('valid signup with minimum criteria met', () => {
  expect(validateSignup('valid@example.com', 'Pass123!')).toBeTruthy();
});

test('valid signup with all criteria met', () => {
  expect(validateSignup('allcriteria@example.com', 'P@ssw0rd!AbC')).toBeTruthy();
});

test('invalid email with missing domain', () => {
  expect(validateSignup('missingdomain@', 'Password123!')).toBeFalsy();
});

test('invalid email with missing @ symbol', () => {
  expect(validateSignup('missingatsymbol.com', 'Password123!')).toBeFalsy();
});

test('password with exactly 8 characters, meeting 3 criteria', () => {
  expect(validateSignup('eightchar@example.com', 'Pass123!')).toBeTruthy();
});

test('password with less than 3 criteria met', () => {
  expect(validateSignup('lesscriteria@example.com', 'Password')).toBeFalsy();
});

test('password with only special characters', () => {
  expect(validateSignup('onlyspecial@example.com', '!!!!!!!!')).toBeFalsy();
});

test('password with only numbers', () => {
  expect(validateSignup('onlynumbers@example.com', '123456789')).toBeFalsy();
});

test('password with only uppercase letters', () => {
  expect(validateSignup('onlyuppercase@example.com', 'PASSWORD')).toBeFalsy();
});

test('password with only lowercase letters', () => {
  expect(validateSignup('onlylowercase@example.com', 'password')).toBeFalsy();
});

test('valid signup with mixed criteria', () => {
  expect(validateSignup('mixed@example.com', 'pA3!')).toBeFalsy(); 
  expect(validateSignup('mixed@example.com', 'pA3!pA3!')).toBeTruthy(); 
});

test('password just below minimum length', () => {
  expect(validateSignup('justbelow@example.com', 'Pa3$')).toBeFalsy();
});

test('password just above minimum length', () => {
  expect(validateSignup('justabove@example.com', 'Pa3$eR7*')).toBeTruthy();
});

test('email with non-ASCII characters', () => {
  expect(validateSignup('nonascii@例子.com', 'Password123!')).toBeTruthy();
});

test('password with non-ASCII characters', () => {
  expect(validateSignup('valid@example.com', 'Pässw0rd!')).toBeTruthy();
});
