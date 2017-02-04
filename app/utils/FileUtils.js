import fs from 'fs';

const checkIfImage = (ext) => {
	ext = ext.toLowerCase(ext);
	return (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif')
}

const isDirOrImage = (file) => {
	return new Promise (
		(res, rej) => {
			fs.stat(file.path, (err, stat) => {
				if(err)
					rej(err)

				let isDirectory = stat.isDirectory();
				let isImage = !isDirectory && checkIfImage(file.filename.substr(file.filename.lastIndexOf('.') + 1));
				res({
					file,
					isDirectory,
					isImage
				})
			})
		}
	)
}

const FilterContent = (files) => {
	let AllPromises = [];

	AllPromises = files.map((file) => {
		return isDirOrImage(file)
	})

	return Promise.all(AllPromises)
}

const readDir = (dirSrc) => {
	return new Promise (
		(res, rej) => {
			fs.readdir(dirSrc, (err, files) => {
				if(err)
					rej(err);

				res(files.map((file) => {
					return {
						filename: file,
						path: `${dirSrc}/${file}`
					}
				}))
			})
		}
	)
}

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };

}


export {
	readDir,
	checkIfImage,
	FilterContent,
	calculateAspectRatioFit
}