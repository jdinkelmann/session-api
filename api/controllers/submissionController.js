'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('../../credentials');

let rowsCache = null;

exports.list_all_tasks = function(req, res) {
    const spreadsheet = new GoogleSpreadsheet('1SdDHmeYeL2sZz6QqNybtU9X2JceG40iD8K-Rp-Dt104'); // Sheet ID (visible in URL)
    spreadsheet.useServiceAccountAuth(creds,(error) => {
        spreadsheet.getRows(1, function (err, rows) {

            rowsCache = transformRows(rows);
            res.json(transformRows(rows));
            res.end();
        });
    }); 
}

exports.read_a_task = function(req, res) {
    if(rowsCache) {
        res.json(getSessionFromCache(req.params.sessionId));
    } else {
        res.json({});
    }
    res.end();
}

function getSessionFromCache(sessionNumber) {
    console.log('sessionNumber: ', sessionNumber);
    return rowsCache.forEach(element => {
        

        if(element.id == sessionNumber) {
            return element
            // console.log('fond ID: ',element.id);
        }
    }) 

    return rowsCache;
}

function Session() {
    return { 
        id: '',
        title: '',
        description: '',
        presenters: [],
        length: '',
        roomType: '',
        info: ''
    }
};

function Presenter() {
    return {
        name: '',
        email: '',
        twitter: '',
        bio: ''
    }
};

function transformRows(rows) {
    return rows;
    const sessionArray = [];
    rows.forEach((element,i) => {
        const session = new Session();
        session.id = i;
        session.title = element.sessiontitle;
        session.description = element.sessiondescription;
        session.length = element.sessionlengthtype;
        session.roomType = element.requiredroomlayout;
        session.info = element.additionalinformationforreviewers;

        const person = new Presenter();
        person.name = element.name;
        person.email = element.email;
        person.twitter = element.twitterhandle;
        person.bio = element.aboutyou;

        session.presenters.push(person);
        sessionArray.push(session);

    });

    return sessionArray;
}