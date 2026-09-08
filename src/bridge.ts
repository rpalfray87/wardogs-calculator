/** Bridge exposed by electron/preload.cjs. Absent when the app runs in a browser. */
export interface WardogsBridge {
  hide(): void;
  quit(): void;
  setOpacity(value: number): void;
  setHotkey(accelerator: string): Promise<{ ok: boolean; accelerator: string }>;
  onShown(callback: () => void): () => void;
}

declare global {
  interface Window {
    wardogs?: WardogsBridge;
  }
}

export const bridge: WardogsBridge | undefined =
  typeof window === 'undefined' ? undefined : window.wardogs;

export const isElectron = bridge !== undefined;
