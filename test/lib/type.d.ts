export interface ImageData {
    image: CanvasImageSource;
    width: number;
    height: number;
}
export interface ImageItem {
    url: string;
    sx: number;
    sy: number;
}
export interface Text {
    content: string;
    sx: number;
    sy: number;
    color: string;
    fontSize: number;
    lineHeight: number;
}
export interface BaseImage {
    url: string;
    width: number;
    height: number;
}
