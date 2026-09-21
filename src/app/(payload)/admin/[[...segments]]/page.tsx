import config from "@payload-config";
import { RootPage } from "@payloadcms/next/views";
import Link from "next/link";

import { isCmsFullyConfigured } from "@/lib/cms/configuration";

import { importMap } from "../importMap.js";

export const metadata = { title: "Zenticsys CMS" };

type AdminPageProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export default function AdminPage(props: AdminPageProps) {
  if (!isCmsFullyConfigured()) {
    return (
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "12vh 24px" }}>
        <p style={{ color: "#ff543f", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>
          CMS setup pending
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)", lineHeight: .95, margin: "24px 0" }}>
          The public website is available. The editor is not connected yet.
        </h1>
        <p style={{ color: "#b7b9bc", fontSize: "1.1rem", lineHeight: 1.6 }}>
          Add the Payload, MongoDB Atlas, and Cloudflare R2 environment values documented in the project setup guide, then restart the application.
        </p>
        <Link href="/" style={{ color: "#fff", display: "inline-block", marginTop: 24 }}>
          Return to the website
        </Link>
      </main>
    );
  }

  return RootPage({ config, importMap, ...props });
}
