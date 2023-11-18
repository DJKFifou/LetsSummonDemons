import Image from 'next/image';
import styles from './SoulToken.module.scss';
export const SoulToken = () => {
  return (
    <Image
      className={styles.soul}
      src="/souls/soul.png"
      height={203}
      width={124}
      alt=""
    />
  );
};
