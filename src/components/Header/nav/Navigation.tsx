'use client';

import Link from "next/link";

import styles from "./Navigation.module.scss";
import {Routes} from "@/enums/Routes";
import classNames from "classnames";
import {FC} from "react";
import {usePathname} from "next/navigation";

interface Props {
    mobile?: boolean;
    desktop?: boolean;
    isLoading?: boolean;
}

export const Navigation: FC<Props> = ({mobile, desktop, isLoading}) => {
    const path = usePathname();

    const isLinkActive = (key: string, value: string) => {
        return key === 'home' ? path === value : path.startsWith(value)
    }

    return (
        <nav className={classNames(styles.nav, {
            [styles.mobile]: mobile,
            [styles.desktop]:desktop,
            [styles.active]: !isLoading || path !== Routes.home,
        })}>
            <ul className={classNames(styles.list, {
                [styles.desktop]: desktop,
            })}>
                {Object.entries(Routes).map(([key,value]) => (
                    <li key={key} className={classNames(styles.navItem, {
                        [styles.active]: isLinkActive(key, value),
                    })}>
                        <Link data-title={key} className={classNames(styles.link, `icon-${key}`, {
                            [styles.active]: isLinkActive(key, value)
                        })} href={value}></Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}