import build from '../../src/app';

describe('Server', () => {
  it('Should be defined', () => {
    expect(build).toBeDefined();
  });

  const app = build({
    logger: {
      level: 'info',
      prettyPrint: true,
    },
  });

  it('App', () => {
    expect(app).toBeDefined();
  });

  const response = app.inject({
    method: 'GET',
    url: '/',
  });

  it('Root endpoint returns 200', async () => {
    response.then((res) => {
      expect(res.statusCode).toBe(200);
    });
  });

});
