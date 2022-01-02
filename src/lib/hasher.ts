import bcrypt from 'bcrypt'

export async function Hash(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(pass, salt)
}

export async function Compare(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash)
}
