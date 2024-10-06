'use client';

import Link from "next/link";

import styles from "./Navigation.module.scss";
import {Routes} from "@/enums/Routes";
import classNames from "classnames";
import {FC} from "react";
import {usePathname} from "next/navigation";

interface Props {
    mobile?
}

export const Navigation: FC<Props> = ({mobile}) => {
    const path = usePathname()

    console.log(path)

    return (
        <nav className={classNames(styles.nav, {
            [styles.mobile]: mobile,
        })}>
            <ul className={classNames("flex gap-4 md:gap-6 items-center", {
                "justify-between": mobile,
            })}>
                {Object.entries(Routes).map(([key,value]) => (
                    <li key={key} className={styles.navItem}>
                        <Link data-title={key} className={classNames(styles.link, `icon-${key}`, {
                            [styles.active]: key === 'home' ? path === value : path.startsWith(value)
                        })} href={value}></Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}