const postsLoadStart = () => ({
	type: "POSTS_LOAD_START",
});

const postsLoadSuccess = (posts) => ({
	type: "POSTS_LOAD_SUCCESS",
	payload: posts,
});

const postsLoadError = (errorMessage) => ({
	type: "POSTS_LOAD_ERROR",
	payload: errorMessage,
});

export default {
	postsLoadStart,
	postsLoadSuccess,
	postsLoadError,
};