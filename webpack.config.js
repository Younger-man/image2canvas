var path = require('path');

module.exports = {
    entry:'./src/index.js',
    mode: "development",
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'image2canvas.js',
        library: 'image2canvas',
       libraryTarget: 'umd',
    }
}