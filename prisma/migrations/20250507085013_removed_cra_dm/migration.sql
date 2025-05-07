/*
  Warnings:

  - You are about to drop the column `cra` on the `form_data` table. All the data in the column will be lost.
  - You are about to drop the column `dm` on the `form_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "form_data" DROP COLUMN "cra",
DROP COLUMN "dm";
