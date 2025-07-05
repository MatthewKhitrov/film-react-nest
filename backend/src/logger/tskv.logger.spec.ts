import { TskvLogger } from './tskv.logger';

describe.only('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleWarnMock: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
  });

  it('should log warn message with optional params in correct format', () => {
    logger.warn('alarm', { a: 'b', c: 1 });

    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'level=warn\tmessage=alarm\toptional=[{"a":"b","c":1}]',
    );
  });
});
