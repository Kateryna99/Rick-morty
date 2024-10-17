import styles from './CharacterSceleton.module.scss';

export const CharacterSceleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.message}>Please select a character to see information</div>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );
}