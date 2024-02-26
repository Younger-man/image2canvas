# common__web__image2canvas

一个通用的前端图片合成库。可以用于活动海报的前端合成等场景。

#### image2Canvas

通过canvas将图片资源和文字合成在一张图片上，（注：本库适用将原始大小的图片合成，所以参数里面的宽高请选用图片本身的宽高。）


### install
        npm install image-compose --save

### Usage

        import image2canvas from "image-compose";

        image2Canvas(base,image,text);


### 参数详解：

| 名称 | 是否可选 | 类型 | 解释 |
| ------| ------| ------| ----- |
| base | 是| Object | 合成图片的底图，如果为空则为白底 |
| image | 否 | Array | 需要合成的图片,其数组元素为对象,如果没有需要合成的图片则穿空数组[] |
| text | 否 | Array | 需要合成的文字，数组元素为对象 ,没有则穿空数组[]|



#### base
| 名称 | 是否可选 | 类型 | 解释 |
| ------| ------| ------| ----- |
| url | 可选 | String | 合成图片的底图,可以是地址或者图片base64数据 |
| width | 必选 | Number | 合成图片的底图宽度|
| height | 必选 | Number | 合成图片的底图高度|



#### image中元素的属性

| 名称 | 是否可选 | 类型 | 解释 |
| ------| ------| ------| ----- |
| url | 是 | String | 需要合成的图片,可以是地址或者图片base64数据 |
| sx | 是 | Number | 图片左上角距离底图左上角的横轴距离 |
| sy | 是 | Number | 图片左上角距离底图左上角的纵轴距离 |


####  text中元素的属性
| 名称 | 是否可选 | 类型 | 解释 |
| ------| ------| ------| ----- |
| content | 是 | String | 需要合成的文字 以'&&'作为换行符 |
| sx | 　是 | Number |文本中心相对于底图的 x坐标 |
| sy | 是 | Number | 文本中心相对于底图的y坐标 |
| color | 可选 |String | 文字颜色|
| fontSize | 可选 | String | 文字大小。default:24 |
| lineHeight | 可选 | String | 文字行高，default:30 |









### example

    var base = "./img/img-poster@2x.png";
    var compose = "./img/img-wenbenkuang@2x.png";
    var qrCode = "./img/img-QRcode@2x.png";

    image2canvas(
      {
        url: base,
        width: 750,
        height: 1206,
      },
      [
        {
          url: compose,
          width: 605,
          height: 636,
          sx: 72,
          sy: 84,
        },
        {
          url: qrCode,
          sx: 322,
          sy: 520,
        },
      ],
      [
        {
          content:
            "xxx&&在意大利的朱丽叶故居，用意大利语许下&&了2019年的第一个关于XX的愿望。",
          sx: 375,
          sy: 160,
          color: "#876746",
          fontSize: 30,
          lineHeight: 30,
        },
        {
          content: "Ta的愿望守护咒语是&&'L'Amore di dio con te'",
          sx: 375,
          sy: 382,
          lineHeight: 30,
        },
      ],
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
