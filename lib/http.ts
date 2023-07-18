import axios from 'axios';

export class HackathonHttpHandler {
    static async get(hackIdOrSlug: string) {}
    static async getAll(query: { limit?: number } = { limit: 10 }) {}
    static async create() {}
    static async update() {}
    static async delete() {}
}
export class UserHttpHandler {
    static async joinHackathon() {}
}
