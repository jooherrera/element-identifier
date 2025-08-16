import { ElementIdentifierAPI } from '../element-identifier-api';
import { ElementIdentifier } from '../../element-identifier';

describe('ElementIdentifierAPI', () => {
  afterEach(() => {
    document.querySelectorAll('element-identifier').forEach((n) => n.remove());
  });
  test('delegates to host methods and exposes version/help', () => {
    const host = new ElementIdentifier();
    document.body.appendChild(host);

    const api = new ElementIdentifierAPI(host as unknown as ElementIdentifier);

    expect(typeof api.activate).toBe('function');
    expect(typeof api.deactivate).toBe('function');
    expect(typeof api.toggle).toBe('function');
    expect(typeof api.togglePanel).toBe('function');
    expect(typeof api.showWheel).toBe('function');
    expect(typeof api.hideWheel).toBe('function');
    expect(typeof api.toggleWheel).toBe('function');
    expect(typeof api.isWheelVisible).toBe('function');
    expect(typeof api.help).toBe('function');

    // version getter
    expect(api.version).toBe('1.0.0');

    // help logs to console
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    api.help();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();

    // Activate toggles state
    expect(api.isActive()).toBe(false);
    api.activate();
    expect(api.isActive()).toBe(true);
    api.deactivate();
    expect(api.isActive()).toBe(false);
  });
});
