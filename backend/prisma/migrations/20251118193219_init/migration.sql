-- CreateTable
CREATE TABLE "EquipmentGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rented" BOOLEAN NOT NULL DEFAULT false,
    "groupId" INTEGER NOT NULL,
    CONSTRAINT "Equipment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "EquipmentGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
