// import image2Canvas from "../dist/image2canvas";
const imageToCanvas = require('../src/index');
const base = "./img/img-poster@2x.png";
const compose = "./img/img-wenbenkuang@2x.png";
const qrCode = "./img/img-QRcode@2x.png";



describe('test',()=> {
    test('1',async() => {
        await expect(imageToCanvas(
            {
                url:base,
            },[
                {
                    url:compose,
                    sx:72,
                    sy:84,
                },{
                    url:qrCode,
                    sx:322,
                    sy:520,
                }
            ],[
                {
                    content:'xxx&&在意大利的朱丽叶故居，用意大利语许下&&了2019年的第一个关于XX的愿望。',
                    sx:375,
                    sy:160,
                    // color:"#876746",
                    fontSize:30,
                    lineHeight:30,
                },{
                    content:"Ta的愿望守护咒语是&&'L'Amore di dio con te'",
                    sx:375,
                    sy:382,
                }
            ],1
        ))
        .resolves
        // .toBe(3);
        .toBeDefined();
    },10000)
})