
import Link from "next/link";

import classNames from "classnames";
import {FC} from "react";
import {Navigation} from "@/components/Header/nav/Navigation";
import {Routes} from "@/enums/Routes";

interface Props {
    isLoading: boolean;
    path: string;
}

export const Header:FC<Props> = ({isLoading, path}) => {

    return (
            <header
                className={classNames(
                'fixed top-0 left-0 z-10 w-full bg-[rgba(10,10,10,0.8)] transform transition-transform duration-500 ease-in-out -translate-y-full',
            {
                'translate-y-0': !isLoading || path !== Routes.home,
            }
                )}
                >
            <div className="max-w-[1230px] w-full mx-auto px-4">
                <div className="py-2 flex justify-between items-center gap-4">
                    <Link href={Routes.home} className={classNames('text-[60px] drop-shadow-[0_0_10px_#66FF00]', 'icon-logo')}></Link>


                    <Navigation/>
                </div>
            </div>
        </header>
    )
}