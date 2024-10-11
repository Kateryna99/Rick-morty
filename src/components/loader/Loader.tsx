'use client'

import {FC, useEffect, useState} from 'react';

import styles from './Loader.module.scss';
import classNames from "classnames";

interface Props {
    progressFill?: boolean;
    progressValue: number;
    progressSpeed: number;
    progressStart: number;
}

const Loader: FC<Props> = ({progressFill,  progressValue, progressSpeed, progressStart }) => {
    const [progress, setProgress] = useState(progressStart);

    useEffect(() => {
        let progressInterval = 1;

        const startLoading = () => {
            progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= progressValue) {
                        clearInterval(progressInterval);
                        return progressValue;
                    }
                    return prevProgress + 1;
                });
            }, progressSpeed);
        };

        startLoading();

        return () => clearInterval(progressInterval);
    }, []);

    return (
        <div className={classNames(styles.loader, {
            [styles.mainLoader]: progressFill
        })}>
            {progressFill && (<div
                className={styles.progressBar}
                style={{width: `${progress}%`}}
            ></div>)}
            <p className={classNames(styles.text, {
                [styles.mainLoader]: progressFill
            })}>{progress}</p>
        </div>
    );
};

export default Loader;
