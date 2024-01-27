import type { ImageData, ImageItem, Text } from './type.ts';
/**
 * 获取图片数据
 * @param data 图片资源 地址或者图片数据
 */
export declare const loadImage: (data: string) => Promise<ImageData>;
/**
 * 初始化宽高
 * @param width number
 * @param height number
 * @returns
 */
export declare const createCanvas: (width: number, height: number) => {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};
/**
 * 绘制背景图
 */
export declare const drawBackgroundImage: (ctx: CanvasRenderingContext2D, url: string, scale?: number) => Promise<void>;
export declare const drawComponseImage: (ctx: CanvasRenderingContext2D, images?: ImageItem[], scale?: number) => Promise<void>;
/**
 * 多行文本绘制
 * @param ctx
 * @param text
 * @param scale
 */
export declare const drawContext: (ctx: CanvasRenderingContext2D, text: Text, scale?: number) => void;
export declare const setCtxProps: (ctx: CanvasRenderingContext2D, key: string, value: string) => void;
