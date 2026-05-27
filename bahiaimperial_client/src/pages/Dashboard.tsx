import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Dashboard.css';

interface Transaction {
    id: number;
    description: string;
    date: string;
    type: 'entrada' | 'saida';
    value: number;
}

function Dashboard() {
    const navigate = useNavigate();

    const [accountType, setAccountType] = useState<'Corrente' | 'Poupança' | 'Empresarial'>('Poupança');
    const [accountNumber, setAccountNumber] = useState('100234-5');

    const [balance, setBalance] = useState(4850.25);
    const [creditLimit, setCreditLimit] = useState(15000.00);
    const [debt, setDebt] = useState(1200.00);

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 1, description: "Depósito PIX recebido", date: "Hoje, 14:32", type: "entrada", value: 350.00 },
        { id: 2, description: "Pagamento de Boleto Luz", date: "Ontem, 09:15", type: "saida", value: 184.90 },
        { id: 3, description: "Transferência enviada", date: "24 Mai, 18:02", type: "saida", value: 1200.00 },
        { id: 4, description: "Rendimento Poupança Automático", date: "20 Mai, 00:01", type: "entrada", value: 24.15 }
    ]);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    const handleGoBack = () => {
        navigate("/selecionar-conta");
    };

    const handleAction = (actionName: string) => {
        alert(`Ação iniciada: ${actionName}`);
    };

    return (
        <div className="dashboard-page-container">

            {/* BARRA SUPERIOR SLIM */}
            <nav className="dashboard-nav py-2 px-4 d-flex justify-content-between align-items-center sticky-top">
                <button type="button" className="btn-nav-action" onClick={handleGoBack}>
                    ← Voltar
                </button>
                <div className="text-white text-center d-none d-sm-block">
                    <span className="small text-nav-muted">Conta {accountType}:</span> <strong className="ms-1">{accountNumber}</strong>
                </div>
                <button type="button" className="btn-nav-action btn-logout" onClick={handleLogout}>
                    Sair ✕
                </button>
            </nav>

            {/* ÁREA CENTRALIZADA E COMPACTA */}
            <div className="container py-4 dashboard-main-content">

                {/* RESUMO DE SALDO (LINHA SIMPLIFICADA) */}
                <div className="dashboard-card bg-white p-3 mb-4 shadow-sm">
                    <div className="row text-center text-md-start g-2">

                        <div className="col-12 col-md-4 compact-metric">
                            <div className="metric-label text-primary">Saldo Bancário</div>
                            <h4 className="fw-bold text-dark m-0">
                                {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h4>
                        </div>

                        <div className="col-12 col-md-4 compact-metric">
                            <div className="metric-label text-card-muted">Limite Disponível</div>
                            <h5 className="fw-semibold text-dark m-0 mt-1">
                                {creditLimit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h5>
                        </div>

                        <div className="col-12 col-md-4 compact-metric">
                            <div className="metric-label text-danger">Em Dívida</div>
                            <h5 className="fw-semibold text-danger m-0 mt-1">
                                {debt.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h5>
                        </div>

                    </div>
                </div>

                {/* GRID DE DUAS COLUNAS MAIS MAGRO */}
                <div className="row g-3">

                    {/* SEÇÃO DE AÇÕES */}
                    <div className="col-12 col-md-5">
                        <div className="dashboard-card bg-white p-3 h-100 shadow-sm">
                            <h6 className="fw-bold text-dark mb-3">Ações Rápidas</h6>

                            <div className="d-flex flex-column gap-2">
                                <button className="action-grid-btn" onClick={() => handleAction('Saque')}>
                                    <span>💸</span> Saque
                                </button>
                                <button className="action-grid-btn" onClick={() => handleAction('Depósito')}>
                                    <span>📥</span> Depósito
                                </button>
                                <button className="action-grid-btn" onClick={() => handleAction('Empréstimo')}>
                                    <span>🏦</span> Empréstimo
                                </button>
                                <button className="action-grid-btn" onClick={() => handleAction('Pagar Empréstimo')}>
                                    <span>💳</span> Pagar Empréstimo
                                </button>

                                {accountType === 'Poupança' && (
                                    <button className="action-grid-btn border-success-subtle bg-success-subtle text-success mt-1" onClick={() => handleAction('Rendimento')}>
                                        <span>📈</span> Rendimentos
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO DO HISTÓRICO */}
                    <div className="col-12 col-md-7">
                        <div className="dashboard-card bg-white p-3 h-100 shadow-sm">
                            <h6 className="fw-bold text-dark mb-3">Histórico Recente</h6>

                            <div className="d-flex flex-column">
                                {transactions.length > 0 ? (
                                    transactions.map((tx) => (
                                        <div key={tx.id} className="transaction-item d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className={`tx-icon-wrapper ${tx.type === 'entrada' ? 'tx-positive' : 'tx-negative'}`}>
                                                    {tx.type === 'entrada' ? '↓' : '↑'}
                                                </div>
                                                <div>
                                                    <div className="fw-medium text-dark visual-clean-text" style={{ fontSize: '0.85rem' }}>{tx.description}</div>
                                                    <div className="text-card-muted" style={{ fontSize: '0.7rem' }}>{tx.date}</div>
                                                </div>
                                            </div>
                                            <div className={`fw-semibold text-end`} style={{ fontSize: '0.9rem', color: tx.type === 'entrada' ? '#137333' : '#0f172a' }}>
                                                {tx.type === 'entrada' ? '+' : '-'} {tx.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-card-muted small">
                                        Sem movimentações.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;