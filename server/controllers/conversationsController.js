const prismaConversationsClient = require("../classes/prismaConversationClient");

const { Configuration, OpenAIApi } = require("openai");
const AppError = require("../errors/AppError");

const openai = new OpenAIApi(
	new Configuration({ apiKey: process.env.OPENAI_KEY })
);

const saveNewConversation = async (req, res, next) => {

	if (!req.body.title)
		next(new AppError(409, "title is missing."))

	const addedConversation =
		await prismaConversationsClient.createNewConversation(req.user.uid, {
			title: req.body.title,
		});

	res.status(201).json({
		status: "success",
		data: addedConversation,
	});
};

const getAllConversationsAssociatedWithUser = async (req, res, next) => {
	const conversations = req.user.conversations;

	res.status(200).json({
		status: "success",
		result: conversations.length,
		data: conversations,
	});
};

const getAllMessagesAssocitedWithConversation = async (req, res, next) => {
	const messages = await prismaConversationsClient.getAllMessages(
		req.params.cnvId
	);

	res.status(200).json({
		status: "success",
		results: messages.length,
		data: messages,
	});
};

const addNewMessage = async (req, res, next) => {


  if (!req.body.content) next(new AppError(400, "please provide a message content."))

	const messages = (
		await prismaConversationsClient.getAllMessages(req.params.cnvId)
	).map((el) => ({ content: el.content, role: el.type }));

	const rt = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [...messages, { content: req.body.content, role: "user" }],
	});

	const message = await prismaConversationsClient.createNewMessage(
		req.params.cnvId,
		{ content: req.body.content , type: "user"}
	);

  const response = await prismaConversationsClient.createNewMessage(
		req.params.cnvId,
		{
			content: rt.data.choices[0].message.content,
			type: rt.data.choices[0].message.role,
		}
	);

	res.status(201).json({
		status: "success",
    data: response
	});
};

const deleteConversation = async (req, res, next) => {
  await prismaConversationsClient.deleteConversation(req.params.cnvId)
	res.status(204).json({
		status: "success",
	});
};

const updateConversation = async (req, res, next) => {

  if (!req.body.title) next(new AppError(400, "please provide a title"))

  const updated = await prismaConversationsClient.updateConversation(req.params.cnvId, req.body.title)
	res.status(200).json({
		status: "success",
    data: updated
	});
};

module.exports = {
	saveNewConversation,
	getAllConversationsAssociatedWithUser,
	getAllMessagesAssocitedWithConversation,
	updateConversation,
	addNewMessage,
	deleteConversation,
};
