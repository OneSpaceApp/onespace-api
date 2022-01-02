import mongoose, { UpdateWriteOpResult } from 'mongoose'

export interface ServiceInterface {
    model: mongoose.Model<mongoose.Document>
}
export type documentData = object & { _id: string }

export class Service implements ServiceInterface {
    public model!: mongoose.Model<mongoose.Document>

    public async findOne(query: object): Promise<documentData | null> {
        return await this.model.findOne(query)
    }

    public async find(query: object): Promise<documentData[]> {
        return await this.model.find(query)
    }

    public async create(data: object): Promise<documentData> {
        return await this.model.create(data)
    }

    public async update(
        query: object,
        data: object
    ): Promise<UpdateWriteOpResult> {
        return await this.model.updateOne(query, data)
    }

    public async delete(query: object): Promise<void> {
        await this.model.deleteOne(query)
    }

    public async deleteMany(query: object): Promise<void> {
        await this.model.deleteMany(query)
    }

    public setModel(model: mongoose.Model<mongoose.Document>): void {
        this.model = model
    }
}
