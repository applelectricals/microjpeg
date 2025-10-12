// Type declarations for wasm-vips
declare module 'wasm-vips' {
  export interface VipsImage {
    width: number;
    height: number;
    bands: number;
    writeToBuffer(format: string, options?: any): Uint8Array;
    delete(): void;
  }

  export interface VipsStatic {
    Image: {
      newFromBuffer(buffer: Uint8Array, options?: string): VipsImage;
    };
  }

  export function Vips(): Promise<VipsStatic>;
  export default Vips;
}