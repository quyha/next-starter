import { NextComponentType } from 'next';
import { useAuth } from 'contexts/auth';
import { useRouter } from 'next/router';
import { RouteNames } from '@constants/route-names';
import { isClientSide } from '@utils/request';

function withUnAuthComponent<Page>(Component: NextComponentType) {
    return (props: Page) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        if (isAuthenticated) {
            if (isClientSide()) {
                router.push(RouteNames.HOME);
            }
            return null;
        }
        
        return <Component { ...props }/>
    }
}

export default withUnAuthComponent;

