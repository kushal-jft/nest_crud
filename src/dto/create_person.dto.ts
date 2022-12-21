export class CreatePersonDTO {
    readonly name: string
    readonly email: string
    readonly password: string;
    isAdmin: boolean;
}