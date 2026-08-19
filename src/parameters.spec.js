const mockSend = jest.fn();

jest.mock('@aws-sdk/client-ssm', () => ({
  GetParameterCommand: jest.fn(input => input),
  SSMClient: jest.fn(() => ({ send: mockSend })),
}));

const { getSlackUrl } = require('./parameters');

describe('src/parameters.js', () => {
  beforeEach(() => {
    process.env.SLACK_MAIN_PARAMETER_NAME = '/menu-lambda/slack/main';
    process.env.SLACK_PRESEND_PARAMETER_NAME = '/menu-lambda/slack/presend';
    mockSend.mockReset();
  });

  afterAll(() => {
    delete process.env.SLACK_MAIN_PARAMETER_NAME;
    delete process.env.SLACK_PRESEND_PARAMETER_NAME;
  });

  it('loads main webhook from Parameter Store', async () => {
    mockSend.mockResolvedValue({
      Parameter: { Value: 'https://example.com/main' },
    });

    await expect(getSlackUrl('main')).resolves.toBe('https://example.com/main');
    expect(mockSend).toHaveBeenCalledWith({
      Name: '/menu-lambda/slack/main',
      WithDecryption: true,
    });
  });

  it('loads presend webhook from Parameter Store', async () => {
    mockSend.mockResolvedValue({
      Parameter: { Value: 'https://example.com/presend' },
    });

    await expect(getSlackUrl('presend')).resolves.toBe(
      'https://example.com/presend',
    );
    expect(mockSend).toHaveBeenCalledWith({
      Name: '/menu-lambda/slack/presend',
      WithDecryption: true,
    });
  });

  it('rejects unknown destinations', async () => {
    await expect(getSlackUrl('other')).rejects.toThrow('Unknown destination');
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('rejects missing environment configuration', async () => {
    delete process.env.SLACK_MAIN_PARAMETER_NAME;

    await expect(getSlackUrl('main')).rejects.toThrow(
      'Missing environment variable: SLACK_MAIN_PARAMETER_NAME',
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('rejects missing parameter values', async () => {
    mockSend.mockResolvedValue({ Parameter: {} });

    await expect(getSlackUrl('main')).rejects.toThrow(
      'Parameter has no value: SLACK_MAIN_PARAMETER_NAME',
    );
  });
});
