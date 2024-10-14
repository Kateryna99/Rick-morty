import styles from './CharacterSceleton.module.scss';

export const CharacterSceleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.message}>Please select a character to see information</div>
      <div className={styles.skeletonImage}/>
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine}/>
        <div className={styles.skeletonLine}/>
        <div className={styles.skeletonLine}/>
        <div className={styles.skeletonLine}/>
        <div className={styles.skeletonLine}/>
      </div>
    </div>
  );
}