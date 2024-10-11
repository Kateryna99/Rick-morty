import styles from './LoadingPage.module.scss';

import butt from '../../images/back.gif';

export const LoadingPage = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={butt.src} alt="Rick's butt"/>
            </div>
        </div>
    )
}