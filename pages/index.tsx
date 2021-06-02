import { NextSeo } from 'next-seo';
import styles from '@containers/home/home.module.scss';
import Link from 'next/link';
import { RouteNames } from '@constants/route-names';
import { useAuth } from 'contexts/auth';

function Home() {
    const { userInfo, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    
    return (
        <>
            <NextSeo
                title="Home"
                description="Home"
            />
            <div className={styles.container}>
                <main className={styles.main}>
                    <p className={styles.description}>
                        Get started by editing{' '}
                        <code className={styles.code}>pages/index.js</code>
                    </p>
                    <div className={ styles.prefix }>
                        {
                            (isAuthenticated && userInfo) ? (
                                <Link href={ RouteNames.PROFILE }>{ userInfo?.email }</Link>
                            ) : <Link href={ RouteNames.LOGIN }>Login</Link>
                        }
                        <Link href={ RouteNames.PROFILE }>Profile</Link>
                        { isAuthenticated && <div onClick={ handleLogout }>Logout</div> }
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home;
