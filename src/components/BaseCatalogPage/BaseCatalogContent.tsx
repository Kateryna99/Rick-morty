import styles from "./BaseCatalogContent.module.scss"
import classNames from "classnames";


export const BaseCatalogContent = ({children, flex}) => {
    return (
        <div className={styles.catalog}>
            <div className={classNames(styles.catalogWrapper, { [styles.flex]: flex })}>
                {children}
            </div>
        </div>
    )
}