import React, { useState } from 'react';
import { useNavigate, Link } from "react-router";
import './Signup.css';

function Signup() {

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [cpfCnpj, setCpfCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [fullName, setFullName] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [inceptionDate, setInceptionDate] = useState('');

    const navigate = useNavigate();
    const isCnpj = cpfCnpj.replace(/\D/g, '').length > 11;

    const userApiUrl = 'BahiaImperial_API/api/User';
    const clientApiUrl = 'BahiaImperial_API/api/Client';
    const accountApiUrl = 'BahiaImperial_API/api/Account';

    const handlePrevStep = () => {
        setStep(1);
    };
    const handleNextStep = () => {
        alert("Você está quase lá! Só mais algumas informações!")
        setStep(2);
    };

    const handleRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {

        if (event) event.preventDefault();
        setIsLoading(true);

        const newUser = {
            cpf_Cnpj: cpfCnpj,
            password: password
        };

        try {
            const userResponse = await fetch(userApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            const data = await userResponse.json().catch(() => ({}));

            if (userResponse.ok) {
                console.log(data.message);
            }
            else {
                alert(data.message || "Erro ao cadastrar usuário.");
                setIsLoading(false);
                setCpfCnpj('');
                setPassword('');
                setFullName('');
                setInceptionDate('');
                setMonthlyIncome('');
                setStep(1);
                return;
            }
        } catch (error) {
            alert("Erro de conexão com o servidor.");
            console.error(error);
            return;
        }

        const newClient = {
            cpf_Cnpj: cpfCnpj,
            name: fullName,
            salary: monthlyIncome,
            inceptionDate: inceptionDate
        }

        try {
            const clientResponse = await fetch(clientApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient)
            });

            const clientData = await clientResponse.json();

            if (clientResponse.ok) {
                console.log(clientData.message);
                navigate("/")
            }
            else {
                alert(clientData.message);

                setIsLoading(false);

                await fetch(userApiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser.cpf_Cnpj)
                });

                setCpfCnpj('');
                setPassword('');
                setFullName('');
                setInceptionDate('');
                setMonthlyIncome('');
                setStep(1);
                return;

            }
        } catch (error) {
            console.error(error);
            setCpfCnpj('');
            setPassword('');
            setFullName('');
            setInceptionDate('');
            setMonthlyIncome('');
            setStep(1);
            return;
        }

        const quant = newClient.cpf_Cnpj.length;

        if (quant == 11) {
            try {
                const salaryNumber = parseFloat(monthlyIncome) || 0;

                const newCheckingAccount = {
                    cpf_Cnpj: cpfCnpj,
                    type: 1,
                    loanLimit: salaryNumber * 0.3
                }

                const accountResponse = await fetch(accountApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCheckingAccount)
                });

                const accountData = await accountResponse.json();

                if (accountResponse.ok) {
                    console.log(accountData.message);
                }
                else {
                    alert(accountData.message);
                    return;
                }

            } catch (error) {
                console.error(error);
                setCpfCnpj('');
                setPassword('');
                setFullName('');
                setInceptionDate('');
                setMonthlyIncome('');
                setStep(1);
                return;
            }

            try {
                const salaryNumber = parseFloat(monthlyIncome) || 0;

                const newSavingAccount = {
                    cpf_Cnpj: cpfCnpj,
                    type: 2,
                    loanLimit: salaryNumber * 0.3
                }

                const accountResponse = await fetch(accountApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSavingAccount)
                });

                const accountData = await accountResponse.json();

                if (accountResponse.ok) {
                    console.log(accountData.message);
                    window.location.reload();
                }
                else {
                    alert(accountData.message);
                    alert("Cadastro realizado com sucesso!");
                }

            } catch (error) {
                console.error(error);
                setCpfCnpj('');
                setPassword('');
                setFullName('');
                setInceptionDate('');
                setMonthlyIncome('');
                setStep(1);
            } finally {
                setIsLoading(false);
            }
        } else {

            try {
                const salaryNumber = parseFloat(monthlyIncome) || 0;

                const newBusinessAccount = {
                    cpf_Cnpj: cpfCnpj,
                    type: 0,
                    loanLimit: salaryNumber * 0.8
                }

                const accountResponse = await fetch(accountApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBusinessAccount)
                });

                const accountData = await accountResponse.json();

                if (accountResponse.ok) {
                    console.log(accountData.message);
                    alert("Cadastro realizado com sucesso!");
                }
                else {
                    alert(accountData.message);
                }

            } catch (error) {
                console.error(error);
                setCpfCnpj('');
                setPassword('');
                setFullName('');
                setInceptionDate('');
                setMonthlyIncome('');
                setStep(1);
            }
        }

    }

    return (
        <div className="auth-page-container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">

                        <form onSubmit={handleRegisterUser} className="auth-card bg-white p-4 p-sm-5 rounded-4 shadow-sm d-flex flex-column">

                            <div className="text-center mb-4">
                                <h3 className="fw-bold text-dark mb-2">Criar Conta</h3>
                                <span className="badge-step">Etapa {step} de 2</span>
                            </div>

                            {/* ETAPA 1: CREDENCIAIS */}
                            {step === 1 && (
                                <>
                                    {/* Campo Usuário (CPF/CNPJ) */}
                                    <div className="mb-3">
                                        <label htmlFor="InputEmailRegister" className="form-label fw-medium text-secondary small">CPF ou CNPJ</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            id="InputEmailRegister"
                                            placeholder="Apenas números"
                                            maxLength={14}
                                            value={cpfCnpj}
                                            onChange={(e) => setCpfCnpj(e.target.value.replace(/\D/g, ''))}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    {/* Campo Senha */}
                                    <div className="mb-3">
                                        <label htmlFor="InputPasswordRegister" className="form-label fw-medium text-secondary small">Senha</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control form-control-custom"
                                            id="InputPasswordRegister"
                                            placeholder="Crie uma senha forte"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    {/* Switch de Mostrar Senha */}
                                    <div className="form-check form-switch mb-4 d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="showPassword"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <label className="form-check-label small text-muted ms-2" htmlFor="showPassword" style={{ cursor: 'pointer' }}>
                                            Mostrar senha
                                        </label>
                                    </div>

                                    <div className="d-grid mb-4">
                                        <button type="button" onClick={handleNextStep} className="btn btn-custom-auth shadow-sm">
                                            Avançar →
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* ETAPA 2: DADOS DO PERFIL */}
                            {step === 2 && (
                                <>
                                    <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                                        <h6 className="mb-0 fw-bold text-dark">
                                            {isCnpj ? "Dados da Empresa" : "Dados Pessoais"}
                                        </h6>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light border text-secondary"
                                            onClick={handlePrevStep}
                                            disabled={isLoading}
                                            style={{ fontSize: '0.85rem' }}
                                        >
                                            ← Voltar
                                        </button>
                                    </div>

                                    {/* Campo Nome / Razão Social */}
                                    <div className="mb-3">
                                        <label className="form-label fw-medium text-secondary small">
                                            {isCnpj ? "Razão Social / Nome da Empresa" : "Nome Completo"}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            placeholder={isCnpj ? "Ex: Bahia Imperial Ltda" : "Ex: João Silva"}
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    {/* Campo Renda / Faturamento */}
                                    <div className="mb-3">
                                        <label className="form-label fw-medium text-secondary small">
                                            {isCnpj ? "Faturamento Mensal" : "Renda Mensal"}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light text-muted border-end-0 px-3" style={{ borderRadius: '0.5rem 0 0 0.5rem', borderColor: '#e2e8f0' }}>R$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control form-control-custom border-start-0"
                                                placeholder="0.00"
                                                value={monthlyIncome}
                                                onChange={(e) => setMonthlyIncome(e.target.value)}
                                                disabled={isLoading}
                                                required
                                                style={{ borderRadius: '0 0.5rem 0.5rem 0' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Campo Data de Nascimento */}
                                    <div className="mb-4">
                                        <label className="form-label fw-medium text-secondary small">
                                            {isCnpj ? "Data de Abertura / Fundação" : "Data de Nascimento"}
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control form-control-custom"
                                            value={inceptionDate}
                                            onChange={(e) => setInceptionDate(e.target.value)}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="d-grid mb-4">
                                        <button type="submit" className="btn btn-custom-auth shadow-sm" disabled={isLoading}>
                                            {isLoading ? (
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    <span>Processando...</span>
                                                </div>
                                            ) : 'Concluir Cadastro'}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Link para o Login */}
                            <div className="text-center pt-2 border-top">
                                <p className="mb-0 small text-muted">
                                    Já possui uma conta?{' '}
                                    <Link to="/" className="auth-link ms-1">
                                        Fazer Login
                                    </Link>
                                </p>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;