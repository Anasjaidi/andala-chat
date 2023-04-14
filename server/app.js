const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routers/usersRouter");
const ErrorsGateway = require("./errors/errorsGateway");
const AppError = require("./errors/AppError");
const conversationRouter = require('./routers/conversationsRouter')

const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
	new Configuration({ apiKey: process.env.OPENAI_KEY })
);

const app = express();

// start global middlewares

app.use(express.json());
app.use(morgan("dev"));

// start routes

app.use("/api/v1/user", usersRouter);

app.use("/api/v1/conversation", conversationRouter)

// app.use("/api/v1/openai", async (req, res) => {
// 	const rt = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: [{role: "user", content: "my name is anas jaidi"}, {role: "user", content: req.body.qs}] });
//   console.log(rt.data.choices);
//   res.status(200).json({
//     reply: rt.data.choices
//   })
// });

// start default controller

app.use("*", (req, res, next) => {
	next(new AppError(404, `resource requested ${req.baseUrl} not found.`));
});

// start errors gateway

app.use(ErrorsGateway);

module.exports = app;
