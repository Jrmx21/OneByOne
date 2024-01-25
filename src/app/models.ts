export interface UserI{
    nombre: string;
    edad: number;
    correo: string |undefined | null;
    uid: string| undefined;
    password: string;
    perfil: 'admin' | 'user';
}