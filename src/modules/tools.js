export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getSVG = async (path, className, hashId) => {
	let svg = await $.ajax({url: path}, true);
	if (className !== undefined) {
		svg.documentElement.classList.add(className);
	}

	let string = new XMLSerializer().serializeToString(svg.documentElement);

	if (hashId !== undefined) {
		let newId = `${hashId}_${(Math.random() + 1).toString(36).substring(7)}`;
		string = string.replaceAll(hashId, newId);
		return { asset: string, id: newId };
	}

	return string;
}

export const shuffle = (array) => {
	let currentIndex = array.length, tempVal, randomIndex;

	while (0 !== currentIndex)
	{
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempVal = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempVal;
	}

	return array;
}

export const getBase64 = async (file) => {
    let fr   = new FileReader();
    return await (new Promise((resolve) => {
        fr.readAsDataURL(file);
        fr.onloadend = () => { resolve(fr.result); }
    }));
}