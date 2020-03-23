import { useState, useEffect } from 'react';

import FirebaseModel from '_utilities/FirebaseModel';

const firebaseData = FirebaseModel.instance();
export default () => {
  const [lastToiletpaperDrop, setLastToiletpaperDrop] = useState(firebaseData.lastToiletpaperDrop);
  const [lastDisinfectantDrop, setLastDisinfectantDrop] = useState(firebaseData.lastDisinfectantDrop);
  const [upcomingToiletpaperDrop, setUpcomingToiletpaperDrop] = useState(firebaseData.upcomingToiletpaperDrop);
  const [upcomingDisinfectantDrop, setUpcomingDisinfectantDrop] = useState(firebaseData.upcomingDisinfectantDrop);

  const [toiletpaperProgress, setToiletpaperProgress] = useState(0);
  const [disinfectantProgress, setDisinfectantProgress] = useState(0);
  const [toiletpaperTime, setToiletpaperTime] = useState(0);
  const [disinfectantTime, setDisinfectantTime] = useState(0);

  function secondsToHms(d) {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return m + ':' + s;
  }

  useEffect(() => {
    firebaseData.on('lastToiletpaperDrop', setLastToiletpaperDrop);
    firebaseData.on('lastDisinfectantDrop', setLastDisinfectantDrop);
    firebaseData.on('upcomingToiletpaperDrop', setUpcomingToiletpaperDrop);
    firebaseData.on('upcomingDisinfectantDrop', setUpcomingDisinfectantDrop);
    return () => {
      firebaseData.off('lastToiletpaperDrop', setLastToiletpaperDrop);
      firebaseData.off('lastDisinfectantDrop', setLastDisinfectantDrop);
      firebaseData.off('upcomingToiletpaperDrop', setUpcomingToiletpaperDrop);
      firebaseData.off('upcomingDisinfectantDrop', setUpcomingDisinfectantDrop);
    };
  }, []);

  useEffect(() => {
    const timerHandle = setInterval(() => {
      const curTime = Date.now();
      // console.log(typeof lastToiletpaperDrop, lastToiletpaperDrop);
      setToiletpaperProgress((curTime - lastToiletpaperDrop) / (upcomingToiletpaperDrop - lastToiletpaperDrop));
      setDisinfectantProgress((curTime - lastDisinfectantDrop) / (upcomingDisinfectantDrop - lastDisinfectantDrop));
      setToiletpaperTime(secondsToHms((upcomingToiletpaperDrop - curTime) / 1000));
      setDisinfectantTime(secondsToHms((upcomingDisinfectantDrop - curTime) / 1000));
    }, 1000);
    return () => clearInterval(timerHandle);
  }, [lastToiletpaperDrop, lastDisinfectantDrop, upcomingToiletpaperDrop, upcomingDisinfectantDrop, toiletpaperProgress, disinfectantProgress]);

  return { toiletpaperProgress, disinfectantProgress, toiletpaperTime, disinfectantTime };
};
