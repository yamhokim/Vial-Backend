/*
  Warnings:

  - The `status` column on the `queries` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QueryStatus" AS ENUM ('OPEN', 'RESOLVED');

-- AlterTable
ALTER TABLE "queries" DROP COLUMN "status",
ADD COLUMN     "status" "QueryStatus" NOT NULL DEFAULT 'OPEN';
