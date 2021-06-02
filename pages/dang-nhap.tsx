import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Login from '@containers/auth/login';
import { getUserFromStorage } from '@services/user';
import { RouteNames } from '@constants/route-names';
import { useEffect } from 'react';
import { useAuth } from 'contexts/auth';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = getUserFromStorage(true, context);
    if (user && user.accessToken) {
        return {
            redirect: {
                destination: RouteNames.HOME,
                permanent: false,
            },
        }
    }
    return { props: {} };
}

const PageLogin = () => {
    const { isAuthenticated, logout } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            logout();
        }
    }, [])
    
    return (
        <>
            <NextSeo
                title="Login"
                description="Login"
            />
            <Login />
        </>
    )
};

export default PageLogin;
