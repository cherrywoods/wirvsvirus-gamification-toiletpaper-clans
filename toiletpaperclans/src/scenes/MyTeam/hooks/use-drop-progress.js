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
    }, 1000);
    return () => clearInterval(timerHandle);
  }, [lastToiletpaperDrop, lastDisinfectantDrop, upcomingToiletpaperDrop, upcomingDisinfectantDrop]);

  return { toiletpaperProgress, disinfectantProgress };
};
