module.exports =  {
	createError: (param) => {
		var error = new Error();
		error.code = param.code;
		error.message = param.message;
		return error;
	}
}
