import * as firebase from "firebase/app";
import "firebase/database";
import * as database from '_utilities/database.js'

/**
 * toiletpaperCountdown updates the time remaining counter ui type: () => ()
 * same with disinfectantCountdown
 */
export function start(teamId, userId, disinfectantCountdown, toiletpaperCountdown) {

    var disinfectantTimer = null;
    var disinfectantCountdownUITimer = null
    firebase.database().ref('Team/' + teamId + '/allathome').on('value', (snapshot) => {
        if (snapshot.val()) {
            // all team members are at home
            disinfectantTimer = setInterval(
                () => increaseDisinfectant(teamId), 
                900.000 // 15min
            );
            disinfectantCountdownUITimer = setInterval(
                disinfectantCountdown, 5000
            )
        } else {
            if (disinfectantTimer) {
                clearInterval(disinfectantTimer);
            }
            if (disinfectantCountdownUITimer) {
                clearInterval(disinfectantCountdownUITimer);
            }
        }
    })

    var toiletpaperTimer = null;
    var toiletpaperCountdownUITimer = null
    firebase.database().ref('User/' + userId + '/athome').on('value', (snapshot) => {
        if (snapshot.val()) {
            // all team members are at home
            toiletpaperTimer = setInterval(
                () => increaseToiletpaper(userId), 
                7200000 // 2h
            );
            toiletpaperCountdownUITimer = setInterval(
                toiletpaperCountdown, 5000
            )
        } else {
            if (toiletpaperTimer) {
                clearInterval(toiletpaperTimer);
            }
            if (toiletpaperCountdownUITimer) {
                clearInterval(toiletpaperCountdownUITimer);
            }
        }
    })

}

function increaseDisinfectant(teamId) {
    firebase.database().ref('Team/' + teamId).transaction((team) => {
        if (team) {
            team.disinfectant += 1;
        }
        return team;
    });
}

function increaseToiletpaper(userId) {
    firebase.database().ref('User/' + userId).transaction((user) => {
        if (user) {
            user.toiletpaper += 1;
        }
        return user;
    });
}