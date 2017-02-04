import fs from 'fs';

const checkIfImage = (ext) => {
	ext = ext.toLowerCase(ext);
	return (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif')
}

const readDir = (dirSrc) => {
	return new Promise (
		(res, rej) => {
			fs.readdir(dirSrc, (err, files) => {
				if(err)
					rej(err);

				res(files.filter(file => {
					return checkIfImage(file.substr(file.lastIndexOf('.') + 1));
				}))
			})
		}
	)
}

export {
	readDir,
	checkIfImage
}