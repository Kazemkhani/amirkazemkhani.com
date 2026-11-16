import ProductLogo from "./ProductLogo";
import type { World } from "../data/worlds";
export default function ProjectCredential({
  world,
}: {
  world: Pick<World, "credential"> & { id: string };
}) {
  const c = world.credential;
  return (
    <a
      className={`project-credential credential-${world.id}`}
      href={c.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${c.label} ${c.name}. ${c.detail}`}
    >
      <span className="credential-label">{c.label}</span>
      <span className="credential-identity">
        {c.logo ? (
          <>
            <img src={c.logo} alt={c.name} />
            {world.id === "enec" && <strong>NSTI Festival</strong>}
          </>
        ) : world.id === "morning" || world.id === "gold" ? (
          <ProductLogo id={world.id} />
        ) : (
          <strong>{c.name}</strong>
        )}
      </span>
      <span className="credential-detail">{c.detail}</span>
    </a>
  );
}
