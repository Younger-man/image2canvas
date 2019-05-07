

/* 
    @param data: 图片资源 地址或者图片数据
    获取图片数据
*/
function loadImage(data){
    return new Promise((resolve,reject)=>{
        const image = new Image();
        if(!(/data:image\/(jpeg|png|gif);base64.+/.test(data))){
            //如果数据不是bass64， 为图片设置跨域
            image.crossOrigin = "anonymous"; 
        }
        function cleanup(){
            image.onload = null;
            image.onerror = null;
        }
        image.onload = () => {cleanup();resolve({image:image,width:image.width,height:image.height})}
        image.onerror = (err) =>{cleanup();reject(err)}
        image.src = data;
    });
}
/* 
  初始化canvas
*/
function createCanvas(width,height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    //getContext() 方法返回一个用于在画布上绘图的环境。 目前只支持2d
    const ctx = canvas.getContext('2d');
    // ctx.fillRect(0,0,width,height);
    // ctx.fill();
    return {canvas,ctx};
}

/*** 
 * @param Object base:合成图片的背景图
           ｛
                url:"",
            ｝
    @param Array image:需要合成的图片数组
            [{
                url:"",
                sx:'',
                sy:''
             }
            ]
    @param  Array text: 需要合成的文字数组
             [
                 {
                     content:'',
                     sx:'',
                     sy:'',
                 }
             ] 
***/

module.exports = async function imageToCanvas(base,image=[],text=[],model=1){
    //缩小的倍数
    let scale = model;
    try {
       
        //创建初始画板的大小，
        const {canvas,ctx} = createCanvas(base.width*scale,base.height*scale);
        //绘制背景图
        if(base.url){
            const baseImage = await loadImage(base.url);
            ctx.drawImage(baseImage.image,0,0,baseImage.width*scale,baseImage.height*scale);
        } 
        //  将image数组中的图片合成
        for(index in image) {
            const composeImage = await loadImage(image[index].url);
            ctx.drawImage(composeImage.image,image[index].sx*scale,image[index].sy*scale,composeImage.width*scale,composeImage.height*scale);
        }
        ctx.textAlign = 'center';   
        ctx.textBaseline = 'top'; 
        for(index in text) {
            ctx.fillStyle = text[index].color || "black";
            ctx.font = `${text[index].fontSize*scale}px sans-serif` || `${24*scale}px sans-serif`;
            //存在换行符
            if(/&&/.test(text[index].content)) {
                var contentLine = text[index].content.split('&&');
                var fontHeight = text[index].lineHeight*scale || 30*scale;
                for(line in contentLine) {
                     var lineY = line * fontHeight + text[index].sy*scale;
                     ctx.fillText(contentLine[line], text[index].sx*scale, lineY);//

                }
            }else {
                 ctx.fillText(text[index].content, text[index].sx*scale, text[index].sy*scale);//
            }
        }
        // cb(canvas.toDataURL("image/png"));
        console.log(canvas.toDataURL("image/png"));
        return canvas.toDataURL("image/png")
    }catch(e){
        // cb(e);
        return e
    }
} 