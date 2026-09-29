import { NextRequest, NextResponse } from 'next/server';
import { releaseExpiredHolds } from '@/lib/booking-engine';

export async function GET(req: NextRequest) {
  try {
    const result = await releaseExpiredHolds();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    console.error('CRON release-holds error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
