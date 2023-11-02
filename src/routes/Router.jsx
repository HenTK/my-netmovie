import React from 'react'

import { useRoutes } from 'react-router-dom';
import HomeLayout from 'layouts/home/HomeLayout';
import HomePage from 'pages/home/HomePage';
import MovieDetail from 'pages/movie-detail/MovieDetail';
import Booking from 'pages/booking/Booking';
import Login from 'pages/login/Login';//jsconfig.js
import Register from '../pages/register/Register';
import NoAuthGuard from '../guards/NoAuthGuard';
import AuthGuard from '../guards/AuthGuard';
import AdminLayout from 'layouts/admin/AdminLayout';
import MovieManagement from 'pages/movie-management/MovieManagement';
import AdminGuard from '../guards/AdminGuard';
import MovieForm from 'pages/movie-form/MovieForm';

export default function Router() {
    // const routing  = useRoutes([
    //     {
    //         path: "/",
    //         element: <HomeLayout/>,
    //         children: [{
    //             path: "/",
    //             element: <HomePage/>
    //         },
    //         ]
    //     },
    //     {
    //         path: "/movie-detail/:id",
    //         element: <MovieDetail/>,
    //     },
    //     {
    //         path: "/booking/:id",
    //         //khi chưa đăng nhập thì vào đặt vé bắt phải đăng nhập
    //         element: <AuthGuard/>,
    //         children: [{
    //             path: "/booking/:id",
    //             element: <Booking/>
    //         }],
    //     },
    //     {
    //         path: "/login",
    //         //Kiểm tra trước, nếu đã có user thì đá về "/", không thì mới chạy child
    //         element: <NoAuthGuard/>,
    //         children: [{
    //             path: "/login",
    //             element: <Login/>
    //         }],
    //     },
    //     {
    //         path: "/register",
    //         element: <Register/>
    //     }
    // ]);
    const routing  = useRoutes([
        {
            path: "/",
            element: <HomeLayout/>,
            children: [
                {
                path: "/",
                element: <HomePage/>
                },
                {
                    path: "/movie-detail/:id",
                    element: <MovieDetail/>,
                },
                {
                    path: "/register",
                    element: <Register/>
                },
                {
                    path: "/booking/:id",
                    //khi chưa đăng nhập thì vào đặt vé bắt phải đăng nhập
                    element: <AuthGuard/>,
                    children: [{
                        path: "/booking/:id",
                        element: <Booking/>
                    }],
                },
                {
                    path: "/login",
                    //Kiểm tra trước, nếu đã có user thì đá về "/", không thì mới chạy child
                    element: <NoAuthGuard/>,
                    children: [{
                        path: "/login",
                        element: <Login/>
                    }],
                },
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout/>,
            children: [
                {
                    path: "/admin",
                    element: <AdminGuard/>,
                    children: [ 
                        {
                        path: "/admin/movie-management",
                        element: <MovieManagement/>,
                        },
                        {
                            path: "/admin/movie-management/add",
                            element: <MovieForm/>,
                        },
                    ],
                },
            ],
        },
    ]);
    return routing;
}
