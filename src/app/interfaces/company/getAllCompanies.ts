import { Company } from './company';

export interface GetAllCompanies {
    status: string;
    total: number;
    companies: Company[];
}