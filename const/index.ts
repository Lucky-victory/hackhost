import { ISODateString, DefaultUser } from 'next-auth';

type OmitManyToMany<T> = Omit<
    T,
    | 'interest'
    | 'skills'
    | 'toolsUsed'
    | 'tags'
    | 'participants'
    | 'projects'
    | 'judges'
    | 'hackathon'
    | 'user'
>;
export interface UserSess extends DefaultUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: keyof typeof USER_ROLE;
    id: string;
    username: string | null;
}

declare global {
    interface DefaultSession {
        user?: UserSess;
        expires: ISODateString;
    }
}
export interface User {
    id: string;
    name: string;
    email: string;
    password?: string | null;
    createdAt: Date;
    updatedAt: Date;
    bio?: string | null;
    jobTitle?: string | null;
    avatar?: string | null;
    banner?: string | null;
    role: keyof typeof USER_ROLE;
    username?: string | null;
    location?: string | null;
    authType: keyof typeof USER_AUTH_TYPE;
    interest: UserInterest[];
    skills: UserSkills[];
    projects: Project[];
    hackathon: Hackathon[];
}
export interface UserCreate
    extends Pick<
        User,
        | 'authType'
        | 'avatar'
        | 'email'
        | 'name'
        | 'role'
        | 'password'
        | 'username'
    > {
    id?: string;
}

export interface UserInterest {
    id: string;
    name: string;
    user?: User | null;
    userId: string;
}

export interface UserSkills {
    id: string;
    name: string;
    user?: User | null;
    userId: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    screenshotUrl: string;
    repoUrl: string;
    demoUrl: string;
    fileUrl: string;
    user: User;
    slug: string;
    category?: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    hackathon: Hackathon;
    hackathonId: string;
    isWinner: boolean;
    status?: keyof typeof PROJECT_STATUS;
    toolsUsed: ProjectToolsUsed[];
}
export interface ProjectCreate
    extends Omit<
        Project,
        | 'user'
        | 'toolsUsed'
        | 'createdAt'
        | 'updatedAt'
        | 'userId'
        | 'id'
        | 'hackathon'
        | 'hackathonId'
    > {
    toolsUsed: Pick<ProjectToolsUsed, 'name'>[];
}
export interface ProjectToolsUsed {
    id: string;
    name: string;
}

export interface Hackathon {
    id: string;
    title: string;
    subtitle?: string | null;
    description: string;
    startDate: Date;
    endDate: Date;
    user?: User;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    price: number;
    currency: string;
    currencyCode?: string | null;
    type?: keyof typeof HACKATHON_TYPE | null;
    status?: keyof typeof HACKATHON_STATUS | null;
    subStatus?: keyof typeof HACKATHON_SUB_STATUS | null;
    _count?: {
        projects?: number;
        participants: number;
    };
}

export type WhereFilter<T = Hackathon> = {
    [key in keyof T]?: T[key]; // Use mapped object type to specify the filter type
};
export type OrderByFilter<T = Hackathon> = {
    [key in keyof T]?: 'desc' | 'asc'; // Use mapped object type to specify the filter type
};
export type QueryFilter = {
    limit?: number;
    offset?: number;
    filterType?: FilterType;
    where?: WhereFilter;
    orderBy?: OrderByFilter;
};
export type FilterType =
    | 'equals'
    | 'in'
    | 'notIn'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'not';

export interface HackathonResult extends Hackathon {
    tags?: HackathonTags[];
    judges: HackathonJudges[];

    participants?: HackathonParticipant[];
    projects: Project[];
}

export interface HackathonCreate
    extends Omit<
        Hackathon,
        | 'id'
        | 'tags'
        | 'judges'
        | 'slug'
        | 'createdAt'
        | 'updatedAt'
        | '_count'
        | 'userId'
    > {
    judges: Pick<HackathonJudges, 'avatar' | 'bio' | 'name'>[];
    tags?: HackathonTagCreate[];
}

export interface HackathonJudges {
    id: string;
    hackathonId: string;
    name: string;
    bio?: string | null;
    avatar?: string | null;
    hackathon?: Hackathon;
}

export interface HackathonTags {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface HackathonTagCreate extends Pick<HackathonTags, 'name'> {}
export interface HackathonParticipant {
    id: string;
    hackathon?: Hackathon;
    hackathonId: string;
    user?: User;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum USER_ROLE {
    BASIC = 'BASIC',
    ADMIN = 'ADMIN',
    MOD = 'MOD',
}

export enum HACKATHON_STATUS {
    PUBLISHED = 'PUBLISHED',
    DRAFT = 'DRAFT',
}
export enum HACKATHON_SUB_STATUS {
    ONGOING = 'ONGOING',
    ENDED = 'ENDED',
    UPCOMING = 'UPCOMING',
}
export enum PROJECT_STATUS {
    PUBLISHED = 'PUBLISHED',
    DRAFT = 'DRAFT',
}

export enum HACKATHON_TYPE {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export enum USER_AUTH_TYPE {
    CREDENTIALS = 'CREDENTIALS',
    GITHUB = 'GITHUB',
    GOOGLE = 'GOOGLE',
}
