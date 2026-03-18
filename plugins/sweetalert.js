import Swal from 'sweetalert2';

const sweetalertOptions = {
  confirmButtonColor: '#E20613',
  cancelButtonColor: '#6B7280'
};

if (typeof window !== 'undefined') {
  window.Swal = Swal;
}

export default defineNuxtPlugin(function(nuxtApp) {
  return {
    provide: {
      Swal: Swal
    }
  };
});
