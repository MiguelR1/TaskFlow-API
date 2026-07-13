import z from "zod";

//Esquema base Zod
export const userDto = z.object({
    id:       z.number().positive().optional(),
    nombre:   z.string().min(2),
    cedula:   z.string().min(5),
    email:    z.string().email(),
    password: z.string().min(6)
});

// Registro usuario
export const registroUserSchema = userDto.omit({id:true});

export type registerUsuario = z.infer<typeof registroUserSchema>;

// Login usuario
export const loginUserSchema = userDto.pick({
    cedula: true,
    email: true,
    password: true,
  })
  // 1. Hacemos que cedula y email sean opcionales individualmente para que no fallen solos
  .partial({
    cedula: true,
    email: true,
  })
  // 2. Aplicamos una validación personalizada al objeto completo
  .refine(
    (data) => {
      // Retorna true si existe la cédula O existe el email
      return !!data.cedula || !!data.email;
    },
    {
      message: "Debes proporcionar la cédula o el correo electrónico para iniciar sesión.",
      path: ["email || cedula"], // Indica dónde se mostrará el error principalmente (puedes cambiarlo)
    }
  );

export type loginUsuario = z.infer<typeof loginUserSchema>;
