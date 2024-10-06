'use client';

import {Header} from "@/components/Header/Header";
import {Footer} from "@/components/Footer/Footer";
import {useHandleFirstSession} from "@/hooks/useHandleFirstSession";

export default function ClientLayout({children}: { children: React.ReactNode }) {
    const {isLoading, path} = useHandleFirstSession();

    return (
        <>
            <Header isLoading={isLoading} path={path}/>
            <main className="flex-grow max-w-[1230px] w-full mx-auto px-4">
    {children}
            </main>
            <Footer isLoading={isLoading}/>
        </>
    );
}