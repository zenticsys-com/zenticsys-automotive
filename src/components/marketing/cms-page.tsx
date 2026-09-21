import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Media, Page } from "@/payload-types";

function mediaUrl(media: string | Media) {
  return typeof media === "object" && media.url ? media.url : null;
}

export function CmsPage({ page }: { page: Page }) {
  return (
    <main className="editorial-detail cms-page">
      <section className="editorial-hero" data-atmosphere="brand">
        <Container><p className="section-kicker">Zenticsys</p><h1>{page.title}</h1></Container>
      </section>
      {(page.layout || []).map((block) => {
        if (block.blockType === "intro") {
          return <section className="detail-section" key={block.id}><Container><p className="section-kicker">{block.kicker}</p><h2>{block.heading}</h2><p>{block.body}</p></Container></section>;
        }
        if (block.blockType === "featureGrid") {
          return <section className="detail-section" key={block.id}><Container><h2>{block.heading}</h2>{block.intro ? <p>{block.intro}</p> : null}<div className="capability-grid">{block.items?.map((item) => <article className="capability-item" key={item.id}><strong>{item.title}</strong><p>{item.description}</p></article>)}</div></Container></section>;
        }
        if (block.blockType === "imageText") {
          const src = mediaUrl(block.image);
          return <section className={`detail-section cms-image-text cms-image-text--${block.imageSide}`} key={block.id}><Container><div><h2>{block.heading}</h2><p>{block.body}</p></div>{src ? <Image src={src} alt={typeof block.image === "object" ? block.image.alt : ""} width={1200} height={800} /> : null}</Container></section>;
        }
        return <section className="home-proposal" key={block.id}><Container><div className="home-proposal__card"><h2>{block.heading}</h2>{block.body ? <p>{block.body}</p> : null}<Link href={block.href} className="primary-link">{block.label}<ArrowUpRight aria-hidden="true" size={18} /></Link></div></Container></section>;
      })}
    </main>
  );
}
