export class Message {
    public id: string;
    public name: string;
    public from: string;
    public update_to: string;
    public subject: any = {};
    public text: any = {};
    public html: any = {};
    public status: string;
}
