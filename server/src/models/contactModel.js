import mongoose,{Types} from "mongoose";
const contactSchema=mongoose.Schema({
    fullName:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
    },
    mobileNumber:{
        type:String,
        require: true,
    },
    message:{
        type:String,
        require: true,
    },
},
{timestapps: true}
);
const contact=mongoose.model("Contact",contactSchema);
export default contact;