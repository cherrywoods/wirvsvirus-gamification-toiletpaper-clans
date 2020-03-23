import database from '@react-native-firebase/database';
import functions from '@react-native-firebase/functions';

/**
 * Mirrors the firebase data model.
 * Properties are updated when data in the firebase changes.
 * change listeners to properties can be registered using on()
 */
class FirebaseModel {

    // MARK: singleton
    static instance() {
        if (!FirebaseModel._isInstantiated) {
            FirebaseModel._inst = new FirebaseModel();
            FirebaseModel._isInstantiated = true;
        }
        return FirebaseModel._inst;
    }

    constructor() {
        // const firebaseConfig = {
        //     apiKey: 'AIzaSyADJaKzQkiHVAlJsjEVijQA7vU81ltyxTs',
        //     authDomain: 'wirvsvirus-toiletpaper.firebaseapp.com',
        //     databaseURL: 'https://wirvsvirus-toiletpaper.firebaseio.com/',
        //     projectId: 'wirvsvirus-toiletpaper',
        //     storageBucket: 'wirvsvirus-toiletpaper.appspot.com',
        //     messagingSenderId: '922995692187',
        //     appId: '1:922995692187:web:f98db1f5db979682e5ec3e',
        //     measurementId: 'G-SCVEE4EEG5',
        // };

        // if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);
        // }

        // MARK: simple properties

        this.userId = null;
        this.userName = null;
        this.userAtHome = null;
        this.teamId = null;
        this.teamName = null;
        this.teamAllAtHome = null;
        this.teamToiletpaper = null;
        this.teamDisinfectant = null;
        // map of members by userIds
        this.teamMembers = new Map();
        /**
         * {
         *   leaderboard: array of {name:, score:},
         *   ownTeamRank:,
         * }
         */
        this.leaderboard = null;

        // MARK: listeners
        this.listers = new Map();
        this.listers.set('userId', [(newUserId) => { this.userId = newUserId; }]);
        this.listers.set('userName', [(newUserName) => { this.userName = newUserName; }]);
        this.listers.set('userAtHome', [(newValue) => { this.userAtHome = newValue; }]);
        this.listers.set('teamId', [
            (newTeamId) => { this.teamId = newTeamId; },
            (newTeamId) => {this.setupTeam(newTeamId); },
        ]);
        this.listers.set('teamName', [(newTeamName) => {this.teamName = newTeamName; }]);
        this.listers.set('teamAllAtHome', [(newValue) => { this.teamAllAtHome = newValue; }]);
        this.listers.set('teamToiletpaper', [(newValue) => { this.teamToiletpaper = newValue; }]);
        this.listers.set('teamDisinfectant', [(newValue) => { this.teamDisinfectant = newValue; }]);
        this.listers.set('teamMembers', [
            (newValue) => { this.teamMembers = newValue; },
        ]);
        this.listers.set('leaderboard', [(newValue) => { this.leaderboard = newValue }]);
    }

    /// register a new listener. you can register listeners for all properties by their textual names
    on(eventKey, listener) {
        var ls = this.listers.get(eventKey);
        if (!ls) {
            throw 'invalid key to register listener on FirebaseModel';
        }
        ls.push(listener);
        this.listers.set(eventKey, ls);
    }

    // remove a registered listener
    off(eventKey, listener) {
        var ls = this.listers.get(eventKey);
        if (!ls) {
            throw 'invalid key to remove listener on FirebaseModel';
        }
        let i = ls.indexOf(listener);
        ls.splice(i, Math.max(i, 0));
        this.listers.set(eventKey, ls);
    }

    trigger(eventKey, newValue) {
        this.listers.get(eventKey).forEach(listener => listener(newValue));
    }

    /// login with the given user id
    loginAsUser(userId) {
        this.trigger('userId', userId);
        this.updateHomeStatus();

        database().ref('User/' + userId + '/name').on('value', (snapshot) => {
            this.trigger('userName', snapshot.val());
        });
        database().ref('User/' + userId + '/athome').on('value', (snapshot) => {
            this.trigger('userAtHome', snapshot.val());
        });

        // TODO: optimally request index of own team and get only the first 10
        database().ref("Team/").orderByChild('toiletpaper').on('value', (teams) => {
            var teamStats = [];
            var ownTeamStats = null;
            teams.forEach( (team) => {
                const teamKey = team.key;
                teamStats.push({
                    "teamId": teamKey,
                    "name": teams.child(teamKey + "/Name").val(),
                    "score": teams.child(teamKey + "/toiletpaper").val(),
                    });
                if (teamKey === this.teamId) {
                    ownTeamStats = teamStats[teamStats.length-1];
                }
            });
            // firebase returns ordered in ascending oder
            teamStats.reverse();
            const topTen = teamStats.slice(0, Math.min(10, teamStats.length));
            const ownTeamRank = teamStats.indexOf(ownTeamStats) + 1;
            this.trigger("leaderboard", {
                "leaderboard": topTen,
                "ownTeamRank": ownTeamRank,
            });
        });

        database().ref('User/' + userId + '/team').on('value', (snapshot) => {
                this.trigger('teamId', snapshot.val());
        });
    }

    logout() {
        [
            'userId',
            'userName',
            'userAtHome',
            'teamId',
        ].map(key => this.trigger(key, null));
    }

    setupTeam(teamId) {
        if (!teamId) {
            this.teamName = null;
            this.teamDisinfectant = null;
            this.teamAllAtHome = null;
            this.teamToiletpaper = null;
            this.teamMembers = new Map();
            return;
        }

        database().ref('Team/' + teamId + '/name').on('value', (snapshot) => {
            this.trigger('teamName', snapshot.val());
        });

        database().ref('Team/' + teamId + '/disinfectant').on('value', (snapshot) => {
            this.trigger('teamDisinfectant', snapshot.val());
        });

        database().ref('Team/' + teamId + '/allathome').on('value', (snapshot) => {
            this.trigger('teamAllAtHome', snapshot.val());
        });

        database().ref("Team/"+teamId+"/toiletpaper").on('value', (snapshot) => {
            this.trigger("teamToiletpaper", snapshot.val());
        });

        database().ref("Team/"+teamId+"/members").on('value', (snapshot) => {
            const memberIds = snapshot.val();
            const oldMemberIds = Array.from(this.teamMembers.keys());

            const memberCallback = (_snapshot) => {
                const value = _snapshot.val();
                const newMembers = new Map(this.teamMembers);
                newMembers.set(_snapshot.key, value);
                this.trigger('teamMembers', newMembers);
            };

            // turn listening off of removed members and remove from teamMembers
            const newMembers = new Map(this.teamMembers);
            for (const oldMemberId of oldMemberIds) {
                database().ref('User/' + oldMemberId).off('value', memberCallback);
                newMembers.delete(oldMemberId);
            }
            this.trigger('teamMembers', newMembers);

            // call of memberCallback following to on will setup the new members
            for (const memberId of memberIds) {
                database().ref('User/' + memberId).on('value', memberCallback);
            }

        });
    }

    updateHomeStatus() {
        if (!this.userId) {
            return;
        }
        functions().httpsCallable('updateHomeStatus')({
            home: true,
        });
    }

}

FirebaseModel._isInstantiated = false;
FirebaseModel._inst = null;

export default FirebaseModel;
