export interface User {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  bio?: string | null;
  jobTitle?: string | null;
  interest?: string | null;
  skills?: string | null;
  avatar?: string | null;
  role?: USER_ROLE;
  username?: string | null;
  location?: string | null;
  submissions?: Submission[];
}

export interface Submission {
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
  toolsUsed: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  hackathons: Hackathon;
  hackathonId: string;
  isWinner?: boolean;
}

export interface Hackathon {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  startDate: Date;
  endDate: Date;
  slug: string;
  category?: HackathonCategory[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  price: number;
  currency: string;
  currencyCode?: string | null;
  //   participants?: HackathonParticipant[];
  //   submissions?: Submission[];
  type?: HACKATHON_TYPE;
  status?: HACKATHON_STATUS;
  judges: HackathonJudges[];
}
export type NewHackathon = Pick<
  Hackathon,
  | "currency"
  | "currencyCode"
  | "description"
  | "price"
  | "startDate"
  | "status"
  | "subtitle"
  | "title"
  | "type"
  | "userId"
  | "endDate"
>
export interface HackathonJudges {
  id: string;
  hackathonId: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;
}
export type NewHackathonJudges = Pick<
  HackathonJudges,
  "avatar" | "bio" | "name"
>;

export interface HackathonCategory {
  id: string;
  title: string;
  hackathons: Hackathon[];
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HackathonParticipant {
  id: string;
  hackathons: Hackathon;
  hackathonId: string;
  user: User;
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
  PUBLISHED = "published",
  ONGOING = "ongoing",
  ENDED = "ended",
  DRAFT = "draft",
}

export enum HACKATHON_TYPE {
  PUBLIC = "public",
  PRIVATE = "private",
}
