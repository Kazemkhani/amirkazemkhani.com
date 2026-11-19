import { Hexagon } from "lucide-react";
import type { WorldId } from "../data/worlds";

/** Product identities, sourced from their own sites and application assets. */
export default function ProductLogo({ id }: { id: WorldId }) {
  return (
    <span className={`product-logo product-logo-${id}`} aria-hidden="true">
      {id === "cyberlife" && <b>CyberLife</b>}
      {id === "bayyina" && (
        <>
          <img src="/brands/bayyina.svg" alt="" />
          <b>BAYYINA</b>
        </>
      )}
      {id === "marsad" && <img src="/brands/marsad.svg" alt="" />}
      {id === "enec" && (
        <>
          <img src="/brands/hadhra.svg" alt="" />
          <b>HADHRA</b>
        </>
      )}
      {id === "nova" && (
        <>
          <img src="/brands/nova.svg" alt="" />
          <b>
            NOVA<span>LABS</span>
          </b>
        </>
      )}
      {id === "ruya" && (
        <b>
          <span>RU</span>
          <span>YA</span>
        </b>
      )}
      {id === "samt" && <img src="/brands/samt.svg" alt="" />}
      {id === "morning" && (
        <>
          <img src="/brands/morning-mark.svg" alt="" />
          <b>
            THE MORNING<span>CLUB</span>
          </b>
        </>
      )}
      {id === "gold" && (
        <>
          <Hexagon strokeWidth={1.5} />
          <b>
            GOLD<span>HEDGE</span>
          </b>
        </>
      )}
    </span>
  );
}
