type OmitManyToMany<T> = Omit<
  T,
  | "interest"
  | "skills"
  | "toolsUsed"
  | "tags"
  | "participants"
  | "projects"
  | "judges"
  | "hackathon"
  | "user"
>;

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
    "authType" | "avatar" | "email" | "name" | "role" | "password" | "username"
  > {}

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
  status?: PROJECT_STATUS;
  toolsUsed: ProjectToolsUsed[];
}
export interface ProjectCreate extends OmitManyToMany<Project> {
  toolsUsed: Pick<ProjectToolsUsed, "name">[];
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
  subStatus?:keyof typeof  HACKATHON_SUB_STATUS | null;
  _count?: {
    participants: number;
  };
}
export interface HackathonResult extends Hackathon{
  tags?: HackathonTags[];
  judges?: HackathonJudges[];
  
  participants?:HackathonParticipant[]
  projects?:Project[]
}

export interface HackathonCreate
  extends Omit<
    Hackathon,
    | "id"
    | "tags"
    | "judges"
    | "slug"
    | "createdAt"
    | "updatedAt"
    | "_count"
    | "userId"
  > {
  judges: Pick<HackathonJudges, "avatar" | "bio" | "name">[];
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
export interface HackathonTagCreate extends Pick<HackathonTags,'name'>{

}
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
  BASIC = "BASIC",
  ADMIN = "ADMIN",
  MOD = "MOD",
}

export enum HACKATHON_STATUS {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}
export enum HACKATHON_SUB_STATUS {
  ONGOING = "ONGOING",
  ENDED = "ENDED",
  UPCOMING = "UPCOMING",
}
export enum PROJECT_STATUS {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}

export enum HACKATHON_TYPE {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum USER_AUTH_TYPE {
  CREDENTIALS = "CREDENTIALS",
  GITHUB = "GITHUB",
  GOOGLE = "GOOGLE",
}
