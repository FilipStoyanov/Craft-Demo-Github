import { Contact, GitUser } from "../interfaces";
import { addNewContact, updateContactFromFreshDesk } from "../fetch";
export class FreshDeskUser {
    private contacts: Array<Contact> = [];

    constructor(newContacts: Array<Contact>) {
        for (let i = 0; i < newContacts.length; ++i) {
            this.contacts[i] = newContacts[i];
        }
    }

    public getName(contactIndex: number): string | undefined {
        return this.contacts[contactIndex].name;
    }
    public getContact(name: string): Contact | null {
        for (let i = 0; i < this.contacts.length; ++i) {
            if (this.getName(i) === name) {
                return this.contacts[i];
            }
        }
        return null;
    }

    public hasContactWithThisName(name: string): boolean {
        for (let i = 0; i < this.contacts.length; ++i) {
            if (this.getName(i) === name) {
                return true;
            }
        }
        return false;
    }

    public updateFreshDeskContact(githubUser: GitUser, subdomain: string): void {
        let updatedContact: Contact = {};
        updatedContact.email = githubUser.email;
        updatedContact.name = githubUser.name;
        updatedContact.description = githubUser.bio;
        updatedContact.twitter_id = githubUser.twitter_username;

        if (githubUser.name && this.hasContactWithThisName(githubUser.name)) {
            const contact: Contact | null = this.getContact(githubUser.name);
            if (contact) {
                updateContactFromFreshDesk(updatedContact, subdomain, contact.id, process.env.FRESHDESK_TOKEN).then((data) => {
                    if(data.errors) {
                        console.log('Not unique field');
                        process.exit(0);
                    }
                    console.log('Updated contact in FreshDesk');
                }).catch((error: Error) => {
                    throw error;
                });
            }
        } else {
            addNewContact(updatedContact, subdomain, process.env.FRESHDESK_TOKEN).then((data) => {
                if(data.errors) {
                    console.log('Not unique field');
                    console.log(data);
                    process.exit(0);
                }else {
                    console.log('Created contact in FreshDesk');
                }
            }).catch((error: Error) => {
                throw error;
            });
        }
    }
}
