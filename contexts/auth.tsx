import {
    createContext,
    ReactNode,
    ReactElement,
    useState,
    useContext,
    useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { IUser } from '@containers/auth/type';
import { storeToken, storeUser, getTokenFromClient, logoutUser } from '@services/user';
import { setAuthorization } from '@services/axios';
import { RouteNames } from '@constants/route-names';

export type TUserContext = Omit<IUser, 'accessToken'>;

interface IAuthContext {
    userInfo: TUserContext | null,
    isAuthenticated: boolean,
    authenticate: (user: IUser) => void,
    logout: () => void,
    accessToken: string | null,
    isLoading: boolean,
}

interface IProps {
    children: ReactNode,
    initialAuthenticated?: boolean,
    initialUserInfo?: TUserContext,
}

const AuthContext = createContext<IAuthContext | null>(null);

function AuthProvider(props: IProps): ReactElement {
    const {
        children,
        initialAuthenticated = false,
        initialUserInfo = null,
    } = props;
    const router = useRouter();

    const [ isLoading, setLoading ] = useState<boolean>(true);
    const [ user, setUser ] = useState<TUserContext | null>(initialUserInfo);
    const [ isAuthenticated, setAuthenticated ] = useState<boolean>(initialAuthenticated);
    const [ accessToken, setAccessToken ] = useState<string | null>(getTokenFromClient());

    const authenticate = (user: IUser): void => {
        const { accessToken, ...userInfo } = user;
        storeToken(accessToken)
        storeUser(userInfo);
        setAuthorization(`Bearer ${ accessToken }`);
        setUser(user);
        setAuthenticated(true);
        setAccessToken(accessToken);
        
        router.push(RouteNames.HOME);
    };

    const logout = (): void => {
        logoutUser();
        setUser(null);
        setAuthenticated(false);
        setAccessToken(null);
        
        router.push(RouteNames.LOGIN);
    };

    useEffect(() => {
        if (accessToken) {
            setAuthorization(`Bearer ${ accessToken }`);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (initialAuthenticated !== isAuthenticated) {
            setAuthenticated(initialAuthenticated);
        }
    }, [ initialAuthenticated, isAuthenticated ]);

    return (
        <AuthContext.Provider value={ {
            userInfo: user,
            isAuthenticated: isAuthenticated,
            authenticate,
            logout,
            accessToken,
            isLoading,
        } }>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthContext');
    }
    return context;
}

export {
    useAuth,
    AuthProvider,
};