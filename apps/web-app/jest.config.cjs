module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	transformIgnorePatterns: ["node_modules/(?!(@bennyui/core)/)"],
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
