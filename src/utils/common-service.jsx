import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export const showToast = (toastType, title) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: title,
        toast: true,
        position: TOAST_POSITION,
        showConfirmButton: false,
        timer: TOAST_TIME,
        showCloseButton: true,
        customClass: {
            popup: TOAST_TYPE_ARRAY[toastType],
        },
    });
}