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

  // MARK: construction

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
    this.isUserTeamLeader = null;
    this.teamAllAtHome = null;
    this.teamToiletpaper = null;
    this.teamDisinfectant = null;
    /**
     * Map of members by userIds
     * additionally to the firebase values stored the entries also contain a atHome value 
     * beeing true if the users is currently at home
     */
    this.teamMembers = new Map();
    /**
      * {
      *   leaderboard: array of {name:, score:},
      *   ownTeamRank:,
      * }
      */
    this.leaderboardTopTen = null;
    this.leaderboard = null;

    // MARK: listeners
    this.listers = new Map();
    this.listers.set('upcomingToiletpaperDrop', [newTimestamp => { this.upcomingToiletpaperDrop = newTimestamp; }]);
    this.listers.set('upcomingDisinfectantDrop', [newTimestamp => { this.upcomingDisinfectantDrop = newTimestamp; }]);
    this.listers.set('lastToiletpaperDrop', [newTimestamp => { this.lastToiletpaperDrop = newTimestamp; }]);
    this.listers.set('lastDisinfectantDrop', [newTimestamp => { this.lastDisinfectantDrop = newTimestamp; }]);

    this.listers.set('userId', [
      (newUserId) => { this.userId = newUserId; },
      () => this.setupLeaderboard(),
    ]);
    this.listers.set('userName', [(newUserName) => { this.userName = newUserName; }]);
    this.listers.set('userAtHome', [(newValue) => { this.userAtHome = newValue; }]);
    this.listers.set('teamId', [
      (newTeamId) => { this.teamId = newTeamId; },
      (newTeamId) => {this.setupTeam(newTeamId); },
    ]);
    this.listers.set('teamName', [(newTeamName) => {this.teamName = newTeamName; }]);
    this.listers.set('isUserTeamLeader', [(newValue) => {this.isUserTeamLeader = newValue; }]);
    this.listers.set('teamAllAtHome', [(newValue) => { this.teamAllAtHome = newValue; }]);
    this.listers.set('teamToiletpaper', [
      (newValue) => { this.teamToiletpaper = newValue; },
      () => this.setupLeaderboard(),
    ]);
    this.listers.set('teamDisinfectant', [(newValue) => { this.teamDisinfectant = newValue; }]);
    this.listers.set('teamMembers', [(newValue) => { this.teamMembers = newValue; }]);

    this.listers.set('leaderboardTopTen', [
      (newValue) => { this.leaderboardTopTen = newValue; },
      () => this.setupLeaderboard(),
    ]);
    this.listers.set('leaderboard', [(newValue) => { this.leaderboard = newValue; }]);
  }

  // MARK: events/listeners

  /// Register a new listener. you can register listeners for all properties by their textual names
  on(eventKey, listener) {
    var ls = this.listers.get(eventKey);
    if (!ls) {
      throw 'invalid key to register listener on FirebaseModel';
    }
    ls.push(listener);
    this.listers.set(eventKey, ls);
  }

  // Remove a registered listener
  off(eventKey, listener) {
    var ls = this.listers.get(eventKey);
    if (!ls) {
      throw 'invalid key to remove listener on FirebaseModel';
    }
    let i = ls.indexOf(listener);
    ls.splice(i, Math.max(i, 0));
    this.listers.set(eventKey, ls);
  }

  // Notify listeners of eventKey that a value has changed
  trigger(eventKey, newValue) {
    this.listers.get(eventKey).forEach(listener => listener(newValue));
  }

  // MARK: functionality

  /// Login with the given user id
  loginAsUser(userId) {
    this.trigger('userId', userId);
    this.updateHomeStatus();

    database().ref('User/' + userId + '/name').on('value', (snapshot) => {
      this.trigger('userName', snapshot.val());
    });
    database().ref('User/' + userId + '/lastAtHomeTime').on('value', (snapshot) => {
      this.trigger('userAtHome', snapshot.val());
    });

    database().ref('User/' + userId + '/team').on('value', (snapshot) => {
      this.trigger('teamId', snapshot.val());
    });

    // TODO: optimally request index of own team and get only the first 10
    database().ref('Team').orderByChild('toiletpaper').limitToLast(10).on('value', (teams) => {
      const teamsArray = [];
      teams.forEach(teamSnapshot => {
        const team = teamSnapshot.val();
        teamsArray.push({
          key: teamSnapshot.key,
          name: team.name,
          toiletpaper: team.toiletpaper,
        });
      });
      this.trigger('leaderboardTopTen', teamsArray);
    });

    this.registerMetaListeners();
  }

  async setupLeaderboard() {
    if (!this.leaderboardTopTen) {
      return;
    }
    const board = [...this.leaderboardTopTen];
    let ownTeamIndex;
    const ownTeamLeaderboardIndex = board.findIndex(team => team.key === this.teamId);
    const ownScoreLeaderboardIndex = board.findIndex(team => team.toiletpaper === this.teamToiletpaper);
    if (ownTeamLeaderboardIndex !== -1) {
      console.log('id');
      // Board is reversed, therefore 9 - index will be correct index in the end
      ownTeamIndex = 9 - ownTeamLeaderboardIndex;
    } else if (ownScoreLeaderboardIndex !== -1) {
      console.log('score');
      board.splice(ownScoreLeaderboardIndex + 1, 0, { key: this.teamId });
      board.shift();

      // Board is reversed, therefore 9 - index will be correct index in the end
      ownTeamIndex = 9 - ownScoreLeaderboardIndex;
    } else if (this.teamToiletpaper) {
      console.log('loading');
      const snapshot = await database().ref('Team').orderByChild('toiletpaper').startAt(this.teamToiletpaper).once('value');
      ownTeamIndex = snapshot.numChildren();
      let previousVal = this.teamToiletpaper;
      snapshot.forEach(teamSnapshot => {
        const curVal = teamSnapshot.val().toiletpaper;
        if (curVal === previousVal) {
          ownTeamIndex--;
        } else {
          previousVal = curVal;
        }
      });
    }

    this.trigger(
      'leaderboard',
      {
        topTen: board.reverse(),
        ownTeamIndex,
      }
    );
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

    database().ref('Team/' + teamId + '/leader').on('value', (snapshot) => {
      const newIsUnserTeamLeader = snapshot.val() === this.userId;
      if (this.isUserTeamLeader !== newIsUnserTeamLeader) {
        this.trigger('isUserTeamLeader', newIsUnserTeamLeader);
      }
    });

    database().ref('Team/' + teamId + '/disinfectant').on('value', (snapshot) => {
      this.trigger('teamDisinfectant', snapshot.val());
    });

    database().ref('Team/' + teamId + '/allathome').on('value', (snapshot) => {
      this.trigger('teamAllAtHome', snapshot.val());
    });

    database().ref('Team/' + teamId + '/toiletpaper').on('value', (snapshot) => {
      this.trigger('teamToiletpaper', snapshot.val());
    });

    database().ref('Team/' + teamId + '/members').on('value', (snapshot) => {
      const memberIds = snapshot.val();
      const oldMemberIds = Array.from(this.teamMembers.keys());

      const memberCallback = (_snapshot) => {
        var value = _snapshot.val();
        value.atHome = value.lastStatus === value.lastAtHomeTime;
        const newMembers = new Map(this.teamMembers);
        newMembers.set(_snapshot.key, value);
        this.trigger('teamMembers', newMembers);
      };

      // Turn listening off of removed members and remove from teamMembers
      const newMembers = new Map(this.teamMembers);
      for (const oldMemberId of oldMemberIds) {
        database().ref('User/' + oldMemberId).off('value', memberCallback);
        newMembers.delete(oldMemberId);
      }
      this.trigger('teamMembers', newMembers);

      // Call of memberCallback following to on will setup the new members
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

  unregisterMetaListeners() {
    this.metaDropTimestampKeys.forEach(
      key => database().ref('Meta/dropTimestamps').child(key).off('value')
    );
  }

}

FirebaseModel._isInstantiated = false;
FirebaseModel._inst = null;

export default FirebaseModel;
