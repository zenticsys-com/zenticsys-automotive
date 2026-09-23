import "@payloadcms/next/css";

import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";

import { isCmsFullyConfigured } from "@/lib/cms/configuration";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

async function serverFunction(args: { name: string; args: Record<string, unknown> }) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  if (!isCmsFullyConfigured()) {
    return (
      <html lang="en">
        <body style={{ margin: 0, background: "#0f1113", color: "#f7f5f2", fontFamily: "system-ui, sans-serif" }}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
