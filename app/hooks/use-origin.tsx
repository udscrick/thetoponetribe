// To see if its client i.e. window origin is present, else just return an empty string

import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [isMounted, setMounted] = useState(false);

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    useEffect(()=>{
        setMounted(true)
    },[]);

    if(!isMounted){
        return ''
    }
    return origin
}