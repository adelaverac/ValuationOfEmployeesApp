import { Company } from '../company/company';

export interface Employee {
    name: string;
    lastName: string;
    fullName: string;
    jobOccupation: string;
    urlImage: string;
    company: Company;
}