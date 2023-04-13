/*
  Warnings:

  - You are about to drop the column `expires_at` on the `tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sid]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expire` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sess` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sid` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "expires_at",
ADD COLUMN     "expire" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "sess" JSONB NOT NULL,
ADD COLUMN     "sid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tokens_sid_key" ON "tokens"("sid");
