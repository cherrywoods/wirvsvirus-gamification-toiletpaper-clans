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
        this.metaDropTimestampKeys = [
            'lastToiletpaperDrop',
            'lastDisinfectantDrop',
            'upcomingToiletpaperDrop',
            'upcomingDisinfectantDrop',
        ];

        // MARK: simple properties
        this.lastToiletpaperDrop = null;
        this.lastDisinfectantDrop = null;
        this.upcomingToiletpaperDrop = null;
        this.upcomingDisinfectantDrop = null;

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
        this.listers.set('upcomingToiletpaperDrop', [newTimestamp => { this.upcomingToiletpaperDrop = newTimestamp; }]);
        this.listers.set('upcomingDisinfectantDrop', [newTimestamp => { this.upcomingDisinfectantDrop = newTimestamp; }]);
        this.listers.set('lastToiletpaperDrop', [newTimestamp => { this.lastToiletpaperDrop = newTimestamp; }]);
        this.listers.set('lastDisinfectantDrop', [newTimestamp => { this.lastDisinfectantDrop = newTimestamp; }]);

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
        database().ref('User/' + userId + '/lastAtHomeTime').on('value', (snapshot) => {
            this.trigger('userAtHome', snapshot.val());
        });

        // TODO: optimally request index of own team and get only the first 10
        database().ref('Team').orderByChild('toiletpaper').on('value', (teams) => {
            var teamStats = [];
            var ownTeamStats = null;
            teams.forEach( (team) => {
                const teamKey = team.key;
                teamStats.push({
                    "teamId": teamKey,
                    "name": teams.child(teamKey + "/name").val(),
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

        this.registerMetaListeners();
    }

    logout() {
        if (!this.userId) {
            return;
        }
        [
            'userId',
            'userName',
            'userAtHome',
            'teamId',
        ].map(key => this.trigger(key, null));

        const userId = this.userId;
        database().ref('User/' + userId + '/name').off('value');
        database().ref('User/' + userId + '/lastAtHomeTime').off('value');
        database().ref('User/' + userId + '/team').off('value');

        database().ref('Team').orderByChild('toiletpaper').off('value');

        this.unregisterMetaListeners();
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

    registerMetaListeners() {
        this.metaDropTimestampKeys.forEach(
            key => database().ref('Meta/dropTimestamps').child(key).on('value', (snapshot) => {
                this.trigger(key, snapshot.val());
            })
        );
    }

}

FirebaseModel._isInstantiated = false;
FirebaseModel._inst = null;

export default FirebaseModel;
