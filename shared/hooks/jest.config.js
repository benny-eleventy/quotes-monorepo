module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		moduleNameMapper: {
			"^apis/(.*)$": "<rootDir>/shared/hooks/shared/apis/$1",
		},
	},
};
