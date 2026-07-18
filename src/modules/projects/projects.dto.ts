import z from 'zod';

export const projectDto = z.object({
        id:          z.string(),
        nombre:      z.string().min(2),
        descripcion: z.string().min(4),
        duenoId:     z.number()
});

export const createProjectSchema = projectDto.omit({id:true});
export type createProjectType = z.infer<typeof createProjectSchema>;

export const editProjectSchema = projectDto;
export type editProjectType = z.infer<typeof editProjectSchema>;

//Util para buscar para id y eliminar
export const busca_elimina_project_Schema = projectDto.pick({id:true, duenoId:true});
export type id_dueno_project_Type = z.infer<typeof busca_elimina_project_Schema>;
//

export const getProyectosSchema = projectDto.pick({duenoId:true});
export type getProyectosType = z.infer<typeof getProyectosSchema>;
