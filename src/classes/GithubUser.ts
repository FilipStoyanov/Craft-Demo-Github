import { GitUser } from "../interfaces";

export class GithubUser {
  private userData?: GitUser;
  constructor(data?: GitUser) {
    this.userData = data;
  }

  getUsername(): string | undefined {
    if (this.userData) {
      return this.userData.login;
    }
    return "";
  }

  getUserData(): GitUser | null{
    if (this.userData) {
      return this.userData;
    }
    return null;
  }
}