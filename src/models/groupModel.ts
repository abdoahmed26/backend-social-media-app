import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    groupImage:{
        type:String,
        default:"src/uploads/group.png"
    },
    description:{
        type:String,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    supervisors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

groupSchema.virtual("membersCount").get(function(){
    return this.members.length+this.supervisors.length+1;
})

export const Group = mongoose.model("Group",groupSchema)