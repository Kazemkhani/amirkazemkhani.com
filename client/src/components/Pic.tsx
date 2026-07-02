/**
 * Pic — <picture> with AVIF/WebP sources (2 widths, emitted by
 * scripts/optimize-images.mjs) and the original as fallback.
 * Explicit width/height always (zero CLS).
 */
const Pic = ({
  base,
  ext = "jpg",
  widths = [640, 1120],
  sizes,
  alt,
  width,
  height,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  /** Path without extension, e.g. "/credibility/amir-jensen-huang-nvidia" */
  base: string;
  ext?: string;
  widths?: number[];
  sizes: string;
  alt: string;
  /** Intrinsic dimensions of the original file */
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) => {
  const srcSet = (format: string) =>
    widths.map((w) => `${base}-${w}.${format} ${w}w`).join(", ");

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${base}.${ext}`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
};

export default Pic;
