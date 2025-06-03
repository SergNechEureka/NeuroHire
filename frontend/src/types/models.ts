// src/types/index.ts

export interface Candidate {
    candidate_id: string;
    candidate_name: string;
    email: string;
    phone: string;
    country: string;
    birth_date: string;
    native_language: string;
}

export interface CV {
    cv_id: string;
    candidate_id: string;
    filename: string;
    filetype: string | null;
    filesize: number | null;
    uploaded_at: string;
    updated_at: string | null;
    status: string;
    source: string | null;
    language: string | null;
}

export interface CVExperience {
    id: string;
    cv_id: string;
    position: string;
    company: string | null;
    industry: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    technologies: string | null;
}

export interface CVSkill {
    id: string;
    cv_id: string;
    skill_name: string;
    skill_level: string | null;
    description: string | null;
}