import { SoulToken } from './SoulToken';

type SoulsProps = {
  count: number;
};

export const Souls = ({ count }: SoulsProps) => {
  return (
    <article>
      <p>{count} âmes </p>
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
