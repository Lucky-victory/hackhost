export interface User {
    id: string;
    name: string;
    email: string;
    password?: string | null;
    created_at: Date;
    updated_at: Date;
    bio?: string | null;
    job_title?: string | null;
    interest?: string | null;
    skills?: string | null;
    avatar?: string | null;
    role: USER_ROLE;
    username?: string | null;
    location?: string | null;
    submissions: Submission[];
    hackathons: Hackathon[];
    participants: HackathonParticipant[];
}

export interface Submission {
    id: string;
    title: string;
    description: string;
    screenshot_url: string;
    repo_url: string;
    demo_url: string;
    file_url: string;
    user: User;
    slug: string;
    category: string;
    tools: any;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    hackathons: Hackathon;
    hackathon_id: string;
}

export interface Hackathon {
    id: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    host: User;
    slug: string;
    category: HackathonCategory[];
    created_at: Date;
    updated_at: Date;
    user_id: string;
    total_price: number;
    participants: HackathonParticipant[];
    submissions: Submission[];
}

export interface HackathonCategory {
    id: string;
    title: string;
    hackathons: Hackathon[];
}

export interface HackathonParticipant {
    id: string;
    hackathons: Hackathon;
    hackathon_id: string;
    user: User;
    user_id: string;
}

export enum USER_ROLE {
    BASIC = 'BASIC',
    ADMIN = 'ADMIN',
    MOD = 'MOD',
}
