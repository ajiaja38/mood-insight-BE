export declare class PasswordConfService {
    hashPassword(password: string): Promise<string>;
    comparePassword(passwordPayload: string, userPassword: string): Promise<void>;
}
