import { SoulToken } from './SoulToken';
import { useTranslation } from 'react-i18next';

type SoulsProps = {
  count: number;
};

export const Souls = ({ count }: SoulsProps) => {
  const { t } = useTranslation();
  return (
    <article>
      <p>
        {count} {t('soul.souls.souls')}{' '}
      </p>
      <ul className="flex gap-2 list-none">
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <SoulToken />
          </li>
        ))}
      </ul>
    </article>
  );
};
