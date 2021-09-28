module.exports = {
	moduleNameMapper: {
		'\\.(gif|jpeg|jpg|png|ico|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__test__/config/__mocks__/fileMock.ts',
		'\\.(css|less|sass|scss)$': '<rootDir>/src/__test__/config/__mocks__/styleMock.ts'
	},
	preset: 'ts-jest',
	testEnviroment: 'jsdom',
	setupFilesAfterEnv:
	['<rootDir>/src/__test__/config/importJestDOM.ts',
	'<rootDir>/src/__test__/config/__mocks__/lockalStorageMock.ts']
};