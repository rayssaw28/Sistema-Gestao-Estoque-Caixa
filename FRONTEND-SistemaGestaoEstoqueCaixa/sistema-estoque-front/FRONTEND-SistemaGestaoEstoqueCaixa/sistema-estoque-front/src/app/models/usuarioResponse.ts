import { PerfilUsuario } from "./perfilUsuario";

export interface UsuarioResponse {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
}