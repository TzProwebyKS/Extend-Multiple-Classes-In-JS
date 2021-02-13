function multipleClasses(...genericClasses) {
	if (genericClasses.length < 2) {
		throw new Error(`
            Don't use this multiple extender if you're extending only one class.
        `);
	}
	
	function copyAndSetProps(toBeSetted, toBeCopied) {
		Object.getOwnPropertyNames(toBeCopied)
			.concat(Object.getOwnPropertySymbols(toBeCopied))
			.forEach((propName) => {
				if (propName !== "prototype") {
					Object.defineProperty(
						toBeSetted,
						propName,
						Object.getOwnPropertyDescriptor(toBeCopied, propName)
					);
				}
			});
	}

	class multipleExtendedClass {
		constructor(props) {
			for (let i = 0, len = genericClasses.length; i < len; i++) {
				copyAndSetProps(this, new genericClasses[i](props[i]));
			}
		}
	}

	for (let genericClass of genericClasses) {
		copyAndSetProps(
			multipleExtendedClass.prototype,
			genericClass.prototype
		);

		copyAndSetProps(
			multipleExtendedClass,
			genericClass
		);
	}

	return multipleExtendedClass;
}