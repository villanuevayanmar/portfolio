export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.065em] text-ink sm:text-5xl lg:text-6xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
