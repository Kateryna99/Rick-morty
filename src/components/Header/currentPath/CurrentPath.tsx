'use client';
import {usePathname} from "next/navigation";

import styles from './CurrentPath.module.scss';


export const CurrentPath = () => {
    const path = usePathname();

    const content = path === "/"? "Home" : path.split("/")[1].charAt(0).toUpperCase() + path.split("/")[1].slice(1) + 's';

    return <p className={styles.currentPath}>{content}</p>
}