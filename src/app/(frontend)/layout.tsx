import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageAtmosphere } from "@/components/marketing/page-atmosphere";
import { siteConfig } from "@/lib/site";
import { getFooter, getNavigation, getSiteSettings } from "@/lib/cms/content";

import "./globals.css";
import "@/styles/home.css";
import "@/styles/catalog.css";
import "@/styles/editorial.css";
import "@/styles/conversion.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seo?.metaTitle || siteConfig.title;
  const description = settings.seo?.metaDescription || siteConfig.description;
  const socialImage = settings.seo?.socialImage && typeof settings.seo.socialImage === "object" ? settings.seo.socialImage.url : undefined;
  return {
    metadataBase: siteConfig.url,
    applicationName: siteConfig.name,
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description,
    robots: settings.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: siteConfig.locale, url: "/", siteName: siteConfig.name, title, description, images: socialImage ? [socialImage] : undefined },
    twitter: { card: "summary_large_image", title, description, images: socialImage ? [socialImage] : undefined },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [navigation, footer, settings] = await Promise.all([getNavigation(), getFooter(), getSiteSettings()]);
  const primaryLinks = navigation.primaryLinks || [];
  const projectLinks = navigation.serviceLinks || [];
  const linkGroups = (footer.linkGroups || []).map((group) => ({ title: group.title, links: group.links || [] }));
  const socialLinks = settings.socialLinks || [];
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <PageAtmosphere />
        <SiteHeader primaryLinks={primaryLinks} projectLinks={projectLinks} scheduleLabel={navigation.scheduleLabel} email={settings.publicEmail} />
        <div className="site-frame">{children}</div>
        <SiteFooter kicker={footer.kicker} title={footer.title} description={footer.description} ctaLabel={footer.ctaLabel} ctaHref={footer.ctaHref} copyright={footer.copyright} linkGroups={linkGroups} email={settings.publicEmail} socialLinks={socialLinks} />
      </body>
    </html>
  );
}
