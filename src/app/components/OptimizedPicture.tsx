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
}: OptimizedPictureProps) {
  return (
    <picture className={pictureClassName}>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
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
