import { useState } from "react"

const useLoading = (load: boolean = false, txt: string = "") => {
    const [loading, setLoading] = useState<boolean>(load)
    const [text, setText] = useState<string>(txt)

    const startLoading = () => {
        setLoading(true)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    return {loading, startLoading, stopLoading, text}
}

export default useLoading