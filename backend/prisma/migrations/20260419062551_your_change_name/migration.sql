-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "stream_key" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeout_until" TIMESTAMP(3),
ADD COLUMN     "warning_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ModerationLog" (
    "log_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModerationLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "transcript_id" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_final" BOOLEAN NOT NULL,
    "start_time" DOUBLE PRECISION,
    "end_time" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("transcript_id")
);

-- CreateIndex
CREATE INDEX "Transcript_stream_id_created_at_idx" ON "Transcript"("stream_id", "created_at");

-- CreateIndex
CREATE INDEX "Chat_stream_id_sent_at_idx" ON "Chat"("stream_id", "sent_at");

-- AddForeignKey
ALTER TABLE "ModerationLog" ADD CONSTRAINT "ModerationLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationLog" ADD CONSTRAINT "ModerationLog_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "Stream"("stream_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "Stream"("stream_id") ON DELETE RESTRICT ON UPDATE CASCADE;
