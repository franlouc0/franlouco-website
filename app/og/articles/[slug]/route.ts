import { NextResponse } from "next/server";
import { getArticleGridPath } from "@/lib/og-images";
import { generateOgImageWithLogo } from "@/lib/og-image-generator";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const gridPath = getArticleGridPath(slug);
  if (!gridPath) {
    return new NextResponse(null, { status: 404 });
  }
  try {
    const buffer = await generateOgImageWithLogo(gridPath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    console.error("OG image generation failed for article:", slug, e);
    return new NextResponse(null, { status: 500 });
  }
}
