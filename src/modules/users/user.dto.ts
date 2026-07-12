import z from "zod";

//Esquema base Zod

export const userDto = z.object({

    id: z.


    /*
    id       Int     @id @default(autoincrement())
  email    String  @unique
  nombre   String?
  cedula   String @unique
  password String?
    
    
    
    */
});