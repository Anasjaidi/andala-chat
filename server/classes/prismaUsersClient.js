const prismaClient = require("../prisma/client/prisma");

const bcrypt = require("bcryptjs");

class prismaUsersRepository {
	constructor(conf) {
		this.prisma = prismaClient;
		this.users = this.prisma.user;
	}

	async addUser(user) {
		const newUser = await this.users.create({
			data: { ...user, conversations: { create : [{title: "conversation"}]} },
		});
		return newUser;
	}

	async findUserByMail(email) {
		return await this.users.findUnique({
			where: { email },
			select: { email: true, password: true , uid: true, conversations: true},
		});
	}
	
	async findUserByUid(uid) {
		return await this.users.findFirst({
			where: { uid: uid },
			select: { email: true, password: true , uid: true, passwordChangeAt: true, conversations: true},
		});
	}

	async getAllUsers() {
		return await this.users.findMany({"select" : {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			uid: true
		}})
	}
}

const prismaUsersClient = new prismaUsersRepository();

module.exports = prismaUsersClient;
