
const deletFromuser = document.getElementById('form-delete-user');

deletFromuser.addEventListener('submit', function (e) {
  e.preventDefault();

  Swal.fire({
    title: '¿Estás seguro de eliminar el usuario?',
    showCancelButton: true,
    icon: 'warning',
    confirmButtonText: 'Eliminar',
    confirmButtonColor: '#e30000',
    cancelButtonColor: '#023877',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('usuario eliminado con éxito!', '', 'success').then(() => {
        deletFromuser.submit();
      });
    }
  });
});