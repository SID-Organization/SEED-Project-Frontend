import 'react';

import {useState, createContext} from 'react';

export const AuthContext = createContext([false, () => {}])

export function AuthProvider({children}: any) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated] as any}>
            {children}
        </AuthContext.Provider>
    )
}