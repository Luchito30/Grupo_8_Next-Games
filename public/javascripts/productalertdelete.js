const deletFrom = document.getElementById('form-delete');

deletFrom.addEventListener('submit', function (e) {
  e.preventDefault();

  Swal.fire({
    title: '¿Estás seguro de eliminar el producto?',
    showCancelButton: true,
    icon: 'warning',
    confirmButtonText: 'Eliminar',
    confirmButtonColor: '#e30000',
    cancelButtonColor: '#023877',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Producto eliminado con éxito!', '', 'success').then(() => {
        deletFrom.submit();
      });
    }
  });
});
