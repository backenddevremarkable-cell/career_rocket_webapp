import Image from "next/image";
import Link from "next/link";
import logoImage from "../../assets/images/Logo.png";

export default function Logo() {
  return (
    <Link
      href="#"
      className="inline-flex shrink-0 items-center bg-transparent"
    >
      <Image
        src={logoImage}
        alt="Career Rocket"
        width={logoImage.width}
        height={logoImage.height}
        className="h-10 w-auto object-contain sm:h-11 lg:h-12"
        style={{ backgroundColor: "transparent" }}
        priority
        unoptimized
      />
    </Link>
  );
}
