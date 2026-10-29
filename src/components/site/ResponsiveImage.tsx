import type { ImgHTMLAttributes } from 'react';
import { imageVariants } from '@/lib/image-variants';

export function ResponsiveImage({ src, sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const variant = typeof src === 'string' ? imageVariants[src] : undefined;
  return <img {...props} src={variant?.src ?? src} srcSet={variant?.srcSet} sizes={sizes} />;
}