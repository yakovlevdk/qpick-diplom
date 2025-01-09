const mongoose = require('mongoose')

const TypeSchema = mongoose.Schema( { 
    title: { 
       type: String,
       required: true
},
imgUrl: { 
    type: String,
    required: true
},
linkUrl: { 
    type: String,
    required: true
}
})

const Type = mongoose.model("Types", TypeSchema);

module.exports = Type;
