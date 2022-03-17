import bcrypt from 'bcryptjs';

class Crypto {
    async encrypt(password:string) {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt);
        return hash;
    }

    async compare(password:string,hash?:string) {
        var cam:any = hash
        return await bcrypt.compare(password, cam);
    }
}

export default Crypto;