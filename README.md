# Toiletpaper Clans 
Unser Git-Repository für die App 'Toiletpaper Clans'. Wir sind Teil von #WirvsVirusHack.

ToiletPaper Clans - Das Spiel für die Quarantäne

Stay at home und sammle Klopapier! Noch besser sammle mit deinen Freunden zusammen! Bildet Teams und sammelt zusammen Klopapier.

Doch halt! Ihr seid unter Quarantäne....

Wehe einer von euch verlässt das Haus, dann sinkt euer Desinfektionslevel!!!

Wir können als Team auch andere Teams überfallen, wenn diese nicht zu Hause sind und ihr Klopapier ergattern! 

![App Overview](https://media.discordapp.net/attachments/690844505821151263/691291108503846962/WebScreen.png?width=1197&height=673)

Devpost: https://devpost.com/software/46_gamification_toiletpaperclans
Adobe XD Design Prototyp: https://xd.adobe.com/view/c4bec169-faaf-4fc9-5040-f7f724555f58-b28f/screen/84582bc9-b6a2-4d1b-b94d-2e75b520909d/iPad-Pro-10-5-3

## Anforderungen

    - Nutzer müssen sich anmelden können
         * Name, Passwort
    - Nutzer müssen ein Team erstellen können/ sich einem Team anschließen können

### Tracking

    - Nutzer müssen getrackt werden können, um zu ermitteln, ob sie zu Hause sind oder nicht
    - Nutzer müssen die Möglichkeit haben, das Tracking ihres Verhaltens ein- und ausschalten zu können 
    - Sobald das Tracking ausgeschaltet wurde, ist der Zustand des Nutzers der selbe, wie wenn dieser das Haus verlassen hat.
    - Nutzer müssen die Möglichkeit haben zu sehen, ob ihre Teammitglieder zuhause oder unterwegs sind

### Argon/Wettkampf

    - Nutzer müssen Klopapier und Desinfektionsmittel in einem Stock sammeln können
        - Desinfektionsmittel => sowas wie **Mana**/ Schutzmittel
        - Desinfektionsmittel wie wird es gesammelt wenn alle gleichzeitig zuhause sind.
        - Nutzer die draußen sind verbrauchen Desinfektionsmittel (in welchem verhältnis? können wir die nähe zu anderen nutzern verwenden und den verbrauch hier steigern?
        Was wenn man kein Desinfektionsmittel mehr hat: Das Team wird krank man verbraucht Kloppaier →dh. fällt dann im score)  => Toast/Benachrichtigung
        Toilettenpapier => Score
        - Einzelne Nutzer müssen Toilettenpapier erhalten für eine gewisse Zeit die sie zuhause sind (aller x Minuten eine Rolle)ilettenpapier erhalten für eine gewisse Zeit die sie zuhause sind (aller x Minuten eine Rolle)
        - Jeder Nutzer muss eine übersicht über den Team-Score haben über den Team-Score haben
    - Team mit anderen Teams vergleichen können. **Globaler Highscore**
    - Klopapier klauen => wenn alle personen zu hause sind hat team die möglichkeit ein anderes team zu plündern, von dem aktuell nicht alle zu hause sind (team wird zufällig ausgewählt). Angreifendes Team muss dann z.b. in gewisser zeit auf eine push notification reagieren / einen Button betätigen

## Technologie

Die App basiert auf dem Framework 'React Native' und der Datenbank 'Firebase'. Dadurch gibt es einen Code, jedoch jeweils eine native Android- und iOS-App.

### Struktur

    ├── assets                  # Support Files like Images or Icons
    ├── components              # Our Custom Components
    ├── navigations             # Files for App Navigation
    ├── scenes                  # Views or Screens
    ├── services                # Often-Used Support Code
    ├── styles                  # Global Variables for Styling
    ├── utilities               # Backend Utilities like API
    └── index.js                # initial route file

### Instalation
Installiere zunächst React Native auf deinem Gerät: https://reactnative.dev/docs/getting-started
Führe anschließend die folgenden Befehle auf deiner Konsole aus:
```
git clone https://github.com/cherrywoods/wirvsvirus-gamification-toiletpaper-clans.git
cd wirvisvirus-gamification-toiletpaper-clans
yarn install
```
Wenn du für iOS bauen möchtest außerdem:
```
cd ios
pod install
cd ..
yarn react-native run-ios
```
Für android reicht der folgenden Befehl:
```
yarn react-native run-android
```

## Licensing
Licensed at the terms of the MIT Open Source Licence
