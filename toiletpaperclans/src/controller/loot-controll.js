import * as firebase from "firebase/app";
import "firebase/database";
import * as database from '_utilities/database.js'

var lootableAnnounced = false;
var currentlyLooting = false;
var currentlyAllAtHome = true;
var currentToiletpaperScore = 0;

/**
 * toiletpaperCountdown updates the time remaining counter ui type: () => ()
 * same with disinfectantCountdown
 * lootStartListener is called when a loot is available and lootCancelListener when it gets unavailable. 
 * lootStartListener gets a loot object from the Lootable table, 
 * lootCancelListener is called without parameters.
 */
export function start(teamId, lootStartListener, lootCancelListener) {

    database.registerToiletpaperListener(teamId, (toiletpaperScore) => {
        currentToiletpaperScore = toiletpaperScore;
    });

    // as soon as a team is not fully homebased 
    // every five minutes there is a certain chance that
    // the team is published as lootable
    var lootableTimer;
    firebase.database().ref('Team/' + teamId + '/allathome').on('value', (snapshot) => {

        currentlyAllAtHome = snapshot.val();

        if (!snapshot.val()) {
            lootableTimer = setInterval(
                () => {
                    if (!lootableAnnounced) {
                        lootableAnnounced = declareLootable(teamId)
                    }
                },
                300000
            );
        } else {
            if (lootableTimer) {
                clearInterval(lootableTimer);
                // remove lootable declare if present
                firebase.database().ref('Lootable/' + teamId).remove();
                lootableAnnounced = false;
            }
        }
    });

    firebase.database().ref('Lootable').on('value', (snapshot) => {
        // filter all that are not currently trying to be looted
        if (!currentlyAllAtHome || currentlyLooting) {
            return;
        }
        
        var declaredTargets = snapshot.val()
        for (var targetTeamId in declaredTargets) {
           
            if (!declaredTargets[targetTeamId]) {
                // decide if loot
                var change = Math.random();
                if (chance < 0.3) {
                    // LOOOOOOOOT!!!!!!
                    firebase.database().ref('Lootable/' + targetTeamId).transaction(
                        (value) => {
                            if (value) {
                                if (!value.looting) {
                                    value.looting = true;
                                    return value;
                                } 
                            }
                            // if value is null or true, forget it
                            // in case of true, other party was quicker to declare loot
                            return;
                        }, (error, commited, snapshot) => {
                            if (commited) {
                                // we are looting
                                currentlyLooting = true;
                                lootStartListener(snapshot.val());
                                // add cancelation listener
                                firebase.database().ref('Lootable/' + targetTeamId).on( 
                                    (snapshot) => {
                                        if (!snapshot && currentlyLooting) {
                                            // lootable entry was removed
                                            lootCancelListener();
                                            firebase.database().ref('Lootable/' + targetTeamId).off();
                                        }
                                });
                            } // else: aborted looting
                    })
                }
            }
        }
    });

}

/** 
 * call if looting succeeded on this side (all responded to push notifification)
 * this function updates the toiletpaper scores
 */
export function lootingSucceeded(teamId, target) {
    // take loot from target team members and give it to own team members
    firebase.database().ref('Team/'+ target.key).once('value', (snapshot) => {
        const targetMembers = snapshot.val().Member.split(",");
        var targetMembersToiletPaperLoss = Array(targetMembers.length).fill(0);
        for (const index in targetMembers) {
            firebase.database().ref('User/' + targetMembers[index] + "/toiletpaper").transaction((toiletpaper) => {
                const newToiletpaper = toiletpaper * 0.9;
                targetMembersToiletPaperLoss[index] = toiletpaper - newToiletpaper;
                return newToiletpaper;
            }, (error) => {
                if (!error) {
                    firebase.database().ref('Team/'+ teamId).once('value', (snapshot) => {
                        const members = snapshot.val().Member.split(",");
                        const perMemberShare = targetMembersToiletPaperLoss[index] / members.length;
                        for (const memIndex in members) {
                            firebase.database().ref('User/' + members[index] + "/toiletpaper").transaction((toiletpaper) => {
                                toiletpaper += perMemberShare;
                                return toiletpaper;
                            });
                        }
                    });
                }
            });
        }
    });
    // reset and remove entry in database
    lootingFailed(target)
}

/** 
 * call if looting failed on this side
 */
export function lootingFailed(target) {
    currentlyLooting = false;
    firebase.database().ref('Lootable' + target.key).remove();
}

function declareLootable(teamId) {
    var chance = Math.random();
    if (chance < 0.3) {
        // declare lootable
        firebase.database().ref('Lootable').child(teamId).setValue(
            {
                looting: false,
            })
        // looting party has to remove entry
        return true;
    } else {
        return false;
    }
}