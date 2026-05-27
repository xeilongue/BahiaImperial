import React from 'react';
import './CreateAccount.css';

interface CreateAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateAccount: (type: 'Corrente' | 'Poupança' | 'Empresarial') => void;
}

function CreateAccountModal({ isOpen, onClose, onCreateAccount }: CreateAccountModalProps) {
    // Se o modal não estiver aberto, não renderiza nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* O stopPropagation impede que o modal feche ao clicar dentro da caixinha branca */}
            <div className="modal-card bg-white p-4 p-sm-5 rounded-4 shadow-lg" onClick={(e) => e.stopPropagation()}>

                <div className="text-center mb-4">
                    <h4 className="fw-bold text-dark mb-1">Nova Conta Bancária</h4>
                    <p className="text-muted small">Escolha o tipo de conta ideal para você</p>
                </div>

                {/* Lista de Opções Estilizadas */}
                <div className="d-flex flex-column gap-3 mb-4">

                    <button className="option-card" onClick={() => onCreateAccount('Corrente')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold">Conta Corrente</h6>
                            <span className="badge bg-light text-primary">Mais Comum</span>
                        </div>
                        <p className="small">Ideal para movimentações diárias, Pix e pagamentos rápidos.</p>
                    </button>

                    <button className="option-card" onClick={() => onCreateAccount('Poupança')}>
                        <h6 className="fw-bold">Conta Poupança</h6>
                        <p className="small">Guarde suas economias com segurança e rendimento garantido.</p>
                    </button>

                    <button className="option-card" onClick={() => onCreateAccount('Empresarial')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold">Conta Business (Empresarial)</h6>
                        </div>
                        <p className="small">Focada em PJ, gestão de faturamento e negócios da sua empresa.</p>
                    </button>

                </div>

                {/* Botão Cancelar */}
                <div className="d-grid">
                    <button type="button" className="btn btn-light border text-secondary py-2 fw-medium" onClick={onClose}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CreateAccountModal;