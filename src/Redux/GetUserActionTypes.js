const userLoadStart = () => ({
	type: "USERS_LOAD_START",
});

const userLoadSuccess = (user) => ({
	type: "USERS_LOAD_SUCCESS",
	payload: user,
});

const userLoadError = (errorMessage) => ({
	type: "USERS_LOAD_ERROR",
	payload: errorMessage,
});

export default {
	userLoadStart,
	userLoadSuccess,
	userLoadError,
};