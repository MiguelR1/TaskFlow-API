-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "rol" "Roles" NOT NULL DEFAULT 'User';
