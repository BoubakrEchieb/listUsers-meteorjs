import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const userSchema = new SimpleSchema({
    username: {
        type: String,
        optional: false,
        label: 'Username:'
    },
    emails: {
        type: [Object],
        optional: false,
        label: 'Adresses Email'
    },
    'emails.$.address': {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'Adresse'
    },
    'emails.$.verified': {
        type: Boolean,
        optional: true,
        autoform: {
            omit: true
        }
    },
    password: {
        type: String,
        optional: false,
        label: 'Password:',
        autoform: {
            afFieldInput:{
                type: 'password'
            }
        }
    },
    confirm: {
        type: String,
        optional: false,
        label: 'Confirm password',
        autoform: {
            afFieldInput:{
                type: 'password'
            }
        },
        custom(){
            if(this.value !== this.field('password').value){
                return new Error('verify password');
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else {
                this.unset();
            }
        },
        autoform: {
            omit: true
        }
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform:{
            omit: true
        }
    }
});

export const Users = Meteor.users;

Users.allow({
    insert() {
        return false;
    },
    remove() {
        return false;
    },
    update() {
        return false;
    }
});

Users.deny({
    insert() {
        return false;
    },
    remove() {
        return false;
    },
    update() {
        return false;
    }
});

