const payload = { text: 'menu' };

jest.mock('./get-content', () => ({
  getContent: jest.fn(() => Promise.resolve({})),
}));
jest.mock('./slack', () => ({
  buildPayload: jest.fn(() => payload),
}));
jest.mock('./utils', () => ({
  isWeekend: jest.fn(() => false),
}));

const { run } = require('./index');

describe('src/index.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it('drains successful Slack responses', async () => {
    const response = {
      ok: true,
      status: 200,
      text: jest.fn(() => Promise.resolve('ok')),
    };
    global.fetch.mockResolvedValue(response);

    await expect(run('https://example.com/webhook')).resolves.toBe(response);
    expect(response.text).toHaveBeenCalledTimes(1);
  });

  it('includes a bounded response body in Slack errors', async () => {
    const response = {
      ok: false,
      status: 400,
      text: jest.fn(() => Promise.resolve('x'.repeat(600))),
    };
    global.fetch.mockResolvedValue(response);

    await expect(run('https://example.com/webhook')).rejects.toThrow(
      `Slack request failed with HTTP 400: ${'x'.repeat(500)}`,
    );
    expect(response.text).toHaveBeenCalledTimes(1);
  });
});
