type AtmosphereVariant =
  | "brand"
  | "solutions"
  | "cases"
  | "insights"
  | "about"
  | "proposal";

type PageAtmosphereProps = {
  variant?: AtmosphereVariant;
};

export function PageAtmosphere({ variant = "brand" }: PageAtmosphereProps) {
  return (
    <div
      className={`page-atmosphere page-atmosphere--${variant}`}
      aria-hidden="true"
    >
      <span className="page-atmosphere__light" />
      <span className="page-atmosphere__road" />
    </div>
  );
}
