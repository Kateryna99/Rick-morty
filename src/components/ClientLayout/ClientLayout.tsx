 'use client';

import {Header} from "@/components/Header/Header";
import {Footer} from "@/components/Footer/Footer";
import {useHandleFirstSession} from "@/hooks/useHandleFirstSession";

import { Provider } from 'react-redux';
import {store} from '@/store/store.ts';

import style from './ClientLayout.module.scss';
import classNames from "classnames";

export default function ClientLayout({children}: { children: React.ReactNode }) {
    const {isLoading, path} = useHandleFirstSession();

    return (
        <>
            <Header isLoading={isLoading} path={path}/>

            <Provider store={store}>
                <main className={classNames('flex flex-grow max-w-[1230px] w-full mx-auto', style.padding)}>
                    {children}
                </main>
            </Provider>

            <Footer isLoading={isLoading}/>
        </>
    );
}