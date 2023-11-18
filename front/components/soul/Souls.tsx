import { SoulToken } from './SoulToken';
import styles from './Souls.module.scss';

type SoulsProps = {
  count: number;
};

export const Souls = ({ count }: SoulsProps) => {
  return (
    <article className={styles.souls}>
      <p>{count} âmes </p>
      <ul>
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <SoulToken />
          </li>
        ))}
      </ul>
    </article>
  );
};
