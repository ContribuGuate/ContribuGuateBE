import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService{

    public async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }
}