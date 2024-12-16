interface LogoProps {
  home?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ home }) => {
  return (
    <article
      className={`${
        home ? '' : 'absolute left-1/2 -translate-x-1/2 top-10 w-48'
      }`}
    >
      <img src="/images/logo-red.svg" alt="Logo" />
    </article>
  );
};
