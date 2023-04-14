const authDAO = require("../classes/auth");
const prismaUsersClient = require("../classes/prismaUsersClient");
const AppError = require("../errors/AppError");

const signup = async (req, res, next) => {

  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password)
    next(new AppError(400, "please provide [firstName, lastName, password, email]"))

	const { newUser, token } = await authDAO.signup(req.body);

	res.status(201).json({ status: "success", data: newUser, token });
};

const signin = async (req, res, next) => {
	if (!req.body.email || !req.body.password)
		next(new AppError(400, "please provide email and password."));

	const { token, conversations } = await authDAO.signin({
		email: req.body.email,
		password: req.body.password,
	});

	res.status(200).json({
		status: "success",
		token,
		conversations,
	});
};

const getAllUsers = async (req, res, next) => {
	const users = await prismaUsersClient.getAllUsers();

	res.status(400).json({
		status: "success",
		result: users.length,
		data: users,
	});
};

module.exports = { signup, signin, getAllUsers };
