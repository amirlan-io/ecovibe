type OptimizedPictureProps = {
  avifSrc?: string;
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  pictureClassName?: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
  /** Responsive WebP/AVIF descriptors, e.g. "/img.webp 400w, /img-800.webp 800w" */
  webpSrcSet?: string;
  avifSrcSet?: string;
  fallbackSrcSet?: string;
  sizes?: string;
};

export function OptimizedPicture({
  avifSrc,
  webpSrc,
  fallbackSrc,
  alt,
  pictureClassName,
  className,
  loading = "lazy",
  fetchPriority,
  width,
  height,
  webpSrcSet,
  avifSrcSet,
  fallbackSrcSet,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: OptimizedPictureProps) {
  const webpSet = webpSrcSet ?? `${webpSrc} ${width ?? 800}w`;
  const avifSet = avifSrc ? (avifSrcSet ?? `${avifSrc} ${width ?? 800}w`) : undefined;
  const imgSet = fallbackSrcSet ?? `${fallbackSrc} ${width ?? 800}w`;

  return (
    <picture className={pictureClassName}>
      {avifSrc && avifSet && (
        <source srcSet={avifSet} sizes={sizes} type="image/avif" />
      )}
      <source srcSet={webpSet} sizes={sizes} type="image/webp" />
      <img
        src={fallbackSrc}
        srcSet={imgSet}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        decoding={loading === "eager" ? "sync" : "async"}
      />
    </picture>
  );
}
