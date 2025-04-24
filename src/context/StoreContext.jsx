
import { createContext, useContext } from "react";

const StoreContext = createContext()

const useStoreContext = () =>  useContext(StoreContext)

export default useStoreContext

export function StoreProvider ({ children }) {
    
    return (
        <StoreContext.Provider>
            { children }
        </StoreContext.Provider>
    )
} 