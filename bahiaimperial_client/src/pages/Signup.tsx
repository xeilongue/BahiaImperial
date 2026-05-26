import React, { useState } from 'react';
import { useNavigate, Link } from "react-router";

function Signup() {

    const [cpfCnpj, setCpfCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const apiUrl = 'BahiaImperial_API/api/User';

    const handleRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        const newUser = {
            cpf_Cnpj: cpfCnpj,
            password: password
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            // Trata a resposta mesmo se não for um JSON perfeito ou se vier com erro
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                alert("Usuário cadastrado com sucesso. Efetue o login!");
                navigate('/');
            } else {
                alert(data.message || "Erro ao cadastrar usuário.");
            }
        } catch (error) {
            alert("Erro de conexão com o servidor.");
            console.error(error);
        }
    };

    return (
        <div className="bg-dark d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-4">

                        <form onSubmit={handleRegisterUser} className="bg-white p-4 p-md-5 rounded-4 shadow-lg d-flex flex-column">

                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Cadastro</h2>
                            </div>

                            {/* Campo Usuário (CPF/CNPJ) */}
                            <div className="mb-3">
                                <label htmlFor="InputEmailRegister" className="form-label fw-semibold">Usuário</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="InputEmailRegister"
                                    placeholder="CPF ou CNPJ"
                                    value={cpfCnpj}
                                    onChange={(e) => setCpfCnpj(e.target.value)}
                                    required
                                />
                                <div id="emailHelp" className="form-text mt-2">
                                    Cpf (Pessoa física) / Cnpj (Pessoa Jurídica).
                                </div>
                            </div>

                            {/* Campo Senha */}
                            <div className="mb-3">
                                <label htmlFor="InputPasswordRegister" className="form-label fw-semibold">Senha</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="InputPasswordRegister"
                                    placeholder="Crie uma senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Switch de Mostrar Senha */}
                            <div className="form-check form-switch mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <label className="form-check-label small text-muted" htmlFor="showPassword" style={{ cursor: 'pointer' }}>
                                    Mostrar senha
                                </label>
                            </div>

                            {/* Botão de Envio */}
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                                    Registrar
                                </button>
                            </div>

                            {/* Link para o Login */}
                            <div className="text-center">
                                <p className="mb-0 small">
                                    Já possui uma conta?{' '}
                                    <Link to="/" className="link-danger text-decoration-none fw-bold">
                                        Login
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