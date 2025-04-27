
import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext()

const useStoreContext = () =>  useContext(StoreContext)

export default useStoreContext

export function StoreProvider ({ children }) {

    function useFetch (url) {
        const [data, setData] = useState()
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
    
        useEffect(() => {
        setLoading(true)
            fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setData(data)
        })
        .catch((error) => {
            setError(error.message)
        })
        .finally(() => setLoading(false))
    
        }, [url])
    
        return { data, loading, error }
    }
    
    return (
        <StoreContext.Provider value={{useFetch}}>
            { children }
        </StoreContext.Provider>
    )
} 