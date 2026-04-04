import { ImageIcon } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: "lazy" | "eager";
}

const ImageWithFallback = ({
  src,
  alt,
  className = "",
  fallbackClassName = "",
  loading = "lazy"
}: ImageWithFallbackProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIwOC4wODQgMTIwIDIxNiAxMTEuOTE2IDIxNiAxMDJDMTIwIDkyLjA4NCAxMTEuOTE2IDg0IDEwMiA4NEM5Mi4wODQgODQgODQgOTIuMDg0IDg0IDEwMkM4NCAxMTEuOTE2IDkyLjA4NCAxMjAgMTAyIDEyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTIwMCAxNDBIMTUwVjE2MEgxNzBWMjAwaDIwVjE0MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4=") {
          target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIwOC4wODQgMTIwIDIxNiAxMTEuOTE2IDIxNiAxMDJDMTIwIDkyLjA4NCAxMTEuOTE2IDg0IDEwMiA4NEM5Mi4wODQgODQgODQgOTIuMDg0IDg0IDEwMkM4NCAxMTEuOTE2IDkyLjA4NCAxMjAgMTAyIDEyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTIwMCAxNDBIMTUwVjE2MEgxNzBWMjAwaDIwVjE0MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4=";
          target.className = fallbackClassName || className;
        }
      }}
    />
  );
};

export default ImageWithFallback;