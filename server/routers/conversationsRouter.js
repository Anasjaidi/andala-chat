const express = require("express");
const {
	saveNewConversation,
	getAllConversationsAssociatedWithUser,
      addNewMessage,
      getAllMessagesAssocitedWithConversation,
      deleteConversation,
      updateConversation
} = require("../controllers/conversationsController");
const ErrorsWrapper = require("../errors/errorsWrapper");
const authDAO = require("../classes/auth");

const router = express.Router();

router
	.route("/")
	.get(
		ErrorsWrapper(authDAO.protectRoute),
		ErrorsWrapper(getAllConversationsAssociatedWithUser)
	)
	.post(ErrorsWrapper(authDAO.protectRoute), ErrorsWrapper(saveNewConversation))


router
	.route("/:cnvId")
	.get(
		ErrorsWrapper(authDAO.protectRoute),
		ErrorsWrapper(getAllMessagesAssocitedWithConversation)
	)
	.post(ErrorsWrapper(authDAO.protectRoute), ErrorsWrapper(addNewMessage))
	.delete(
		ErrorsWrapper(authDAO.protectRoute),
		ErrorsWrapper(deleteConversation)
	)
	.patch(
		ErrorsWrapper(authDAO.protectRoute),
		ErrorsWrapper(updateConversation)
	);

module.exports = router;
