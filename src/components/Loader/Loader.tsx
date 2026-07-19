import css from "./Loader.module.css";

interface LoaderProps {
  title?: string;
  subtitle?: string;
}
function Loader({
  title = "Loading cars...",
  subtitle = "Please wait while we fetch the best cars for you",
}: LoaderProps) {
  return (
    <div className={css.overlay}>
      <div className={css.card}>
        <div className={css.spinner} />
        <p className={css.title}>{title}</p>
        <p className={css.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}

export default Loader;
