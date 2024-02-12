import {PrettyPhoneNumberPipe} from './pretty-phone-number.pipe';

describe('PrettyPhoneNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyPhoneNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
