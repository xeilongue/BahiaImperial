import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import './Dashboard.css';

// ─── INTERFACES ───────────────────────────────────────────────────────────────

interface Transaction {
    id: number;
    description: string;
    date: string;
    type: 'entrada' | 'saida';
    value: number;
}

interface AccountData {
    id: number;
    balance: number;
    loanLimit: number;
    loanDebt: number;
    type: number;
}

// Espelho exato do BankTransaction que vem da API
interface ApiTransaction {
    id: number;
    type: 0 | 1;        // 0 = Deposit, 1 = Withdraw
    amount: number;
    trDate: string;     // DateTime serializado como string ISO
    accountId: number;
}

// Espelho exato do AccountDTO que vem da API
interface ApiAccountDTO {
    id: number;
    balance: number;
    loanLimit: number;
    loanDebt: number;
    type: 0 | 1 | 2;   // 0 = business, 1 = checking, 2 = saving
}

// Shape das respostas da API
interface ApiAccountsResponse {
    message?: string;
    data: ApiAccountDTO[];
}

interface ApiTransactionsResponse {
    data: ApiTransaction[];
}

interface ApiOperationResponse {
    message?: string;
}

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

const API_BASE = 'BahiaImperial_API/api';

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

function Dashboard() {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOperating, setIsOperating] = useState(false);

    const [showModal, setShowModal] = useState<false | 'sacar' | 'depositar'>(false);
    const [inputValue, setInputValue] = useState('');

    const getToken = (): string | null => localStorage.getItem("jwtToken");

    const getAccountTypeName = (type: 0 | 1 | 2): string => {
        if (type === 0) return 'Empresarial';
        if (type === 1) return 'Corrente';
        return 'Poupança';
    };

    // Mapeia o ApiTransaction (formato API) para Transaction (formato do componente)
    const mapTransaction = (t: ApiTransaction): Transaction => ({
        id: t.id,
        description: t.type === 0 ? 'Depósito' : 'Saque',
        date: new Date(t.trDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        type: t.type === 0 ? 'entrada' : 'saida',
        value: t.amount
    });

    // Mapeia o ApiAccountDTO para AccountData
    const mapAccount = (a: ApiAccountDTO): AccountData => ({
        id: a.id,
        balance: a.balance,
        loanLimit: a.loanLimit,
        loanDebt: a.loanDebt,
        type: a.type
    });

    const fetchTransactions = useCallback(async (accountId: number): Promise<void> => {
        const token = getToken();
        try {
            const response = await fetch(`${API_BASE}/Transaction/history/${accountId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result: ApiTransactionsResponse = await response.json();
            if (response.ok && result.data) {
                setTransactions(result.data.map(mapTransaction));
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setTransactions([]);
        }
    }, []);

    useEffect(() => {
        const fetchUserAccounts = async (): Promise<void> => {
            const token = getToken();
            if (!token) {
                alert("Sessão expirada. Faça login novamente.");
                navigate("/");
                return;
            }
            try {
                const response = await fetch(`${API_BASE}/Account/ByUserId`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const result: ApiAccountsResponse = await response.json();
                if (response.ok && result.data && result.data.length > 0) {
                    const mapped = result.data.map(mapAccount);
                    setAccounts(mapped);
                    setSelectedAccount(mapped[0]);
                    await fetchTransactions(mapped[0].id);
                } else {
                    alert(result.message || "Nenhuma conta encontrada para este usuário.");
                }
            } catch (error) {
                console.error("Erro ao buscar contas:", error);
                alert("Erro ao conectar com o servidor.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserAccounts();
    }, [navigate, fetchTransactions]);

    const handleAccountChange = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const index = parseInt(event.target.value);
        const account = accounts[index];
        setSelectedAccount(account);
        setTransactions([]);
        await fetchTransactions(account.id);
    };

    const handleLogout = (): void => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    const handleSubmitAction = async (): Promise<void> => {
        const valueNum = parseFloat(inputValue);

        if (isNaN(valueNum) || valueNum <= 0) {
            alert("Por favor, digite um valor válido.");
            return;
        }

        if (showModal === 'sacar' && selectedAccount && valueNum > selectedAccount.balance) {
            alert("Saldo insuficiente para realizar este saque.");
            return;
        }

        if (!selectedAccount) return;

        const token = getToken();
        const endpoint = showModal === 'depositar' ? 'deposit' : 'withdraw';
        setIsOperating(true);

        try {
            const response = await fetch(`${API_BASE}/Transaction/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    accountId: selectedAccount.id,
                    amount: valueNum,
                    type: showModal === 'depositar' ? 0 : 1
                })
            });

            const result: ApiOperationResponse = await response.json();

            if (response.ok) {
                const updatedAccount: AccountData = {
                    ...selectedAccount,
                    balance: showModal === 'depositar'
                        ? selectedAccount.balance + valueNum
                        : selectedAccount.balance - valueNum
                };
                setSelectedAccount(updatedAccount);
                setAccounts(prev =>
                    prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc)
                );
                await fetchTransactions(selectedAccount.id);
                setShowModal(false);
                setInputValue('');
            } else {
                alert(result.message || "Erro ao realizar operação.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor.");
        } finally {
            setIsOperating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page-container">

            <nav className="dashboard-nav py-2 px-4 d-flex justify-content-between align-items-center sticky-top">
                <div className="d-flex align-items-center gap-2">
                    {accounts.length > 1 ? (
                        <select
                            className="form-select form-select-sm bg-dark text-white border-secondary"
                            onChange={handleAccountChange}
                        >
                            {accounts.map((acc, index) => (
                                <option key={acc.id} value={index}>
                                    Conta {getAccountTypeName(acc.type as 0 | 1 | 2)}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="text-white small">
                            Conta: <strong>
                                {selectedAccount ? getAccountTypeName(selectedAccount.type as 0 | 1 | 2) : ''}
                            </strong>
                        </div>
                    )}
                </div>
                <button type="button" className="btn-nav-action btn-logout" onClick={handleLogout}>
                    Sair ✕
                </button>
            </nav>

            <div className="container py-4 dashboard-main-content">

                <div className="dashboard-card bg-white p-4 mb-4 shadow-sm rounded-4">
                    <div className="row text-center text-md-start align-items-center g-3">
                        <div className="col-12 col-md-6">
                            <div className="metric-label text-secondary mb-1" style={{ fontSize: '0.85rem' }}>Saldo Disponível</div>
                            <h2 className="fw-bold text-dark m-0">
                                {selectedAccount?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </div>

                    </div>
                </div>

                <div className="row g-3">

                    <div className="col-12 col-md-5">
                        <div className="dashboard-card bg-white p-3 shadow-sm rounded-4 align-self-start"> {/* removeu h-100, adicionou align-self-start */}
                            <h6 className="fw-bold text-dark mb-3">Movimentações</h6>
                            <div className="d-flex flex-column gap-2">
                                <button
                                    className="btn btn-success py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => setShowModal('depositar')}
                                >
                                    <span>📥</span> Depositar Dinheiro
                                </button>
                                <button
                                    className="btn btn-primary py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => setShowModal('sacar')}
                                >
                                    <span>💸</span> Sacar Dinheiro
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-7">
                        <div className="dashboard-card bg-white p-3 h-100 shadow-sm rounded-4">
                            <h6 className="fw-bold text-dark mb-3">Histórico de Transações</h6>
                            <div className="d-flex flex-column">
                                {transactions.length > 0 ? (
                                    transactions.map((tx) => (
                                        <div key={tx.id} className="transaction-item d-flex align-items-center justify-content-between py-2 border-bottom">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className={`tx-icon-wrapper ${tx.type === 'entrada' ? 'tx-positive' : 'tx-negative'}`}>
                                                    {tx.type === 'entrada' ? '↓' : '↑'}
                                                </div>
                                                <div>
                                                    <div className="fw-medium text-dark" style={{ fontSize: '0.85rem' }}>{tx.description}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{tx.date}</div>
                                                </div>
                                            </div>
                                            <div className="fw-semibold" style={{ fontSize: '0.9rem', color: tx.type === 'entrada' ? '#137333' : '#0f172a' }}>
                                                {tx.type === 'entrada' ? '+' : '-'} {tx.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-muted small">
                                        Nenhuma movimentação recente nesta conta.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {showModal && (
                <div className="custom-modal-backdrop d-flex align-items-center justify-content-center">
                    <div className="custom-modal-box bg-white p-4 rounded-4 shadow-lg text-center animate__animated animate__fadeInUp">
                        <h5 className="fw-bold text-dark mb-3 text-capitalize">
                            {showModal === 'depositar' ? '📥 Confirmar Depósito' : '💸 Confirmar Saque'}
                        </h5>
                        <p className="small text-muted mb-4">
                            Digite o valor que deseja {showModal === 'depositar' ? 'depositar na' : 'sacar da'} sua conta.
                        </p>
                        <div className="input-group mb-4">
                            <span className="input-group-text bg-light fw-bold">R$</span>
                            <input
                                type="number"
                                className="form-control form-control-lg fw-bold"
                                placeholder="0,00"
                                step="0.01"
                                min="0.01"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-light border w-50"
                                onClick={() => { setShowModal(false); setInputValue(''); }}
                                disabled={isOperating}
                            >
                                Cancelar
                            </button>
                            <button
                                className={`btn ${showModal === 'depositar' ? 'btn-success' : 'btn-primary'} w-50`}
                                onClick={handleSubmitAction}
                                disabled={isOperating}
                            >
                                {isOperating
                                    ? <span className="spinner-border spinner-border-sm" role="status" />
                                    : 'Confirmar'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;