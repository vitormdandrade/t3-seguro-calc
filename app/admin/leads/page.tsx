'use client';

import { useState, useEffect, useCallback } from 'react';

interface Lead {
  id: number;
  site: string;
  lead_type: string;
  name: string;
  phone: string;
  email: string;
  data: Record<string, any>;
  status: string;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha incorreta.');
    }
  };

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const response = await fetch(`/api/leads?${params.toString()}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao buscar leads.');
      }
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar leads.'
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (authenticated) {
      fetchLeads();
    }
  }, [authenticated, fetchLeads]);

  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'ID', 'Site', 'Tipo', 'Nome', 'Telefone', 'Email',
      'Tipo de Seguro', 'Valor Cobertura', 'Estado (UF)',
      'Status', 'Data de Criação',
    ];

    const rows = leads.map((lead) => {
      const d = lead.data || {};
      return [
        lead.id,
        `"${lead.site}"`,
        `"${lead.lead_type}"`,
        `"${lead.name}"`,
        `"${lead.phone}"`,
        `"${lead.email}"`,
        `"${d.insurance_type || lead.lead_type}"`,
        d.coverage_amount || '',
        d.state || '',
        lead.status,
        new Date(lead.created_at).toLocaleString('pt-BR'),
      ];
    });

    const csvContent =
      '\uFEFF' + headers.join(',') + '\n' + rows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `leads_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updateStatus = async (leadId: number, newStatus: string) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao atualizar status.');
      }
      fetchLeads();
    } catch (err) {
      alert(
        err instanceof Error ? err.message : 'Erro ao atualizar status.'
      );
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin - Leads
          </h1>
          <p className="text-gray-600 mb-6">
            Área restrita para corretores parceiros.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Senha de Acesso
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                autoFocus
              />
            </div>
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {authError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-teal-700 text-white font-bold py-3 rounded-lg hover:bg-teal-800 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const statusOptions = ['new', 'contacted', 'qualified', 'converted', 'rejected'];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'contacted': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'qualified': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'converted': return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads Capturados</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os leads gerados pelas calculadoras de seguro.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Atualizando...' : '🔄 Atualizar'}
          </button>
          <button
            onClick={exportCSV}
            disabled={leads.length === 0}
            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition font-medium disabled:opacity-50"
          >
            📥 Exportar CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Filtrar por status:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">Todos</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500 ml-auto">
          {leads.length} lead(s) encontrado(s)
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          {error}
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Nome
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Telefone
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Seguro
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Cobertura
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  UF
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Carregando...
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-500">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const d = lead.data || {};
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        #{lead.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {lead.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
                          {d.insurance_type || lead.lead_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {d.coverage_amount
                          ? `R$ ${parseInt(d.coverage_amount).toLocaleString('pt-BR')}`
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {d.state || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value)
                          }
                          className={`text-xs font-semibold rounded-full px-3 py-1 border cursor-pointer ${getStatusStyle(lead.status)}`}
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {statusOptions.map((status) => {
          const count = leads.filter((l) => l.status === status).length;
          return (
            <div
              key={status}
              className="bg-white rounded-lg border border-gray-200 p-4 text-center"
            >
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 capitalize">
                {status === 'new'
                  ? 'Novos'
                  : status === 'contacted'
                  ? 'Contatados'
                  : status === 'qualified'
                  ? 'Qualificados'
                  : status === 'converted'
                  ? 'Convertidos'
                  : 'Rejeitados'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
