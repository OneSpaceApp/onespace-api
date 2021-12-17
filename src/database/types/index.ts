import mongoose from 'mongoose'

export interface Schemas {
    [key: string]: mongoose.Schema
}

export interface Models {
    [key: string]: mongoose.Model<mongoose.Document>
}
