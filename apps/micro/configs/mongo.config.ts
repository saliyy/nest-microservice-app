import {ConfigService} from '@nestjs/config';
import {TypegooseModuleOptions} from 'nestjs-typegoose/dist/typegoose-options.interface';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoConnectionString(configService),
		...getMongoOptions()
	};
};




const getMongoConnectionString = (configService: ConfigService): string => {
	return 'mongodb://' +
		configService.get('MONGO_LOGIN') +
		':' +
		configService.get('MONGO_PASSWORD') +
		'@' +
		configService.get('MONGO_HOST') +
		':' +
		configService.get('MONGO_PORT') +
		'/' +
		configService.get('MONGO_AUTH_DATABASE');
};


const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true
});
