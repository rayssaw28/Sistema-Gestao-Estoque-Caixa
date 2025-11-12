import { PerfilUsuario } from "./perfilUsuario";

export interface UsuarioRequest {
  nomeCompleto: string;
  email: string;
  senha?: string;
  perfil: PerfilUsuario;
  ativo: boolean;
}