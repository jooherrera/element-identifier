import type { ElementIdentifier } from '../element-identifier';

/**
 * Public API wrapper exposed on window.elementIdentifier
 * Keeps the surface stable while delegating to the host web component methods.
 */
export class ElementIdentifierAPI {
  constructor(private host: ElementIdentifier) {}
  activate(): void { this.host.activate(); }
  deactivate(): void { this.host.deactivate(); }
  toggle(): void { this.host.toggle(); }
  togglePanel(): void { this.host.togglePanel(); }
  isActive(): boolean { return this.host.isActive(); }
  showWheel(): void { this.host.showWheel(); }
  hideWheel(): void { this.host.hideWheel(); }
  toggleWheel(): void { this.host.toggleWheel(); }
  isWheelVisible(): boolean { return this.host.isWheelVisible(); }
  get version(): string { return '1.0.0'; }
  help(): void {
    // eslint-disable-next-line no-console
    console.log('%c🎯 Element Identifier v1.0.0', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
    // eslint-disable-next-line no-console
    console.log('%cComandos disponibles:', 'color: #8b5cf6; font-weight: bold;');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.activate() - Activar herramienta');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.deactivate() - Desactivar herramienta');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.toggle() - Alternar estado');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.togglePanel() - Mostrar/ocultar panel');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.showWheel() - Mostrar rueda FAB');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.hideWheel() - Ocultar rueda FAB');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.toggleWheel() - Alternar rueda FAB');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.isWheelVisible() - Estado de visibilidad de la rueda');
    // eslint-disable-next-line no-console
    console.log('  elementIdentifier.help() - Mostrar esta ayuda');
    // eslint-disable-next-line no-console
    console.log('%cUso: Activa y haz clic en elementos para identificarlos', 'color: #10b981;');
  }
}
