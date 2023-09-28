import React from 'react';
import './LoginPage.scss';
import Inp from '../../components/Inp/Inp';
import { Form, useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn/Btn';
import { fetchLogin, fetchRegister } from '../../redux/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import Loading from '../../components/Loading/Loading';

const LoginPage = () => {
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoggedIn, isLoading, message } = useAppSelector(
        (state) => state.user
    );

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const submitRef = React.useRef(null);

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchLogin({ user_name: username, user_password: password }));
    };

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            fetchRegister({ user_name: username, user_password: password })
        );
    };

    React.useEffect(() => {
        if (isLoggedIn) navigation('/');
    }, [isLoggedIn, navigation]);

    return (
        <div className="login">
            <p className="login-name">Login</p>
            <Form ref={submitRef} className="login-modal">
                <div className="login-modal-inputs">
                    <Inp
                        className="login-modal-inputs-email"
                        placeholder="email"
                        state={username}
                        setState={setUsername}
                    />

                    <Inp
                        className="login-modal-inputs-password"
                        placeholder="password"
                        state={password}
                        setState={setPassword}
                        option={{ type: 'password' }}
                    />
                    <p className="login-modal-inputs-error">{message}</p>
                    <p className="login-modal-inputs-loading">
                        {isLoading ? <Loading /> : ''}
                    </p>
                </div>
                <div className="login-modal-btns">
                    <Btn
                        className="login-modal-btns-login"
                        name="Login"
                        option={{
                            type: 'submit',
                            name: 'login',
                            onClick: handleLoginSubmit,
                        }}
                    />
                    <Btn
                        className="login-modal-btns-register"
                        name="Register"
                        option={{
                            type: 'submit',
                            name: 'register',
                            onClick: handleRegisterSubmit,
                        }}
                    />
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
