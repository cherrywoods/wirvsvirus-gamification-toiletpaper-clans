# Toiletpaper Clans 
Unser Git-Repository für die App 'Toiletpaper Clans'. Wir sind Teil von #WirvsVirus.

Bleib zuhause, sammle Klopapier und nutze die Nachlässigkeit von anderen Gruppen, um weiteres Klopapier zu rauben. Schaffst du es, das meiste Klopapier zu horten und auf dem Siegerpodest zu stehen?

devpost: https://devpost.com/software/46_gamification_toiletpaperclans#

## Anforderungen

    - Nutzer müssen sich anmelden können
         * Name, Passwort
    - Nutzer müssen ein Team erstellen können/ sich einem Team anschließen können

### Tracking

    - Nutzer muss getrackt werden können, ob er zu Hause ist oder nicht
    - Nutzer müssen die Möglichkeit habe das Tracking ihres Verhaltens ein- und ausschalten zu können 
    - Ist das Tracking ausgeschaltet dann ist der Zustand des Nutzers der selbe wie wenn dieser das Haus verlassen hat.
    - Nutzer müssen die Möglichkeit haben zu sehen ob ihre Teammitglieder zuhause oder unterwegs sind

### Argon/Wettkampf

    - Nutzer müssen Kloppaier und Desinfektionsmittel in einem Stock sammeln können
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

## Licensing
Currenty licensed at the terms of the MIT Open Source Licence
