-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMININO', 'OUTRO', 'NAO_INFORMADO');

-- CreateEnum
CREATE TYPE "Pronoun" AS ENUM ('ELE_DELE', 'ELA_DELA', 'ELU_DELU', 'OUTRO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "birthDate" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "customGender" VARCHAR(150),
    "pronoun" "Pronoun",
    "customPronoun" VARCHAR(150),
    "telephone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "addressId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zipCode" VARCHAR(8) NOT NULL,
    "publicSpace" VARCHAR(200),
    "number" INTEGER NOT NULL,
    "complement" VARCHAR(100),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_zipCode_key" ON "Address"("zipCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
