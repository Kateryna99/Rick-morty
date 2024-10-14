
import Link from "next/link";

import classNames from "classnames";
import { FC } from "react";
import { Navigation } from "@/components/Header/nav/Navigation";
import { Routes } from "@/enums/Routes";

import styles from "./Header.module.scss";
import { CurrentPath } from "@/components/Header/currentPath/CurrentPath";
import Image from "next/image";
import logo from './logo.png';

interface Props {
    isLoading: boolean;
    path: string;
}

export const Header:FC<Props> = ({ isLoading, path }) => {

  return (
    <header
      className={classNames(styles.header,
        {
          [styles.active]: !isLoading || path !== Routes.home,
        }
      )}
    >
      <div className="w-full mx-auto px-4">
        <div className="pt-2 flex items-center gap-12">
          <Link href={Routes.home} className={'w-12 h-12 relative'}>
            <Image src={`${logo.src}`} alt='Logo' layout='fill' objectFit='contain'/>
          </Link>

          <CurrentPath/>
          <Navigation desktop isLoading={isLoading}/>
        </div>
      </div>
    </header>
  )
}