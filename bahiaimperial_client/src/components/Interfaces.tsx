export const bankAccountUrl = "/EventHorizon_API/api/BankAccount"
export const companyUrl = "/EventHorizon_API/api/Company";
export const personUrl = "/EventHorizon_API/api/Person";
export const userUrl = "/EventHorizon_API/api/User";

export interface Company {
    cnpj: string;
    fantasyName: string;
    monthlyIncome: number;
    id: number;
    userId: number;
}

export interface Client {
    birthDate: Date;
    cpf: string;
    fullName: string;
    salary: number;
    id: number;
    userId: number;
}

export interface Profile {
    documentId: string;
    name: string;
    type: 'PF' | 'PJ';
    ownerId: number;
    userId: number;
}

export interface UserPayload { email: string };

export interface CBankAccount {
    ownerId: number;
    ownerMonthlyIncome: number;
    category: string;
}

export interface BankAccount {
    ownerId: number;
    balance: number;
    // loanLimit: number;
    // loanDebt: number;
    category: string;
}