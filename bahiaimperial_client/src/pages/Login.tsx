import React, { useState } from 'react';
import { useNavigate, Link } from "react-router";

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
        <div className="bg-dark d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-4">

                        <form onSubmit={handleLogin} className="bg-white p-4 p-md-5 rounded-4 shadow-lg">

                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Login</h2>
                            </div>

                            {/* Input de Usuário */}
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label fw-semibold">Usuário</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="InputEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="CPF ou CNPJ"
                                    value={cpfCnpj}
                                    onChange={(e) => setCpfCnpj(e.target.value)}
                                    required
                                />
                                <div id="emailHelp" className="form-text mt-2">
                                    Cpf (Pessoa física) / Cnpj (Pessoa Jurídica).
                                </div>
                            </div>

                            {/* Input de Senha */}
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label fw-semibold">Senha</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="InputPassword"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Toggle Mostrar Senha */}
                            <div className="form-check form-switch mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                />
                                <label
                                    className="form-check-label small text-muted"
                                    htmlFor="showPassword"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Mostrar senha
                                </label>
                            </div>

                            {/* Botão Entrar */}
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                                    Entrar
                                </button>
                            </div>

                            {/* Link de Registro */}
                            <div className="text-center">
                                <p className="mb-0 small">
                                    Não possui uma conta?{' '}
                                    <Link to="/cadastro" className="link-danger text-decoration-none fw-bold">
                                        Registre-se
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

export default Login;