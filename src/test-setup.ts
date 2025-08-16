// Silence noisy console output from the web component during tests
const noop = () => undefined;

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(noop);
  jest.spyOn(console, 'group').mockImplementation(noop as any);
  jest.spyOn(console, 'groupEnd').mockImplementation(noop as any);
  jest.spyOn(console, 'error').mockImplementation(noop);
});

afterAll(() => {
  (console.log as any).mockRestore?.();
  (console.group as any).mockRestore?.();
  (console.groupEnd as any).mockRestore?.();
  (console.error as any).mockRestore?.();
});
