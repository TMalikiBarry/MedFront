import {SafeResourceUrlPipe} from './safe-resource-url.pipe';

describe('SafeResourceUrlPipe', () => {
  it('create an instance', () => {
    // @ts-ignore
    const pipe = new SafeResourceUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
