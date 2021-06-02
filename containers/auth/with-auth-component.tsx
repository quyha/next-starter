import { NextPage } from 'next';
import { useAuth } from 'contexts/auth';
import { useRouter } from 'next/router';
import { RouteNames } from '@constants/route-names';
import { isClientSide } from '@utils/request';

function withAuthComponent<Props>(Component: NextPage<Props>) {
    return (props: Props) => {
        const { isAuthenticated, isLoading } = useAuth();
        const router = useRouter();

        if (isLoading && isAuthenticated) {
            return null;
        }

        if (!isAuthenticated) {
            if (isClientSide()) {
                router.push(RouteNames.LOGIN);
            }
            return null;
        }
        
        return <Component { ...props }/>
    }
}

export default withAuthComponent;

