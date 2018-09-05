const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
          },
          required: [true, 'User email address required']
    }
});

module.exports = {User};