-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('ASSISTANT', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_path" TEXT,
    "password" TEXT NOT NULL,
    "passwordChangeAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "conversations" (
    "uid" TEXT NOT NULL,
    "title" TEXT,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "messages" (
    "uid" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "content" TEXT NOT NULL,
    "conversation_uid" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "conversations_user_uid_idx" ON "conversations"("user_uid");

-- CreateIndex
CREATE INDEX "messages_conversation_uid_idx" ON "messages"("conversation_uid");

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "conversations"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
