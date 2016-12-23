export class Constant {
    public static get apiEndpoint(): string { return 'http://localhost:21561/api'; }
    // public static get apiEndpoint(): string { return 'http://localhost/InternetAuctionApi/api'; }
    public static get appPath(): string { return './'; }
    //public static get appPath(): string { return './InternetAuction/'; }
    public static get currency() { return { 1: 'бел.руб.', 2: '$', 3: '€' }; }
}
