import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// POST - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado. Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, phone, email, insurance_type, coverage_amount, state, utm_source, utm_medium, utm_campaign, utm_term } = body;

    // Validate required fields
    if (!name || !phone || !email || !insurance_type) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, telefone, email, tipo de seguro.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    const utm = {
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_term: utm_term || null,
    };

    const baseLead = {
      site: 'calcula-seguro',
      lead_type: insurance_type,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      data: {
        insurance_type,
        coverage_amount: coverage_amount || null,
        state: state || null,
        submitted_from: request.headers.get('referer') || null,
        user_agent: request.headers.get('user-agent') || null,
      },
      status: 'new',
    };

    // Insert lead into Supabase using unified schema
    let { data, error } = await supabaseAdmin
      .from('leads')
      .insert({ ...baseLead, ...utm })
      .select('id')
      .single();

    // Fallback: produção pode não ter as colunas utm_* (migração
    // add_utm_fields.sql pendente). Nesse caso, guarda os UTMs no JSONB
    // data para não perder o lead.
    if (error && /column|schema/i.test(error.message || '')) {
      console.warn('Insert com colunas UTM falhou, usando fallback JSONB:', error.message);
      ({ data, error } = await supabaseAdmin
        .from('leads')
        .insert({ ...baseLead, data: { ...baseLead.data, ...utm } })
        .select('id')
        .single());
    }

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Erro ao salvar lead. Tente novamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead_id: data?.id ?? null,
      message: 'Lead cadastrado com sucesso!',
    });
  } catch (err) {
    console.error('API /api/leads error:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

// GET - List leads (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const site = searchParams.get('site') || 'calcula-seguro';

    let query = supabaseAdmin
      .from('leads')
      .select('*')
      .eq('site', site)
      .order('created_at', { ascending: false })
      .limit(500);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar leads.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ leads: data || [] });
  } catch (err) {
    console.error('API /api/leads GET error:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

// PATCH - Update lead status
export async function PATCH(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase não configurado.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID e status são obrigatórios.' },
        { status: 400 }
      );
    }

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido. Use: new, contacted, qualified, converted, rejected.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Erro ao atualizar status.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API /api/leads PATCH error:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
