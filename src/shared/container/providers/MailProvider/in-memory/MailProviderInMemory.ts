import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
    private message = [];

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path,
        });
    }
}

export { MailProviderInMemory };
