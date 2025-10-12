// Type declarations for libraw-wasm
declare module 'libraw-wasm' {
  export interface LibRawMetadata {
    width: number;
    height: number;
    iso_speed: number;
    shutter: number;
    aperture: number;
    focal_len: number;
    timestamp: Date;
    desc: string;
    artist: string;
    thumb_format?: string;
    [key: string]: any;
  }

  export interface LibRawSettings {
    bright?: number;           // brightness (default: 1.0)
    threshold?: number;        // wavelet denoise threshold (default: 0.0)
    autoBrightThr?: number;    // portion of clipped pixels for auto-brightening (default: 0.01)
    adjustMaximumThr?: number; // auto-adjust max if channel overflow above threshold (default: 0.75)
    expShift?: number;         // exposure shift in linear scale (default: 1.0)
    expPreser?: number;        // preserve highlights when expShift>1 (default: 0.0)
    halfSize?: boolean;        // output at 1/2 size (default: false)
    fourColorRgb?: boolean;    // separate interpolation for two green channels (default: false)
    highlight?: number;        // highlight mode 0..9 (default: 0)
    useAutoWb?: boolean;       // auto white balance (default: false)
    useCameraWb?: boolean;     // camera's recorded WB (default: false)
  }

  export class LibRaw {
    constructor();
    open(buffer: Uint8Array, settings?: LibRawSettings): Promise<void>;
    metadata(fullOutput?: boolean): Promise<LibRawMetadata>;
    imageData(): Promise<Uint8Array>;
  }

  export default LibRaw;
}