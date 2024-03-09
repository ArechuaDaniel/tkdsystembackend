import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
     const {primerApellido,primerNombre,correo,token} = datos;
     const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      //Información del email
      const info = await transport.sendMail({
        from: '"Sistema TKD Administrador" <cuenta@sistema.com>',
        to: correo,
        subject: "ODSMARTECH - Sistema TKD - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en Sistema TKD",
        html: `<p>Hola: ${primerNombre} comprueba tu cuenta en Sistema TKD</p>
        <p>Tu cuenta esta casi lista solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/tkdsystem/confirmar/${token}">Combrobar Cuenta</a>
        </p>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })
}

export const emailOlvidePassword = async (datos) => {
    const {primerApellido,primerNombre,correo,token} = datos;
    
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'daniel.arechua.alex@gmail.com',
        pass: 'lhpp bobg qazr sggu'
      }

      //  host: process.env.EMAIL_HOST,
      //  port: process.env.EMAIL_PORT,
      //  auth: {
      //    user: process.env.EMAIL_USER,
      //    pass: process.env.EMAIL_PASS,
      //  }
     });

     //Información del email
     const info = await transport.sendMail({
       from: '"ODSMARTECH Sistema TKD Administrador" <cuenta@sistema.com>',
       to: correo,
       subject: "ODSMARTECH - Sistema TKD - Reestablece tu Password",
       text: "Reestablece tu Password",
       html: `<p>Hola: ${primerNombre} ${primerApellido} has solicitado Reestablecer tu Password</p>
       <p>Sigue el siguiente enlace para generar un nuevo Password:
       <a href="${process.env.FRONTEND_URL}/tkdsystem/olvide-password/${token}">Reestablece tu Password</a>
       </p>
       <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
       `
     })
}
