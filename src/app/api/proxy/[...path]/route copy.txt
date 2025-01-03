import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ path: string }>  }) {
  // Assurez-vous que params est bien récupéré de manière asynchrone
  const { path } = await params;  // Attendez params

  if (!path || !Array.isArray(path)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const targetUrl = `https://sgi.cynomedia-africa.com/wp-content/uploads/${path.join('/')}`;
  console.log('Fetching URL:', targetUrl);

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${response.statusText}` }, { status: response.status });
    }

    // Passe les headers du fichier (contenu binaire, type, etc.)
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    const body = await response.arrayBuffer();

    return new NextResponse(Buffer.from(body), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': response.headers.get('Content-Disposition') || 'inline',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
