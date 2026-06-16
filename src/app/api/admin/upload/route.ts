import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { verifyAdminToken } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!verifyAdminToken(req)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const slug = (formData.get('slug') as string | null) || 'generale';

    if (!file) {
      return NextResponse.json({ error: 'Nessun file ricevuto' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'image/gif', 'video/mp4', 'video/mov', 'video/quicktime'
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Tipo di file non supportato. Usa JPEG, PNG, WEBP o MP4.' }, { status: 400 });
    }

    // Max 50MB
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File troppo grande. Massimo 50MB.' }, { status: 400 });
    }

    // Sanitize slug
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Sanitize filename
    const ext = path.extname(file.name).toLowerCase();
    const baseName = path.basename(file.name, ext)
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_-]/g, '');
    const timestamp = Date.now();
    const finalName = `${baseName}_${timestamp}${ext}`;

    // Build target directory path (inside public/images/eventi/[slug]/)
    const targetDir = path.join(process.cwd(), 'public', 'images', 'eventi', safeSlug);
    await mkdir(targetDir, { recursive: true });

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(targetDir, finalName);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/images/eventi/${safeSlug}/${finalName}`;

    return NextResponse.json({ url: publicUrl, filename: finalName }, { status: 200 });
  } catch (err) {
    console.error('[upload] Error:', err);
    return NextResponse.json({ error: 'Errore durante il caricamento del file.' }, { status: 500 });
  }
}
