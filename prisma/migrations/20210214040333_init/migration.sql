-- CreateTable
CREATE TABLE "ToDo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL
);
