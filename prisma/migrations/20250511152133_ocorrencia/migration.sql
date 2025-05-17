/*
  Warnings:

  - You are about to drop the `opcoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "opcoes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ocorrencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "procedimento" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "ocorrencia" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_id_key" ON "ocorrencia"("id");
