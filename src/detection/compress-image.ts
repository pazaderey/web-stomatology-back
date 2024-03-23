import sharp from "sharp";

/**
 *
 * @param buf
 * @returns
 */
export default async function compressImage(buf: Buffer): Promise<Buffer> {
    return sharp(buf).png({ compressionLevel: 3 }).toBuffer();
}
