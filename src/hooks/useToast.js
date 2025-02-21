import { toast } from 'react-toastify';

export const useToast = () => {
  const showToast = {
    success: (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    error: (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    info: (message) => {
      toast.info(message);
    },
    warning: (message) => {
      toast.warning(message);
    },
  };

  return showToast;
};