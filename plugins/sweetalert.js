import Swal from 'sweetalert2';

if (typeof window !== 'undefined') {
  window.Swal = Swal;
  window.Swal.fire({
    confirmButtonColor: '#E20613',
    cancelButtonColor: '#6B7280'
  });
}

export default defineNuxtPlugin(function(nuxtApp) {
  return {
    provide: {
      Swal: Swal
    }
  };
});
