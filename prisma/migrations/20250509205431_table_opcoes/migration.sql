-- CreateTable
CREATE TABLE "opcoes" (
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
CREATE UNIQUE INDEX "opcoes_id_key" ON "opcoes"("id");
