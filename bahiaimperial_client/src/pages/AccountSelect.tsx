import { useState } from 'react';
import './AccountSelect.css';

interface BankAccount {
    id: number;
    accountNumber: string;
    type: 'Corrente' | 'Poupança' | 'Empresarial';
    balance: number;
}

function AccountSelect() {
    // Lista simulada de contas vinda do banco de dados
    const [accounts] = useState<BankAccount[]>([
        { id: 1, accountNumber: "100234-5", type: "Corrente", balance: 1540.32 },
        { id: 2, accountNumber: "550912-8", type: "Poupança", balance: 10450.00 },
        { id: 3, accountNumber: "990143-1", type: "Empresarial", balance: 85230.75 }
    ]);

    const handleSelectAccount = (accountId: number) => {
        console.log(`Conta selecionada: ${accountId}`);
    };

    const handleCreateAccount = () => {
        alert("Redirecionando para a criação de nova conta...");
    };

    return (
        <div className="account-page-container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">

                        {/* Caixa Branca Centralizada */}
                        <div className="account-card bg-white p-4 p-sm-5 rounded-4 shadow-sm">

                            <div className="text-center mb-4">
                                <h3 className="fw-bold text-dark mb-1">Selecione sua Conta</h3>
                                <p className="text-muted small">Escolha qual conta deseja acessar hoje</p>
                            </div>

                            {/* Renderização condicional e loop dinâmico */}
                            <div className="d-flex flex-column gap-3 mb-4">
                                {accounts.length > 0 ? (
                                    accounts.map((account) => (
                                        <div
                                            key={account.id}
                                            className="account-card-item d-flex align-items-center justify-content-between"
                                            onClick={() => handleSelectAccount(account.id)}
                                        >
                                            <div>
                                                <div className="text-muted small mb-1">Conta: {account.accountNumber}</div>
                                                <span className="account-type-badge">{account.type}</span>
                                            </div>
                                            <div className="text-end">
                                                <div className="text-muted small">Saldo disponível</div>
                                                <div className="fw-bold text-dark">
                                                    {account.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-muted small border rounded-3 bg-light">
                                        Nenhuma conta bancária encontrada.
                                    </div>
                                )}
                            </div>

                            {/* Botão posicionado fixo após a lista */}
                            <div className="d-grid">
                                <button
                                    type="button"
                                    className="btn btn-outline-custom d-flex align-items-center justify-content-center gap-2"
                                    onClick={handleCreateAccount}
                                >
                                    <span>+</span> Criar nova conta bancária
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSelect;