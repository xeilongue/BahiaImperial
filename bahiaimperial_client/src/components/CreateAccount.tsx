import React from 'react';
import './CreateAccount.css';

interface CreateAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateAccount: (type: 'Corrente' | 'Poupança' | 'Empresarial') => void;
}

function decodificarToken(token: string | null) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.log(e);
        return null;
    }
}

function CreateAccount({ isOpen, onClose, onCreateAccount }: CreateAccountModalProps) {
    if (!isOpen) return null;

    const token = localStorage.getItem("jwtToken");
    const tokenDecodificado = decodificarToken(token);

    const documento =
        tokenDecodificado?.["NameIdentifier"] ||
        tokenDecodificado?.["nameid"] ||
        tokenDecodificado?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
        tokenDecodificado?.["sub"] ||
        "";

    const apenasNumeros = documento.replace(/\D/g, '');

    const isCnpj = apenasNumeros.length === 14;
    const isCpf = apenasNumeros.length === 11;

    const mostrarFisica = isCpf || (!isCpf && !isCnpj);
    const mostrarJuridica = isCnpj || (!isCpf && !isCnpj);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card bg-white p-4 p-sm-5 rounded-4 shadow-lg" onClick={(e) => e.stopPropagation()}>

                <div className="text-center mb-4">
                    <h4 className="fw-bold text-dark mb-1">Nova Conta Bancária</h4>
                    <p className="text-muted small">Escolha o tipo de conta disponível para o seu perfil</p>
                </div>

                <div className="d-flex flex-column gap-3 mb-4">

                    {/* Contas de Pessoa Física */}
                    {mostrarFisica && (
                        <>
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
                        </>
                    )}

                    {/* Conta de Pessoa Jurídica */}
                    {mostrarJuridica && (
                        <button className="option-card" onClick={() => onCreateAccount('Empresarial')}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold">Conta Business (Empresarial)</h6>
                            </div>
                            <p className="small">Focada em PJ, gestão de faturamento e negócios da sua empresa.</p>
                        </button>
                    )}

                </div>

                <div className="d-grid">
                    <button type="button" className="btn btn-light border text-secondary py-2 fw-medium" onClick={onClose}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CreateAccount;