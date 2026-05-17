"use client";

import Image from "next/image";
import { useState } from "react";

import errorImg from "../../assets/images/no-image.png";

export default function CustomImage({
  img,
  alt,
  className,
  errorMedia
}) {
  const [imageSrc, setImageSrc] = useState(img);

  return (
    <Image
      src={imageSrc || errorMedia || errorImg}
      alt={alt}
      fill
      loading="lazy"
      className={`${className} media-img`}
      onError={() => {
        setImageSrc(errorMedia || errorImg);
      }}
    />
  );
}