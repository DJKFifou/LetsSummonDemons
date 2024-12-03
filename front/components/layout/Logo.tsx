interface LogoProps {
  home?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ home }) => {
  return (
    <article>
      <img
        className={`${home ? '' : 'w-48'}`}
        src="/images/lsd.svg"
        alt="Logo"
      />
    </article>
  );
};
