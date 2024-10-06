import './Footer.scss';
import {FC} from "react";
import classNames from "classnames";
import {Navigation} from "@/components/Header/nav/Navigation";

interface Props {
    isLoading: boolean;
}

export const Footer:FC<Props> = ({isLoading}) => {
    return (
        <footer
            className={classNames("fixed left-0 bottom-0 z-10 w-full p-0 pt-5 pb-5 bg-black bg-opacity-80 transform transition-transform duration-500 ease-in-out md:relative md:bottom-auto md:left-auto", {
                "translate-y-full": isLoading,
                "translate-y-0": !isLoading
            })}>
            <div className="max-w-[1230px] w-full mx-auto px-4">
                <Navigation mobile/>

                <p className="hidden md:block text-[#66FF00] text-[25px] text-center">© Cool Gays</p>
            </div>
        </footer>
    )
}