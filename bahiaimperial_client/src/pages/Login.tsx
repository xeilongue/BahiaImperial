import { useState } from 'react';
import { useNavigate, Link } from "react-router";
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const [cpfCnpj, setCpfCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const apiUrlAuth = '/BahiaImperial_API/api/Auth';

    const handleLogin = async (event) => {
        if (event) event.preventDefault();

        const user = {
            cpf_Cnpj: cpfCnpj,
            password: password
        };

        try {
            const response = await fetch(`${apiUrlAuth}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                alert("Login efetuado com sucesso!");

                const data = await response.json();
                const token = data.token;
                localStorage.setItem("jwtToken", token);

                navigate('/dashboard');
            } else {
                alert("Usuário ou senha incorretos!");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="auth-page-container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-7 col-lg-4">

                        <form onSubmit={handleLogin} className="auth-card bg-white p-4 p-sm-5 rounded-4 shadow-sm">

                            <div className="text-center mb-4">
                                <h3 className="fw-bold text-dark mb-1">Acessar Conta</h3>
                                <p className="text-muted small">Insira suas credenciais abaixo</p>
                            </div>

                            {/* Input de Usuário */}
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label fw-medium text-secondary small">CPF ou CNPJ</label>
                                <input
                                    type="text"
                                    className="form-control form-control-custom"
                                    id="InputEmail"
                                    placeholder="000.000.000-00"
                                    value={cpfCnpj}
                                    onChange={(e) => setCpfCnpj(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Input de Senha */}
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label fw-medium text-secondary small">Senha</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control form-control-custom"
                                    id="InputPassword"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Toggle Mostrar Senha */}
                            <div className="form-check form-switch mb-4 d-flex align-items-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <label
                                    className="form-check-label small text-muted ms-2"
                                    htmlFor="showPassword"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Mostrar senha
                                </label>
                            </div>

                            {/* Botão Entrar */}
                            <div className="d-grid mb-4">
                                <button type="submit" className="btn btn-custom-auth shadow-sm">
                                    Entrar na conta
                                </button>
                            </div>

                            {/* Link de Registro */}
                            <div className="text-center pt-2">
                                <p className="mb-0 small text-muted">
                                    Não possui uma conta?{' '}
                                    <Link to="/cadastro" className="auth-link ms-1">
                                        Criar conta
                                    </Link>
                                </p>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;