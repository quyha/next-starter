import { GetServerSidePropsContext, GetServerSideProps, GetServerSidePropsResult } from 'next';
import { RouteNames } from '@constants/route-names';
import { logoutUser } from '@services/user';

type TQueryDefault = Record<string, any>;

function isClientSide(): boolean {
    return typeof window !== 'undefined';
}

function withAuthServerSideProps<Props, Query extends TQueryDefault = {}>(
    getServerSidePropsFunc?: (ctx: GetServerSidePropsContext<Query>) => Promise<GetServerSidePropsResult<Props>>
): (ctx: GetServerSidePropsContext<Query>) => Promise<GetServerSidePropsResult<Props>> {
    return async function getMergedServerSideProps(context: GetServerSidePropsContext<Query>): Promise<GetServerSidePropsResult<Props>> {
        if (getServerSidePropsFunc) {
            try {
                const props = await getServerSidePropsFunc(context);
                return props;
            } catch (error) {
                if (String(error.statusCode) === '401') {
                    logoutUser(context);
                    return {
                        redirect: {
                            destination: RouteNames.LOGIN,
                            permanent: false,
                        },
                    }
                }
                const props = {} as Props;
                return { props };
            }
        }
        return {
            props: {} as Props,
        }
    }
}

export { isClientSide, withAuthServerSideProps };
