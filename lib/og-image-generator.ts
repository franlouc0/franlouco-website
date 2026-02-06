import sharp from "sharp";
import path from "path";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const LOGO_WIDTH = 360; // ~30% of 1200, centered
const BRIGHTNESS_THRESHOLD = 128;

/**
 * Get average brightness (0–255) of an image. Uses a small resize then raw pixel average.
 */
async function getAverageBrightness(imagePath: string): Promise<number> {
  const absolutePath = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
  const small = await sharp(absolutePath)
    .resize(50, 50)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { data, info } = small;
  const channels = info.channels;
  const len = data.length;
  let sum = 0;
  const pixelCount = len / channels;
  for (let i = 0; i < len; i += channels) {
    sum += (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
  }
  return sum / pixelCount;
}

/**
 * Generate OG image: base grid image resized to 1200x630 with logo overlay mid-centered.
 * Chooses white or black logo based on base image brightness (dark → white logo).
 */
export async function generateOgImageWithLogo(
  baseImagePath: string
): Promise<Buffer> {
  const absoluteBase = path.join(
    process.cwd(),
    "public",
    baseImagePath.replace(/^\//, "")
  );
  const brightness = await getAverageBrightness(baseImagePath);
  const logoVariant = brightness < BRIGHTNESS_THRESHOLD ? "white" : "black";
  const logoFileName =
    logoVariant === "white"
      ? "fl-icon-logo-white.png"
      : "fl-icon-logo-black.png";
  const logoPath = path.join(process.cwd(), "public", logoFileName);

  const [baseResized, logoResized] = await Promise.all([
    sharp(absoluteBase)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "center" })
      .png()
      .toBuffer(),
    sharp(logoPath)
      .resize(LOGO_WIDTH, null, { fit: "inside" })
      .png()
      .toBuffer(),
  ]);

  const logoMeta = await sharp(logoResized).metadata();
  const logoW = logoMeta.width ?? LOGO_WIDTH;
  const logoH = logoMeta.height ?? 0;
  const left = Math.round((OG_WIDTH - logoW) / 2);
  const top = Math.round((OG_HEIGHT - logoH) / 2);

  return sharp(baseResized)
    .composite([{ input: logoResized, left, top }])
    .jpeg({ quality: 82 })
    .toBuffer();
}
