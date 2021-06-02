import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '@constants/seo';
import '@styles/main.scss';
import { AuthProvider, TUserContext } from 'contexts/auth';
import { getUserFromStorage } from '@services/user';
import { setAuthorization } from '@services/axios';
import TopProgressBar from '@components/top-progress-bar';

interface IProps extends AppProps {
    initialUserInfo: TUserContext,
    initialAuthenticated: boolean,
}

function MyApp({ Component, pageProps, initialAuthenticated, initialUserInfo }: IProps) {
    return (
        <AuthProvider initialAuthenticated={ initialAuthenticated } initialUserInfo={ initialUserInfo }>
            <DefaultSeo { ...SEO } />
            <TopProgressBar />
            <Component { ...pageProps } />
        </AuthProvider>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const user = getUserFromStorage(true, appContext.ctx);
    let initialUserInfo = null;
    let initialAuthenticated = false;
   
    if (user) {
        const { accessToken, ...restUser } = user;
        initialUserInfo = restUser;
        initialAuthenticated = !!accessToken && !!restUser;
        setAuthorization(`Bearer ${ accessToken }`);
    }

    return { ...appProps, initialUserInfo, initialAuthenticated };
}

export default MyApp;
