'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProductImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const classes = className ?? 'h-full w-full object-contain'

  if (failed || !src) {
    return (
      <Image
        src="/product-fallback.svg"
        alt={alt}
        width={160}
        height={160}
        className={classes}
      />
    )
  }

  if (!src.startsWith('/')) {
    return (
      // Product photos can come from any address the shopkeeper pastes in.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={classes}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className={classes}
      onError={() => setFailed(true)}
    />
  )
}
