import type { ImageData, ImageItem, Text } from './type.ts';

const cleanup = (image) => {
  image.onload = null;
  image.onerror = null;
};

/**
 * 获取图片数据
 * @param data 图片资源 地址或者图片数据
 */
export const loadImage = (data: string): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (!/data:image\/(jpeg|png|gif);base64.+/.test(data)) {
      //如果数据不是bass64， 为图片设置跨域
      image.crossOrigin = 'anonymous';
    }
    image.onload = () => {
      cleanup(image);
      resolve({ image: image, width: image.width, height: image.height });
    };
    image.onerror = (err) => {
      cleanup(image);
      reject(err);
    };
    image.src = data;
  });
};

/**
 * 初始化宽高
 * @param width number
 * @param height number
 * @returns
 */
export const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  //getContext() 方法返回一个用于在画布上绘图的环境。 目前只支持2d
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  return { canvas, ctx };
};

/**
 * 绘制背景图
 */
export const drawBackgroundImage = async (
  ctx: CanvasRenderingContext2D,
  url: string,
  scale: number = 1
) => {
  const baseImage: ImageData = await loadImage(url);
  ctx.drawImage(
    baseImage.image,
    0,
    0,
    baseImage.width * scale,
    baseImage.height * scale
  );
};

export const drawComponseImage = async (
  ctx: CanvasRenderingContext2D,
  images: ImageItem[] = [],
  scale: number = 1
) => {
  //  将image数组中的图片合成
  for (const index in images) {
    const composeImage: ImageData = await loadImage(images[index].url);
    ctx.drawImage(
      composeImage.image,
      images[index].sx * scale,
      images[index].sy * scale,
      composeImage.width * scale,
      composeImage.height * scale
    );
  }
};

/**
 * 多行文本绘制
 * @param ctx
 * @param text
 * @param scale
 */
export const drawContext = (
  ctx: CanvasRenderingContext2D,
  text: Text,
  scale: number = 1
) => {
  const list = text.content.split('&&');
  const fontHeight = text.lineHeight * scale || 30 * scale;
  list.forEach((item: string, index: number) => {
    const lineY = index * fontHeight + text.sy * scale;
    ctx.fillText(item, text.sx * scale, lineY); //
  });
};

export const setCtxProps = (
  ctx: CanvasRenderingContext2D,
  key: string,
  value: string
) => {
  ctx[key] = value;
};
