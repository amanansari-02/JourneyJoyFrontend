import { TOAST_POSITION, TOAST_TIME, TOAST_TYPE_ARRAY } from "@/constants/toast-constant";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export const showToast = (toastType, title) => {

    const toastColor = TOAST_TYPE_ARRAY[toastType] || TOAST_TYPE_ARRAY.DEFAULT;

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
        didOpen: (toast) => {
            toast.style.backgroundColor = toastColor
            toast.style.color = "white"
            const closeButton = toast.querySelector('.swal2-close');
            if (closeButton) {
                closeButton.style.color = '#ffffff';
            }
        }
    });
}