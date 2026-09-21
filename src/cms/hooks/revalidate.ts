import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

function safelyRevalidate(paths: string[]) {
  for (const path of new Set(paths)) {
    try {
      revalidatePath(path);
    } catch {
      // CLI seed/type-generation contexts do not always have a Next cache.
    }
  }
}

export function revalidateCollection(listingPath: string): CollectionAfterChangeHook {
  return ({ doc, previousDoc }) => {
    const paths = [listingPath];
    if (doc?.slug) paths.push(`${listingPath}/${doc.slug}`);
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) paths.push(`${listingPath}/${previousDoc.slug}`);
    safelyRevalidate(paths);
    return doc;
  };
}

export function revalidateCollectionDelete(listingPath: string): CollectionAfterDeleteHook {
  return ({ doc }) => {
    const paths = [listingPath];
    if (doc?.slug) paths.push(`${listingPath}/${doc.slug}`);
    safelyRevalidate(paths);
    return doc;
  };
}

export function revalidateGlobal(...paths: string[]): GlobalAfterChangeHook {
  return ({ doc }) => {
    safelyRevalidate(paths);
    return doc;
  };
}
