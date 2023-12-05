import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import * as fs from "node:fs";


//distフォルダのファイル削除
fs.readdir('./dist', function(e, files){
	if(e){
		console.log(e);
	}else{
		files.forEach(function(file){
			fs.unlink(`./dist/${file}`, (e)=>e?console.log(e):"");
		});
	}

});

//ファイル圧縮
const compressedFiles = await imagemin(['images/*.{jpg,png,gif}'], {
	destination: 'dist/',
	plugins: [
		imageminJpegtran(),
		imageminGifsicle(),
		imageminPngquant({
			quality: [0.6, 0.8]
		})
	]
});


//画像圧縮後imgagesフォルダのファイルを削除
fs.readdir('./images', function(e, files){
	if(e){
		console.log(e);
	}else{
		files.forEach(function(file){
			fs.unlink(`./images/${file}`, (e)=>e?console.log(e):"");
		});
	}

});

console.log(compressedFiles);
//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]