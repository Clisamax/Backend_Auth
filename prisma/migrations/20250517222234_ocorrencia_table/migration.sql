-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sap" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocorrencia" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "procedimento" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "ocorrencia" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sap_key" ON "user"("sap");

-- CreateIndex
CREATE UNIQUE INDEX "ocorrencia_id_key" ON "ocorrencia"("id");
