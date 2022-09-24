import { Contact, GitUser } from "../interfaces";
import { addNewContact, updateContactFromFreshDesk } from "../fetch";
export class FreshDeskUser {
    private contacts: Array<Contact>;

    constructor(newContacts: Array<Contact>) {
        this.contacts = [...newContacts];
    }

    getName(contactIndex: number): string | undefined {
        return this.contacts[contactIndex].name;
    }
    getContact(name: string): Contact | null {
        for (let i = 0; i < this.contacts.length; ++i) {
            if (this.getName(i) === name) {
                return this.contacts[i];
            }
        }
        return null;
    }

    hasContactWithThisName(name: string) {
        for (let i = 0; i < this.contacts.length; ++i) {
            if (this.getName(i) === name) {
                return true;
            }
        }
        return false;
    }

    updateFreshDeskContact(githubUser:GitUser, subdomain: string) {
        let updatedContact:Contact = {};
        updatedContact.email = githubUser.email;
        updatedContact.name = githubUser.name;
        updatedContact.company_id = githubUser.company;
        updatedContact.description = githubUser.bio;


        // These fields are always required and I can not set them from github user because github user doesn't have these fields 
        if(!updatedContact.email) {
            updatedContact.email  = `filipstoianov${Math.random()*1000}@gmail.com`;
        }
        if(!updatedContact.twitter_id) {
            updatedContact.twitter_id  = `121231131${Math.random()*1000}`;
        }
        if(!updatedContact.unique_external_id) {
            updatedContact.unique_external_id  = `141241${Math.random()*1000}4101`;
        }
        if(!updatedContact.mobile) {
            updatedContact.mobile  = '359887731004';
        } 

        if(githubUser.name && this.hasContactWithThisName(githubUser.name)) {
            const contact: Contact | null = this.getContact(githubUser.name);
            if(contact) {
                updateContactFromFreshDesk(updatedContact, subdomain, contact.id, process.env.FRESHDESK_TOKEN).then((data) => {
                    console.log('Updated contact in FreshDesk');
                }).catch((error) => {
                    console.log('Something went wrong');
                });
            }
        }else {
               addNewContact(updatedContact,subdomain, process.env.FRESHDESK_TOKEN).then((data) => {
                console.log('Created contact in FreshDesk');
               }).catch((error) => {
                   console.log('Something went wrong');
               });
        }
    }
}
