export namespace keys {
  export const OrigenCorreoElectronico = 'santiago.1701621469@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Constructora ] Mensaje de bienvenida ';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 12);
  export const clavesecretaJWT = 'jwt@contruct@r*';
  export const twiliophone = '+19362771775';

  export const carpetaImagenCliente = '../../archivos/cliente';
  export const nombreCampoImagenCliente = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenCliente = 1024 * 1024;

  export const carpetaImagenProyecto = '../../archivos/proyecto';
  export const nombreImagenProyecto = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
}
