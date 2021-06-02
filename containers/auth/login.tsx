import { useState } from 'react';
import styles from './auth.module.scss';
import stylesEle from '@styles/elements.module.scss';
import cx from 'classnames';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@components/input';
import Button from '@components/button';
import apiUser from 'apis/user';
import { useAuth } from 'contexts/auth';

interface LoginFormValues {
    email: string,
    password: string,
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

const Login = () => {
    const { authenticate } = useAuth();
    
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const [ isSubmitting, setSubmitting ] = useState<boolean>(false);
      
    const doSubmit = handleSubmit((data) => {
        setSubmitting(true);
        apiUser.login({ email: data.email, password: data.password })
            .then((user) => {
                console.log(user);
                setSubmitting(false);
                authenticate({ email: user.email, accessToken: user.accessToken });
            })
            .catch(e => {
                console.log(e)
                setSubmitting(false);
            });
    });
    
    return (
        <div className={ cx(
            styles.loginWrapper,
            stylesEle.box
        ) }>
            <div className={ cx(styles.loginTitle, styles.isDanger) }>
                <span className={ styles['under'] }>Login</span>
            </div>
            <form onSubmit={ doSubmit }>
                <Input
                    type="text"
                    error={ errors?.email?.message }
                    { ...register("email") }
                />
                <Input
                    type="text"
                    error={ errors?.password?.message }
                    { ...register("password") }
                />
                <Button
                    type="submit"
                    appearance="primary"
                    fullWidth
                    loading={ isSubmitting }
                >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;
