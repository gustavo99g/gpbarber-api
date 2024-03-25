/*
  Warnings:

  - Added the required column `isProvider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isProvider" BOOLEAN NOT NULL;
