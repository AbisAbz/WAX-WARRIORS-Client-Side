import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const GenerateSuccess = (success) => {
    toast.success(success, {
        position:'top-right',
        theme:'colored',
        autoClose:2000
    });
}


export const GenerateError = (err) => {
    toast.error(err, {
        position:'top-right',
        theme:'colored',
        autoClose:2000
    })
}
