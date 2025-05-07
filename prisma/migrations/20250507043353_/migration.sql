-- CreateTable
CREATE TABLE "queries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "formDataId" UUID NOT NULL,

    CONSTRAINT "queries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "queries_formDataId_key" ON "queries"("formDataId");

-- AddForeignKey
ALTER TABLE "queries" ADD CONSTRAINT "queries_formDataId_fkey" FOREIGN KEY ("formDataId") REFERENCES "form_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
