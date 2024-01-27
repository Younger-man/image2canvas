import type { ImageItem, Text, BaseImage } from './type';
import {
  createCanvas,
  drawBackgroundImage,
  drawComponseImage,
  setCtxProps,
  drawContext,
} from './util';

export const imageToCanvas = async (
  base: BaseImage,
  image: Array<ImageItem> = [],
  text: Text[] = [],
  scale: number = 1
) => {
  //缩小的倍数
  try {
    //创建初始画板的大小，
    const { canvas, ctx } = createCanvas(
      base.width * scale,
      base.height * scale
    );
    setCtxProps(ctx, 'textAlign', 'center');
    setCtxProps(ctx, 'textBaseline', 'top');
    //绘制背景图
    base.url && (await drawBackgroundImage(ctx, base.url, scale));
    // 绘制合成图
    await drawComponseImage(ctx, image, scale);
    text.forEach((item: Text) => {
      setCtxProps(ctx, 'fillStyle', item.color || 'black');
      setCtxProps(
        ctx,
        'font',
        `${item.fontSize * scale}px sans-serif` || `${24 * scale}px sans-serif`
      );
      if (/&&/.test(item.content)) {
        drawContext(ctx, item, scale);
      } else {
        ctx.fillText(item.content, item.sx * scale, item.sy * scale); //
      }
    });
    return canvas.toDataURL('image/png');
  } catch (e) {
    return e;
  }
};
