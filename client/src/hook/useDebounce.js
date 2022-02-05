import { useEffect, useState } from "react";

export function useDebounce(delay = 350) {
    const [text, setText] = useState(null)
    const [textDelay, setTextDelay] = useState(null)

    useEffect(() => {
        const delayFn = setTimeout(() => setText(textDelay), delay)
        return () => clearTimeout(delayFn)
    }, [textDelay, delay])
    return [text, setTextDelay]
}