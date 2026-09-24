import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  onNavigate?: () => void;
  priority?: boolean;
};

export function SiteLogo({ onNavigate, priority = true }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className="site-logo"
      aria-label="Zenticsys home"
      onClick={onNavigate}
    >
      <Image
        src="/brand/zenticsys-wordmark-light.png"
        alt="Zenticsys"
        width={2114}
        height={389}
        className="site-logo__image"
        priority={priority}
        sizes="(max-width: 479px) 108px, 138px"
      />
    </Link>
  );
}
