-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_duenoId_fkey";

-- DropForeignKey
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_creadorId_fkey";

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_duenoId_fkey" FOREIGN KEY ("duenoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
