import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {UserModel} from './user.model';
import {ModelType} from '@typegoose/typegoose/lib/types';
import {CreateUserDto} from './dto/create-user.dto';
import {compare, genSaltSync, hashSync} from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = new this.userModel({
			email: dto.login,
			passwordHash: hashSync(dto.password, genSaltSync(3))
		});

    await user.save()

		return { email: user.email };
	}

	async findUser(email: string) {
		return await this.userModel.findOne({ email: email }).exec();
	}
  async validateUser(login: string, password: string) {
		const user = await this.findUser(login);

		if (!user) {
			throw new BadRequestException('no user such email');
		}

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) {
			throw new BadRequestException('incorrect password');
		}

		return { email: user.email, id: user.id };
	}

	async login(email: string, id: number) {
		const payload = { email, id };

		return {
			access_token: await this.jwtService.sign(payload)
		};
	}
}
