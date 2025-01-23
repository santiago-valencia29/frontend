export const SwalConfig = {
    warningCampos: {
        html: '<h3 style="color:#ffff">Hay campos sin completar</h3>',
        icon: 'warning',
        background: '#32383e',
        confirmButtonColor: '#3A3F44 '
    },
    loadingDesign: {
        showConfirmButton: false,
        allowOutsideClick: false,
        icon: 'info',
        background: '#32383e',
        html: '<h3 style="color:#ffff">Espere por favor...</h3>'
    },
    errorAuth: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">No autorizado</h3>',
        icon: 'error',
        confirmButtonColor: '#3A3F44 '
    },
    errorRegister: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">Error al guardar</h3>',
        icon: 'error',
        confirmButtonColor: '#3A3F44 '
    },
    createRegister: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">Ya puedes ingresar!</h3>',
        icon: 'success',
        confirmButtonColor: '#3A3F44 '
    },
    restringeSite: {
        background: '#32383e',
        icon: 'warning',
        html: '<h3 style="color:#ffff">Debe autenticarse</h3>',
        confirmButtonColor: '#3A3F44 '

    },
    siteLogin: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">Desea Salir?</h3>',
        icon: 'info',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Si',
        showCancelButton: true,
        confirmButtonColor: '#3A3F44 ',
        cancelButtonColor: '#3A3F44 ',
        cancelButtonText: 'No, cancelar!',
    },
    createTask: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">Tarea Creada</h3>',
        icon: 'success',
        confirmButtonColor: '#3A3F44 '
    },
    updateTask: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">Tarea Actualizada</h3>',
        icon: 'success',
        confirmButtonColor: '#3A3F44 '
    },
    errorConexion: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">Error de conexión</h3>',
        icon: 'error',
        confirmButtonColor: '#3A3F44 ',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Intentar Nuevamente'
    },
    deleteTask: {
        background: '#32383e',
        html: '<h3 style="color:#ffff">¿Está seguro de borrar?</h3>',
        icon: 'question',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: '#3A3F44 ',
        confirmButtonColor: '#3A3F44 ',
    },
    deleteTaskSuccess:{
        html: '<h3 style="color:#ffff">Tarea eliminada</h3>',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: '#3A3F44 ',
        background: '#32383e'
    }
};
