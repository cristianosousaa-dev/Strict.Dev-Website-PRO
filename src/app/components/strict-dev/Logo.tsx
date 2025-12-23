interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width, height }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Strict.Dev Logo"
      className={className}
      style={
        width || height
          ? {
              width: width ? `${width}px` : "auto",
              height: height ? `${height}px` : "auto",
            }
          : undefined
      }
    />
  );
}