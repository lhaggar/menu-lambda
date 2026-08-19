const mockRun = jest.fn();
const mockGetSlackUrl = jest.fn();

jest.mock('./src', () => ({ run: mockRun }));
jest.mock('./src/parameters', () => ({ getSlackUrl: mockGetSlackUrl }));

const handler = require('./handler');

describe('handler', () => {
  beforeEach(() => {
    mockRun.mockReset();
    mockGetSlackUrl.mockReset();
  });

  it('resolves destination before posting', async () => {
    mockGetSlackUrl.mockResolvedValue('https://example.com/webhook');
    mockRun.mockResolvedValue();

    await handler.run({ destination: 'main' });

    expect(mockGetSlackUrl).toHaveBeenCalledWith('main');
    expect(mockRun).toHaveBeenCalledWith('https://example.com/webhook');
  });

  it('propagates secret lookup errors', async () => {
    mockGetSlackUrl.mockRejectedValue(new Error('secret unavailable'));

    await expect(handler.run({ destination: 'main' })).rejects.toThrow(
      'secret unavailable',
    );
    expect(mockRun).not.toHaveBeenCalled();
  });
});
