import { store } from "../../../slicers/store"
import { addToast, removeToast } from "../../../slicers/toasts";
import { ToastType } from "../../../types/ToastItem";

const useToast = () => {
    const remove = (id: number) => {
        store.dispatch(removeToast(id))
    }
    const success = (msg: string, duration: number = 20) => {
        store.dispatch(addToast({msg, duration, type: ToastType.Success}))
    }
    const alert = (msg: string, duration: number = 20) => {
        store.dispatch(addToast({msg, duration, type: ToastType.Alert}))
    }
    const info = (msg: string, duration: number = 20) => {
        store.dispatch(addToast({msg, duration, type: ToastType.Info}))
    }
    const warning = (msg: string, duration: number = 20) => {
        store.dispatch(addToast({msg, duration, type: ToastType.Warning}))
    }
    const seconday = (msg: string, duration: number = 20) => {
        store.dispatch(addToast({msg, duration, type: ToastType.Secondary}))
    }
    return {success, alert, info, warning, seconday, remove}
}

export default useToast;