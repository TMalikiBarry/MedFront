import {DisplayNonNullStringPipe} from './display-non-null-string.pipe';

describe('DisplayNonNullStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayNonNullStringPipe();
    expect(pipe).toBeTruthy();
  });
});
