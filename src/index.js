

/* 
    @param data: 图片资源 地址或者图片数据
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
        image.onload = () => {cleanup();resolve(image)}
        image.onerror = (err) =>{cleanup();reject(err)}
        image.src = data;
    });
}

function createCanvas(width,height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    // ctx.fillRect(0,0,width,height);
    // ctx.fill();
    return {canvas,ctx};
}

/* 
    @param base :合成图片的背景图
           ｛
                url:"",
                width:'',
                height:'',
            ｝
    @param image:需要合成的图片数组
            [
                url:"",
                width:'',
                height:'',
                sx:'',
                sy:''
            ]
    @param  text: 需要合成的文字数组
             [
                 {
                     content:'',
                     sx:'',
                     sy:'',
                 }
             ]   
*/

module.exports = async function imageToCanvas(base,image=[],text=[],cb){
    const {canvas,ctx} = createCanvas(base.width,base.height);
    try {
        const baseImage = await loadImage(base.url);
        ctx.drawImage(baseImage,0,0,base.width,base.height);
        for(index in image) {
            const composeImage = await loadImage(image[index].url);
            ctx.drawImage(composeImage,image[index].sx,image[index].sy,image[index].width,image[index].height);
        }
        ctx.textAlign = 'center';   
        ctx.textBaseline = 'top'; 
        for(index in text) {
            ctx.fillStyle = text[index].color || "black";
            ctx.font = text[index].font || "24px sans-serif";
            //存在换行符
            if(/&&/.test(text[index].content)) {
                var contentLine = text[index].content.split('&&');
                var fontHeight = text[index].lineHeight || 30;
                for(line in contentLine) {
                     var lineY = line * fontHeight + text[index].sy;
                     ctx.fillText(contentLine[line], text[index].sx, lineY);//

                }
            }else {
                 ctx.fillText(text[index].content, text[index].sx, text[index].sy);//
            }
        }
        cb(canvas.toDataURL("image/png"));
        // loadImage(base.url).then((baseImage)=> {
        //     console.log(baseImage);
        //      ctx.drawImage(baseImage,0,0,base.width,base.height);
        //      cb(canvas.toDataURL("image/png"));


        // });
    }catch(e){
        cb(e);
    }
} 