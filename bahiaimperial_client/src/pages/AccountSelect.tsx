import React, { useState } from 'react';
import { useNavigate } from 'react-router'; // IMPORTAÇÃO ADICIONADA
import './AccountSelect.css';
import CreateAccountModal from '../components/CreateAccount';

interface BankAccount {
    id: number;
    accountNumber: string;
    type: 'Corrente' | 'Poupança' | 'Empresarial';
    balance: number;
}

function AccountSelection() {
    const navigate = useNavigate(); // DECLARAÇÃO ADICIONADA

    const [accounts, setAccounts] = useState<BankAccount[]>([
        { id: 1, accountNumber: "100234-5", type: "Corrente", balance: 1540.32 },
        { id: 2, accountNumber: "550912-8", type: "Poupança", balance: 10450.00 }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectAccount = (accountId: number) => {
        console.log(`Conta selecionada: ${accountId}`);
        // Exemplo: navigate(`/dashboard/${accountId}`);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleConfirmCreateAccount = (type: 'Corrente' | 'Poupança' | 'Empresarial') => {
        const randomAccountNumber = `${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(Math.random() * 9)}`;

        const newAccount: BankAccount = {
            id: Date.now(),
            accountNumber: randomAccountNumber,
            type: type,
            balance: 0.00
        };

        setAccounts([...accounts, newAccount]);
        setIsModalOpen(false);

        alert(`Conta ${type} criada com sucesso! Número: ${randomAccountNumber}`);
    };

    return (
        <div className="account-page-container min-vh-100">

            {/* Barra de Navegação no topo para o Logout */}
            <nav className="d-flex justify-content-end p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger px-3 py-2 fw-medium"
                    style={{ borderRadius: '0.375rem', fontSize: '0.85rem' }}
                    onClick={() => {
                        localStorage.removeItem("jwtToken");
                        navigate("/"); // Agora funciona perfeitamente!
                    }}
                >
                    Sair da Conta ✕
                </button>
            </nav>

            {/* Centralizador do Grid */}
            {/* Substitua a div do centralizador por esta linha direta e limpa */}
            <div className="d-flex align-items-center justify-content-center pt-4 pb-5 px-3">
                <div className="account-card bg-white p-4 rounded-4 shadow-sm">
                    {/* O conteúdo interno continua exatamente o mesmo */}
                            <div className="text-center mb-4">
                                <h3 className="fw-bold text-dark mb-1">Selecione sua Conta</h3>
                                <p className="text-muted small">Escolha qual conta deseja acessar hoje</p>
                            </div>

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

                            <div className="d-grid">
                                <button
                                    type="button"
                                    className="btn btn-outline-custom d-flex align-items-center justify-content-center gap-2"
                                    onClick={handleOpenModal}
                                >
                                    <span>+</span> Criar nova conta bancária
                                </button>
                            </div>

                        </div>
                </div>

            {/* Chamada do Componente do Pop-up */}
            <CreateAccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateAccount={handleConfirmCreateAccount}
            />
        </div>
    );
}

export default AccountSelection;