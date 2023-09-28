import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import NotePage from './pages/NotePage/NotePage';
import Layout from './Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            {
                path: '/note/:note_id',
                element: <NotePage />,
            },
            {
                path: '/note',
                element: <NewNotePage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
