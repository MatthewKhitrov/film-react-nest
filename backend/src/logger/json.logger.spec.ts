import { JsonLogger } from './json.logger';

/* describe('JsonLogger', () => {
  let log;
  const jsonLogger = new JsonLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    log.mockReset();
  });

  it('log correct format', () => {
    jsonLogger.warn('Alarm', { a: 'b', c: 1 });
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith(
      '{"level":"warn","message":"alarm","optionalParams":[[{"a":"b","c":1}]]}',
    );
  });
}); */

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: {
    log: jest.SpyInstance;
    error: jest.SpyInstance;
    warn: jest.SpyInstance;
    debug: jest.SpyInstance;
  };

  beforeEach(() => {
    // Создаем новый экземпляр логгера перед каждым тестом
    logger = new JsonLogger();

    // Мокаем методы console
    consoleSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => {}),
      error: jest.spyOn(console, 'error').mockImplementation(() => {}),
      warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
      debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    // Очищаем моки после каждого теста
    jest.clearAllMocks();
  });

  describe('formatMessage', () => {
    it('should format simple string message', () => {
      // Используем any для доступа к приватному методу
      const result = (logger as any).formatMessage('test', 'hello world');
      expect(JSON.parse(result)).toEqual({
        level: 'test',
        message: 'hello world',
        optionalParams: [],
      });
    });

    it('should format object message', () => {
      const obj = { key: 'value' };
      const result = (logger as any).formatMessage('test', obj);
      expect(JSON.parse(result)).toEqual({
        level: 'test',
        message: obj,
        optionalParams: [],
      });
    });

    it('should include optional params', () => {
      const result = (logger as any).formatMessage('test', 'msg', 'param1', 2);
      expect(JSON.parse(result)).toEqual({
        level: 'test',
        message: 'msg',
        optionalParams: ['param1', 2],
      });
    });
  });

  describe('log methods', () => {
    it('log() should call console.log with formatted message', () => {
      const message = 'test message';
      logger.log(message);

      expect(consoleSpy.log).toHaveBeenCalledTimes(1);

      const loggedMessage = JSON.parse(consoleSpy.log.mock.calls[0][0]);
      expect(loggedMessage.level).toBe('log');
      expect(loggedMessage.message).toBe(message);
    });

    it('warn() should call console.warn with formatted message', () => {
      const message = 'warning message';
      logger.warn(message);

      expect(consoleSpy.warn).toHaveBeenCalledTimes(1);

      const loggedMessage = JSON.parse(consoleSpy.warn.mock.calls[0][0]);
      expect(loggedMessage.level).toBe('warn');
      expect(loggedMessage.message).toBe(message);
    });

    it('debug() should call console.debug with formatted message', () => {
      const message = 'debug message';
      logger.debug(message);

      expect(consoleSpy.debug).toHaveBeenCalledTimes(1);

      const loggedMessage = JSON.parse(consoleSpy.debug.mock.calls[0][0]);
      expect(loggedMessage.level).toBe('debug');
      expect(loggedMessage.message).toBe(message);
    });

    it('verbose() should call console.log with formatted message', () => {
      const message = 'verbose message';
      logger.verbose(message);

      expect(consoleSpy.log).toHaveBeenCalledTimes(1);

      const loggedMessage = JSON.parse(consoleSpy.log.mock.calls[0][0]);
      expect(loggedMessage.level).toBe('verbose');
      expect(loggedMessage.message).toBe(message);
    });

    it('fatal() should call console.warn with formatted message', () => {
      const message = 'fatal message';
      logger.fatal(message);

      expect(consoleSpy.warn).toHaveBeenCalledTimes(1);

      const loggedMessage = JSON.parse(consoleSpy.warn.mock.calls[0][0]);
      expect(loggedMessage.level).toBe('fatal');
      expect(loggedMessage.message).toBe(message);
    });

    it('should handle multiple optional params', () => {
      const params = ['param1', 2, { key: 'value' }];
      logger.log('message', ...params);

      expect(consoleSpy.log).toHaveBeenCalledTimes(1);

      const loggedMessage = JSON.parse(consoleSpy.log.mock.calls[0][0]);
      expect(loggedMessage.optionalParams).toEqual([params]);
    });
  });
});
