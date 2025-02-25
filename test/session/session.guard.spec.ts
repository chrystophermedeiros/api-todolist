import { SessionGuard } from '../../src/session/session.guard';

describe('SessionGuard', () => {
  it('should be defined', () => {
    expect(new SessionGuard()).toBeDefined();
  });
});
