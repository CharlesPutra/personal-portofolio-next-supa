interface IProfile {
    id: number;
    name: string;
    headline: string;
    bio: string;
    avatar_url: string;
    github_url: string;
    instagram_url: string;
    skills: string[];
}

export type {IProfile}