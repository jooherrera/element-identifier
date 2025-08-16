import { ElementIdentifierAPI } from './api/element-identifier-api';
// export { ElementIdentifierAPI } from './api/element-identifier-api';

/*
 * Element Identifier - Web Component (TypeScript)
 * Una herramienta para identificar elementos del DOM y comunicarse mejor con IA
 */

export class PanelPosition {
  constructor(public x = 0, public y = 64) {}
}
export class DragOffset {
  constructor(public x = 0, public y = 0) {}
}

export interface ElementInfo {
  componentName: string;
  type: string;
  tagName: string;
  id: string;
  classes: string;
  dataComponent: string;
  dataTestId: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any | 'none';
}

export class ElementInfoData implements ElementInfo {
  constructor(
    public componentName: string,
    public type: string,
    public tagName: string,
    public id: string,
    public classes: string,
    public dataComponent: string,
    public dataTestId: string,
    public role: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public props: any | 'none'
  ) {}
}

export class SelectedOrHovered {
  constructor(public element: Element, public info: ElementInfo) {}
}

export class State {
  constructor(
    public isActive: boolean = false,
    public selectedElement: SelectedOrHovered | null = null,
    public hoveredElement: SelectedOrHovered | null = null,
    public showPanel: boolean = true,
    public copyMessage: string = '',
    public panelPosition: PanelPosition = new PanelPosition(),
    public isDragging: boolean = false,
    public dragOffset: DragOffset = new DragOffset(),
    public isMenuOpen: boolean = false,
    public showWheel: boolean = true
  ) {}
}

export interface ElementIdentifierContract {
  activate(): void;
  deactivate(): void;
  toggle(): void;
  togglePanel(): void;
  analyzeElement(element: Element): ElementInfo;
  copyToClipboard(text: string, type?: string): Promise<void>;
  startDrag(e: MouseEvent): void;
  toggleMenu(): void;
  closeMenu(): void;
  showWheel(): void;
  hideWheel(): void;
  toggleWheel(): void;
  isWheelVisible(): boolean;
}

export class ElementIdentifier extends HTMLElement implements ElementIdentifierContract {
  private state: State;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.state = new State();

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.handleMenuOutsideClick = this.handleMenuOutsideClick.bind(this);
  }

  connectedCallback(): void {
    // Initialize from attributes if provided
    const showWheelAttr = this.getAttribute('show-wheel');
    if (showWheelAttr !== null) {
      this.state.showWheel = !(showWheelAttr === 'false' || showWheelAttr === '0' || showWheelAttr === 'off');
    }
    const showPanelAttr = this.getAttribute('show-panel');
    if (showPanelAttr !== null) {
      const b = this.parseBoolAttr(showPanelAttr);
      if (typeof b === 'boolean') this.state.showPanel = b;
    }

    // Defer activation until after initial render & API setup
    const activeAttr = this.getAttribute('active');
    const autoStartAttr = this.getAttribute('auto-start');
    const shouldActivate = (this.parseBoolAttr(activeAttr) === true) || (this.parseBoolAttr(autoStartAttr) === true);

    this.render();
    this.setupAPI();
    document.addEventListener('click', this.handleMenuOutsideClick, true);

    if (shouldActivate && !this.state.isActive) {
      this.activate();
    }

    // eslint-disable-next-line no-console
    console.log('🎯 Element Identifier cargado! Usa elementIdentifier.activate() para empezar');
  }

  disconnectedCallback(): void {
    this.deactivate();
    document.removeEventListener('click', this.handleMenuOutsideClick, true);
    this.cleanup();
  }

  // ==================== API PÚBLICA ====================

  activate(): void {
    this.state.isActive = true;
    this.updateUI();
    this.attachEventListeners();
    // eslint-disable-next-line no-console
    console.log('%c🎯 Element Identifier activado!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    // eslint-disable-next-line no-console
    console.log('%cHaz clic en cualquier elemento para ver su identificador', 'color: #10b981;');

    this.dispatchEvent(new CustomEvent('activated', {
      detail: { timestamp: Date.now() }
    }));
  }

  deactivate(): void {
    this.state.isActive = false;
    this.state.selectedElement = null;
    this.state.hoveredElement = null;
    this.updateUI();
    this.removeEventListeners();
    this.clearHighlights();
    // eslint-disable-next-line no-console
    console.log('%c✅ Element Identifier desactivado', 'color: #ef4444; font-weight: bold;');

    this.dispatchEvent(new CustomEvent('deactivated', {
      detail: { timestamp: Date.now() }
    }));
  }

  toggle(): void {
    this.state.isActive ? this.deactivate() : this.activate();
  }

  togglePanel(): void {
    this.state.showPanel = !this.state.showPanel;
    this.updateUI();
  }

  toggleMenu(): void {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.updateUI();
  }

  closeMenu(): void {
    if (!this.state.isMenuOpen) return;
    this.state.isMenuOpen = false;
    this.updateUI();
  }

  showWheel(): void {
    this.state.showWheel = true;
    this.updateUI();
  }

  hideWheel(): void {
    this.state.showWheel = false;
    if (this.state.isMenuOpen) this.state.isMenuOpen = false;
    this.updateUI();
  }

  toggleWheel(): void {
    this.state.showWheel = !this.state.showWheel;
    this.updateUI();
  }

  public isWheelVisible(): boolean {
    return this.state.showWheel;
  }

  public isActive(): boolean {
    return this.state.isActive;
  }

  // ==================== ANÁLISIS DE ELEMENTOS ====================

  analyzeElement(element: Element): ElementInfo {
    const classList = Array.from((element as HTMLElement).classList || []);
    const tagName = element.tagName?.toLowerCase() || 'unknown';
    const id = (element as HTMLElement).id;
    const dataComponent = (element as HTMLElement).getAttribute?.('data-component') || null;
    const dataTestId = (element as HTMLElement).getAttribute?.('data-testid') || null;
    const role = (element as HTMLElement).getAttribute?.('role') || null;

    let componentName = 'Unknown';
    let type = 'DOM Element';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let props: any = {};

    // Buscar el fiber node de React (no tipado intencionalmente)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyEl: any = element as any;
    const fiberKey = Object.keys(anyEl).find((key) =>
      key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber')
    );

    if (fiberKey) {
      const fiber = anyEl[fiberKey];
      if (fiber && fiber.type) {
        if (typeof fiber.type === 'function') {
          componentName = fiber.type.name || 'Anonymous Component';
          type = 'React Component';
          props = fiber.memoizedProps || {};
        } else if (typeof fiber.type === 'string') {
          componentName = fiber.type;
          type = 'React Element';
        }
      }
    }

    if (componentName === 'Unknown') {
      if (dataComponent) {
        componentName = dataComponent;
        type = 'Marked Component';
      } else if (classList.some((cls) => cls.includes('button') || cls.includes('btn'))) {
        const text = (element as HTMLElement).textContent?.trim().substring(0, 20) || 'Button';
        componentName = `Button: ${text}`;
        type = 'Button Element';
      } else if (tagName === 'input') {
        const input = element as HTMLInputElement;
        componentName = `Input[${input?.type || 'text'}]`;
        type = 'Input Element';
      } else if (/^h[1-6]$/.test(tagName)) {
        const text = (element as HTMLElement).textContent?.trim().substring(0, 30) || '';
        componentName = `${tagName.toUpperCase()}: ${text}`;
        type = 'Heading Element';
      } else if ((element as HTMLElement).textContent && (element as HTMLElement).textContent!.trim()) {
        const text = (element as HTMLElement).textContent!.trim().substring(0, 30);
        componentName = `${tagName}: ${text}`;
        type = 'Text Element';
      } else {
        componentName = tagName;
      }
    }

    return new ElementInfoData(
      componentName,
      type,
      tagName,
      id || 'none',
      classList.join(' ') || 'none',
      dataComponent || 'none',
      dataTestId || 'none',
      role || 'none',
      props && Object.keys(props).length > 0 ? props : 'none'
    );
  }

  // ==================== EVENT HANDLERS ====================

    private handleMenuOutsideClick(e: MouseEvent): void {
      const target = e.target as Element | null;
      // Close the menu if click is outside the component's shadow host
      if (!this.state.isMenuOpen || !target) return;
      const path = (e.composedPath && e.composedPath()) || [];
      const clickedInside = path.includes(this) || (this.shadowRoot ? path.includes(this.shadowRoot) : false);
      if (!clickedInside) {
        this.closeMenu();
      }
    }

  private isToolElement(element: Element): boolean {
    if (element === this || this.contains(element)) {
      return true;
    }
    let current: Element | null = element;
    while (current && current !== document.body) {
      const hasAttr = (current as HTMLElement).hasAttribute?.('data-element-identifier');
      const hasClass = (current as HTMLElement).classList?.contains('element-identifier');
      const closest = (current as HTMLElement).closest?.('[data-element-identifier]');
      if (hasAttr || hasClass || closest) {
        return true;
      }
      current = (current as HTMLElement).parentElement;
    }
    return false;
  }

  // Event listeners are set with capture true; use methods as bound in ctor
  private handleClick(e: MouseEvent): void {
    const target = e.target as Element | null;
    if (!this.state.isActive || !target || this.isToolElement(target)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const info = this.analyzeElement(target);
    this.state.selectedElement = new SelectedOrHovered(target, info);
    this.updateUI();

    // eslint-disable-next-line no-console
    console.group('🎯 Elemento Identificado');
    if (info.dataComponent !== 'none') {
      // eslint-disable-next-line no-console
      console.log('🆔 Identificador:', info.dataComponent);
    }
    // eslint-disable-next-line no-console
    console.log('📋 Componente:', info.componentName);
    // eslint-disable-next-line no-console
    console.log('🏷️ Tipo:', info.type);
    // eslint-disable-next-line no-console
    console.log('🏗️ Tag:', info.tagName);
    // eslint-disable-next-line no-console
    console.log('🆔 ID:', info.id);
    // eslint-disable-next-line no-console
    console.log('🎨 Clases:', info.classes);
    // eslint-disable-next-line no-console
    console.log('📦 Props:', info.props);
    // eslint-disable-next-line no-console
    console.log('🔗 Elemento DOM:', target);
    // eslint-disable-next-line no-console
    console.groupEnd();

    this.dispatchEvent(new CustomEvent('element-selected', {
      detail: { element: target, info }
    }));
  }

  private handleMouseOver(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    if (!this.state.isActive || !target || this.isToolElement(target)) {
      return;
    }
    target.classList?.add('element-identifier-highlight');
    const info = this.analyzeElement(target);
    this.state.hoveredElement = new SelectedOrHovered(target, info);
  }

  private handleMouseOut(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    if (!this.state.isActive || !target) return;

    target.classList?.remove('element-identifier-highlight');
    if (!this.isToolElement(target)) {
      this.state.hoveredElement = null;
    }
  }


  private handleDrag(e: MouseEvent): void {
    if (!this.state.isDragging) return;

    const newX = e.clientX - this.state.dragOffset.x;
    const newY = e.clientY - this.state.dragOffset.y;

    const maxX = window.innerWidth - 350;
    const maxY = window.innerHeight - 200;

    this.state.panelPosition = new PanelPosition(
      Math.max(0, Math.min(newX, maxX)),
      Math.max(64, Math.min(newY, maxY))
    );

    this.updateUI();
  }

  private stopDrag = (): void => {
    this.state.isDragging = false;
    document.removeEventListener('mousemove', this.handleDrag as EventListener, true);
    document.removeEventListener('mouseup', this.stopDrag as EventListener, true);
  };

  // ==================== UTILIDADES ====================

  async copyToClipboard(text: string, type = 'texto'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      // eslint-disable-next-line no-console
      console.log(`✅ ${type} copiado al portapapeles: ${text}`);

      this.state.copyMessage = `📋 ${type} copiado!`;
      this.updateUI();

      setTimeout(() => {
        this.state.copyMessage = '';
        this.updateUI();
      }, 3000);

      this.dispatchEvent(new CustomEvent('copied', {
        detail: { text, type }
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error al copiar:', err);
      this.state.copyMessage = '❌ Error al copiar';
      this.updateUI();
      setTimeout(() => {
        this.state.copyMessage = '';
        this.updateUI();
      }, 3000);
    }
  }

  private attachEventListeners(): void {
    document.body.classList.add('element-identifier-active');
    document.addEventListener('click', this.handleClick, true);
    document.addEventListener('mouseover', this.handleMouseOver, true);
    document.addEventListener('mouseout', this.handleMouseOut, true);
  }

  private removeEventListeners(): void {
    document.body.classList.remove('element-identifier-active');
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('mouseover', this.handleMouseOver, true);
    document.removeEventListener('mouseout', this.handleMouseOut, true);
  }

  private clearHighlights(): void {
    document.querySelectorAll('.element-identifier-highlight').forEach((el) => {
      (el as HTMLElement).classList.remove('element-identifier-highlight');
    });
  }

  private setupAPI(): void {
    if (typeof window === 'undefined') return;
    const api = new ElementIdentifierAPI(this) as unknown as Record<string, unknown>;

    // Expose on window and globalThis
    (window as unknown as { elementIdentifier?: unknown }).elementIdentifier = api;
    try {
      (globalThis as unknown as { elementIdentifier?: unknown }).elementIdentifier = api;
    } catch (_) {
      // ignore environments without globalThis
    }

    // Create a real global variable alias in the page so the console can use
    // elementIdentifier.activate() without prefixing with window.
    // We do this by injecting a classic script that declares `var elementIdentifier = window.elementIdentifier;`
    // Only inject once.
    try {
      const doc = window.document;
      if (doc && !doc.getElementById('element-identifier-global-alias')) {
        const s = doc.createElement('script');
        s.id = 'element-identifier-global-alias';
        s.textContent = 'var elementIdentifier = window.elementIdentifier;';
        doc.head ? doc.head.appendChild(s) : doc.documentElement.appendChild(s);
      }
    } catch (_) {
      // If injection fails, window.elementIdentifier still works
    }
  }

  private cleanup(): void {
    this.removeEventListeners();
    this.clearHighlights();
    if (typeof window !== 'undefined') {
      const w = window as unknown as { elementIdentifier?: unknown };
      if (w.elementIdentifier) {
        try { delete w.elementIdentifier; } catch (_) { /* ignore */ }
      }
      try {
        const gt = globalThis as unknown as { elementIdentifier?: unknown };
        if (gt.elementIdentifier) delete gt.elementIdentifier;
      } catch (_) { /* ignore */ }
    }
  }

  // ==================== RENDERING ====================

  private updateUI(): void {
    this.render();
  }

  private render(): void {
    const { isActive, selectedElement, showPanel, copyMessage, panelPosition, isDragging, isMenuOpen, showWheel } = this.state;

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; }
        .overlay { pointer-events: auto; }
        :host(.global-styles) ~ * .element-identifier-active * { cursor: crosshair !important; }
        :host(.global-styles) ~ * .element-identifier-active *:not(.element-identifier):not([data-element-identifier]) { cursor: crosshair !important; }
        :host(.global-styles) ~ * .element-identifier-highlight:not(.element-identifier):not([data-element-identifier]) { outline: 3px dashed #f59e0b !important; outline-offset: 3px !important; background-color: rgba(245, 158, 11, 0.15) !important; box-shadow: 0 0 0 1px #dc2626 !important; }
        .info-panel { position: fixed; background: #111827; color: #10b981; padding: 16px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 350px; font-size: 12px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; pointer-events: auto; cursor: default !important; }
        .info-panel * { cursor: default !important; }
        .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; cursor: move !important; background: #374151; margin: -16px -16px 8px -16px; padding: 8px 10px; border-radius: 8px 8px 0 0; }
        .panel-header * { cursor: move !important; }
        .panel-title { color: #fbbf24; font-weight: bold; display: flex; align-items: center; font-size: 12px; }
        .close-button { background: none; border: none; color: #ef4444; font-size: 12px; cursor: pointer !important; padding: 2px; border-radius: 4px; transition: color 0.2s; }
        .close-button:hover { color: #fca5a5; }
        .info-row { margin-bottom: 8px; }
        .info-label { color: #60a5fa; }
        .identifier-section { margin-bottom: 8px; }
        .identifier-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .identifier-label { color: #a855f7; font-weight: bold; }
        .copy-button { background: none; border: none; color: #c084fc; cursor: pointer !important; padding: 4px; border-radius: 4px; transition: color 0.2s; }
        .copy-button:hover { color: #e9d5ff; }
        .identifier-value { color: #c084fc; font-size: 10px; font-weight: bold; background: rgba(147, 51, 234, 0.3); padding: 8px; border-radius: 4px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; }
        .classes-content, .props-content { font-size: 10px; color: #d1d5db; margin-top: 4px; max-height: 80px; overflow-y: auto; }
        .copy-message { margin-top: 12px; padding: 8px; background: rgba(16, 185, 129, 0.5); border-radius: 4px; color: #34d399; font-size: 10px; text-align: center; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .fab { position: fixed; bottom: 16px; right: 16px; pointer-events: auto; }
        .floating-button { color: white; border: none; padding: 12px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.3); cursor: pointer; transition: all 0.2s; display: grid; place-items: center; }
        .floating-button.on { background: #16a34a; }
        .floating-button.on:hover { background: #15803d; transform: scale(1.1); }
        .floating-button.off { background: #dc2626; }
        .floating-button.off:hover { background: #b91c1c; transform: scale(1.1); }
        .floating-button svg { width: 24px; height: 24px; }
        .menu { position: absolute; bottom: 60px; right: 0; background: #fff; color: #111827; border: 1px solid #e5e7eb; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); width: 200px; overflow: hidden; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial; }
        .menu[data-element-identifier] { pointer-events: auto; }
        .menu-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; font-size: 14px; cursor: pointer; background: #fff; border: none; width: 100%; text-align: left; }
        .menu-item:hover { background: #f8fafc; }
        .menu-item .label { color: #111827; }
        .menu-item .state { font-weight: 600; }
        .menu-item .state.on { color: #16a34a; }
        .menu-item .state.off { color: #dc2626; }
        .select-none { user-select: none; }
      </style>

      ${showWheel ? `
      <div class="fab" data-element-identifier="fab">
        <button class="floating-button ${isActive ? 'on' : 'off'}" onclick="this.getRootNode().host.toggleMenu()" title="Element Identifier">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
        ${isMenuOpen ? `
          <div class="menu" data-element-identifier="menu">
            <button class="menu-item" onclick="(()=>{const h=this.getRootNode().host; h && (h.toggle(), h.closeMenu());})()">
              <span class="label">Activo</span>
              <span class="state ${isActive ? 'on' : 'off'}">${isActive ? 'ON' : 'OFF'}</span>
            </button>
            <button class="menu-item" onclick="(()=>{const h=this.getRootNode().host; h && (h.togglePanel(), h.closeMenu());})()">
              <span class="label">Panel</span>
              <span class="state ${showPanel ? 'on' : 'off'}">${showPanel ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        ` : ''}
      </div>
      ` : ''}

      ${showPanel && selectedElement ? `
        <div class="info-panel ${isDragging ? 'select-none' : ''}"
             style="left: ${panelPosition.x}px; top: ${panelPosition.y}px;"
             data-element-identifier="info-panel">

          <div class="panel-header"
               onmousedown="this.getRootNode().host.startDrag(event)"
               data-element-identifier="panel-header">
            <h3 class="panel-title">🎯 Elemento Identificado</h3>
            <button class="close-button"
                    onclick="this.getRootNode().host.togglePanel()"
                    title="Ocultar panel">✕</button>
          </div>

          <div data-element-identifier="panel-content">
            ${selectedElement.info.dataComponent !== 'none' ? `
              <div class="identifier-section">
                <div class="identifier-header">
                  <span class="identifier-label">🆔 Identificador:</span>
                  <button class="copy-button"
                          onclick="this.getRootNode().host.copyToClipboard('${selectedElement.info.dataComponent}', 'Identificador')"
                          title="Copiar identificador">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
                <div class="identifier-value">${selectedElement.info.dataComponent}</div>
              </div>
            ` : ''}

            <div class="info-row">
              <span class="info-label">Componente:</span> ${selectedElement.info.componentName}
            </div>
            <div class="info-row">
              <span class="info-label">Tipo:</span> ${selectedElement.info.type}
            </div>
            <div class="info-row">
              <span class="info-label">Tag:</span> ${selectedElement.info.tagName}
            </div>
            <div class="info-row">
              <span class="info-label">ID:</span> ${selectedElement.info.id}
            </div>
            <div class="info-row">
              <span class="info-label">Clases:</span>
              <div class="classes-content">${selectedElement.info.classes}</div>
            </div>
            ${selectedElement.info.props !== 'none' ? `
              <div class="info-row">
                <span class="info-label">Props:</span>
                <div class="props-content">${typeof selectedElement.info.props === 'string' ? selectedElement.info.props : JSON.stringify(selectedElement.info.props, null, 2)}</div>
              </div>
            ` : ''}
          </div>

          ${copyMessage ? `
            <div class="copy-message">${copyMessage}</div>
          ` : ''}
        </div>
      ` : ''}
    `;

    this.injectGlobalStyles();
  }

  private injectGlobalStyles(): void {
    if (typeof document === 'undefined') return;
    let globalStyles = document.getElementById('element-identifier-global-styles') as HTMLStyleElement | null;
    if (!globalStyles) {
      globalStyles = document.createElement('style');
      globalStyles.id = 'element-identifier-global-styles';
      document.head.appendChild(globalStyles);
    }

    globalStyles.textContent = `
      .element-identifier-active * { cursor: crosshair !important; }
      .element-identifier-active *:not(.element-identifier):not([data-element-identifier]) { cursor: crosshair !important; }
      .element-identifier-highlight:not(.element-identifier):not([data-element-identifier]) { outline: 3px dashed #f59e0b !important; outline-offset: 3px !important; background-color: rgba(245, 158, 11, 0.15) !important; box-shadow: 0 0 0 1px #dc2626 !important; }
    `;
  }

  static get observedAttributes(): string[] {
    return ['auto-start', 'active', 'show-panel', 'theme', 'position', 'show-wheel'];
  }

  private parseBoolAttr(val: string | null): boolean | undefined {
    if (val === null) return undefined;
    const v = String(val).trim().toLowerCase();
    if (v === '' || v === 'true' || v === '1' || v === 'on' || v === 'yes') return true;
    if (v === 'false' || v === '0' || v === 'off' || v === 'no') return false;
    return undefined;
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case 'auto-start': {
        const b = this.parseBoolAttr(newValue);
        if (b === true && !this.state.isActive) this.activate();
        if (b === false && this.state.isActive) this.deactivate();
        break;
      }
      case 'active': {
        const b = this.parseBoolAttr(newValue);
        if (b === true && !this.state.isActive) this.activate();
        if (b === false && this.state.isActive) this.deactivate();
        break;
      }
      case 'show-panel': {
        const b = this.parseBoolAttr(newValue);
        if (typeof b === 'boolean') {
          this.state.showPanel = b;
          this.updateUI();
        }
        break;
      }
      case 'show-wheel': {
        const visible = !(newValue === 'false' || newValue === '0' || newValue === 'off');
        this.state.showWheel = visible;
        this.updateUI();
        break;
      }
      case 'theme':
        break;
      case 'position':
        break;
      default:
        break;
    }
  }

  // Public method so inline onmousedown in template can call it via host
  public startDrag(e: MouseEvent): void {
    this.state.isDragging = true;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.state.dragOffset = new DragOffset(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    document.addEventListener('mousemove', this.handleDrag as EventListener, true);
    document.addEventListener('mouseup', this.stopDrag as EventListener, true);
  }
}


export function defineElementIdentifier(tag = 'element-identifier'): void {
  if (typeof window === 'undefined' || typeof customElements === 'undefined') return;
  if (!customElements.get(tag)) {
    customElements.define(tag, ElementIdentifier);
  }
}

// Auto-define in browser environments
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  defineElementIdentifier();
  // eslint-disable-next-line no-console
  console.log('%c🎯 Element Identifier Web Component cargado!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
  // eslint-disable-next-line no-console
  console.log('%cUso: <element-identifier></element-identifier>', 'color: #10b981;');
  // eslint-disable-next-line no-console
  console.log('%cAPI: elementIdentifier.activate(), elementIdentifier.help()', 'color: #8b5cf6;');
}