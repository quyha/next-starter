import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import styles from '@containers/home/home.module.scss';
import Link from 'next/link';
import { RouteNames } from '@constants/route-names';
import { useAuth } from 'contexts/auth';
import withAuthComponent from '@containers/auth/with-auth-component';
import apiUser from 'apis/user';
import { useEffect } from 'react';
import { withAuthServerSideProps } from '@utils/request';
import { IUser } from '@containers/auth/type';

type TProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = withAuthServerSideProps<{ user: IUser }>(async () => {
    const user = await apiUser.getProfile();
    return {
        props: { user },
    }
})

function Profile({ user }: TProps) {
    const { userInfo } = useAuth();

    useEffect(() => {
        apiUser.getProfile().then((res) => { console.log('profile client', res) });
    }, []);
    
    return (
        <>
            <NextSeo
                title="Profile"
                description="Profile"
            />
            <div className={styles.container}>
                <main className={styles.main}>
                    <p className={styles.description}>
                        <code className={styles.code}>Profile</code>
                    </p>
                    <div className={ styles.prefix }>
                        <span>{ userInfo?.email }</span>
                        <Link href={ RouteNames.HOME }>Home</Link>
                    </div>
                </main>
            </div>
        </>
    )
}

export default withAuthComponent<TProps>(Profile);
