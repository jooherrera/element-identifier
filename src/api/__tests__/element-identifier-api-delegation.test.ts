import { ElementIdentifierAPI } from '../element-identifier-api';

/**
 * This suite verifies that every API method delegates to the host.
 * We pass a mocked host object matching the surface expected by the API.
 */
describe('ElementIdentifierAPI delegation', () => {
  test('delegates all methods to host', () => {
    const host = {
      activate: jest.fn(),
      deactivate: jest.fn(),
      toggle: jest.fn(),
      togglePanel: jest.fn(),
      isActive: jest.fn().mockReturnValue(true),
      showWheel: jest.fn(),
      hideWheel: jest.fn(),
      toggleWheel: jest.fn(),
      isWheelVisible: jest.fn().mockReturnValue(false)
    } as any;

    const api = new ElementIdentifierAPI(host);

    // Simple delegation assertions
    api.activate();
    expect(host.activate).toHaveBeenCalledTimes(1);

    api.deactivate();
    expect(host.deactivate).toHaveBeenCalledTimes(1);

    api.toggle();
    expect(host.toggle).toHaveBeenCalledTimes(1);

    api.togglePanel();
    expect(host.togglePanel).toHaveBeenCalledTimes(1);

    // Return values pass-through
    expect(api.isActive()).toBe(true);
    expect(host.isActive).toHaveBeenCalledTimes(1);

    api.showWheel();
    expect(host.showWheel).toHaveBeenCalledTimes(1);

    api.hideWheel();
    expect(host.hideWheel).toHaveBeenCalledTimes(1);

    api.toggleWheel();
    expect(host.toggleWheel).toHaveBeenCalledTimes(1);

    expect(api.isWheelVisible()).toBe(false);
    expect(host.isWheelVisible).toHaveBeenCalledTimes(1);

    // version getter still accessible
    expect(api.version).toBe('1.0.0');
  });
});
