// Type declarations for libraw-wasm
declare module 'libraw-wasm' {
  export interface LibRawImageData {
    data: Uint8Array;
    width: number;
    height: number;
    colors: number;
  }

  export interface LibRawParams {
    use_camera_wb: number;
    use_auto_wb: number;
    output_color: number;
    gamma_16bit: number;
    no_auto_bright: number;
    user_qual: number;
    four_color_rgb: number;
    highlight: number;
    use_fuji_rotate: number;
  }

  export interface LibRawImgData {
    params: LibRawParams;
  }

  export class LibRaw {
    constructor();
    imgdata: LibRawImgData;
    open_buffer(buffer: Uint8Array): number;
    unpack(): number;
    dcraw_process(): number;
    dcraw_make_mem_image(): LibRawImageData | null;
    recycle(): void;
  }

  export default LibRaw;
}