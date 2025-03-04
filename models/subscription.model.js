import mongoose from 'mongoose';
const subscriptionSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 5,
        maxLength: 15,
    },
    price:{
        type: Number,
        required: [true,'Subscription price is required'],
        min: [0,'price must be greater than 0'],
        max: [1000,'price must be less than 1000'],
    },
    currency: {
        type: String,
        enum:['USD','EUR','GBP','INR'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
    },
    category: {
        type: String,
        enum: ['sports','news','entertainment','lifestyle','technology','finance','political','other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required:true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active','canceled','expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator:(value) => value <= new Date(),
            message:'Start date must be in the past',
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator:function (value) {
              return  value > this.startDate;
            },
            message:'Renewal date must be in the last date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true,

    }
},{timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate){
        const renewalPeriods ={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        }

        this.renewalDate= new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+ renewalPeriods[this.frequency])                           ;
    }
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
})

const Subscription = new mongoose.model('Subscription',subscriptionSchema);
export default Subscription;