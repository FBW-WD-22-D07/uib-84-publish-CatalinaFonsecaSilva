# Publishing Workflow

Lass uns unsere Arbeit öffentlich machen, um sie mit der Welt zu teilen. Achte auf **gesetzliche Bestimmungen** (kein Hass, kein Mobbing, keine Fehlinformationen usw.).

Hinweis: Dies wurde zuletzt im **Juli 2021** aktualisiert. Zu diesem Zeitpunkt...
    
* ...befinden sich die Einstellungen für Github-Seiten unter: Reiter **Einstellungen** / Untermenü **Seiten**.
* ... Der Standard-Zweigname von Github ist derzeit `main`. Dies hat sich im Laufe der Zeit geändert. Wenn du ältere Repositories veröffentlichen oder ältere Versionen des Kommandozeilen-Tools verwenden möchtest, musst du den alten `master`-Zweig mit `git branch -m main` umbenennen, bevor du dieser Anleitung folgst.

## Idee

Wir werden den Github-Dienst Github pages nutzen, um den Inhalt von Repositories auf einer öffentlich zugänglichen URL in Form von https://accountname.github.io/repositoryname/ zu veröffentlichen.

Es gibt einige Dinge, die du beachten musst:

1. Github Pages übersetzt standardmäßig Markdown-Dateien (wie README.MD) in HTML und verwendet dabei ein Programm namens [Jekyll] (https://jekyllrb.com/). Wir wollen unser eigenes HTML/CSS schreiben, also werden wir dieses Standardverhalten deaktivieren.
2. github pages funktioniert nur für öffentliche Repositories für Basis-Accounts. (PRO-Konten können auch private Repositories veröffentlichen)


## Anleitung

1. Erstelle ein Repository auf deinem persönlichen GitHub-Konto.
    * Wenn du ein kostenloses GitHub-Konto hast, muss das Repository für diese Übung **öffentlich** sein.
2. Kopiere die Adresse deines Repositorys und klone es lokal auf deine Maschine mit `git clone yourCopiedLink`.
3. Erstelle eine Datei `index.html` als Startpunkt und fülle sie mit ein paar Textbausteinen (z.B. einem Dokumententitel und einer Überschrift der ersten Ebene `<h1>Hello public world</h1>`)
4. Mache einen ersten Commit durch Staging (`git add index.html` und `git commit -m "initial commit"`)
    * Du _kannst den `main` Zweig mit `git push origin main` auf github pushen
    * (dieser Schritt ist _optional_, da wir einen anderen Zweig verwenden werden)
5. Standardmäßig werden Github-Seiten mit einem Branch `gh-pages` veröffentlicht
    * Erstellen wir einen solchen Zweig als Kopie des aktuellen (`main`), indem wir `git checkout -b gh-pages` im Terminal eingeben.    
6. Schiebe den neuen Zweig mit `git push origin gh-pages` in das entfernte Github-Repository.
7. Aktiviere GitHub Pages für das Repository.
    * Gehe auf den Reiter Einstellungen deines Repositorys und navigiere links zum Untermenü **Seiten** ![settings](settings-pages.jpg)
    * Lege "gh-pages" als Live-Zweig und /(root) als Live-Verzeichnis fest. ![branch](settings-select-branch.jpg)
    * Github zeigt die URL deiner öffentlichen Seite oben im Abschnitt Quelle an. Sie sieht dann so aus: https://youraccount.github.io/repositoryname/
    * Wenn du jetzt dem Link folgst, siehst du eine gerenderte Version der readme.md des Repositorys (wenn du diese Option bei der Erstellung des Repositorys aktiviert hast) oder eine Fehlermeldung, die besagt, dass es nichts zu zeigen gibt.
8. Deaktiviere Jekyll.
    * Du kannst das Standardverhalten (das Übersetzen von Markdown-Dateien in HTML) abschalten, indem du eine Datei mit dem Namen `.nojekyll` in dem Verzeichnis erstellst, das du für die Veröffentlichung ausgewählt hast.
    * Erstelle eine solche Datei mit VSC oder im Terminal, indem du `touch .nojekyll` im Terminal eingibst. Achte auf den Punkt (`.`) vor dem Dateinamen
9. Übermittle diese Änderung an github
    * lege die Änderungen im Verzeichnis mit `git add .` ab
    * Mache einen neuen Commit mit `git commit -m "added .nojekyll"`
    * Pushe sie mit `git push origin gh-pages` auf das Remote-Verzeichnis
10. Besuche die öffentliche URL (z.B. https://youraccount.github.io/repositoryname/) und überprüfe, ob alles so funktioniert, wie es sollte.

## Bonus: Hilfspaket gh-pages von npm

Es gibt ein NPM-Paket `gh-pages`, das dabei hilft, die Schritte zur Aktualisierung deiner veröffentlichten Seite zu automatisieren, während du vom Haupt- oder anderen Zweigen aus arbeitest.

Du kannst es mit `npm install -g gh-pages@3.0.0` global auf deinem System installieren, um das Hinzufügen einer package.json zu sehr einfachen kleinen Projekten mit reinem HTML/CSS zu vermeiden.

Mit dem Paket kannst du in deinem Hauptzweig oder in anderen Zweigen arbeiten und kontrollieren, welches Verzeichnis du im gh-pages-Zweig veröffentlichen und damit öffentlich machen willst.

### Beispiel aufrufen.

Nehmen wir an, du arbeitest im Stammverzeichnis deines Hauptzweigs und möchtest den gesamten Inhalt in den gh-pages-Zweig verschieben und veröffentlichen, dann gib ein:

```bash
gh-pages -d ./
```

Du kannst auch ein anderes Unterverzeichnis angeben, das zum Stammverzeichnis (root) der Veröffentlichung wird.

```bash
gh-pages -d dist
```

Dies ist nützlich, wenn du Entwicklungswerkzeuge (wie sass) verwendest, um ein `/dist/`-Verzeichnis (=distribution) für die Veröffentlichung von anderen Quelldateien zu erstellen.

Der Inhalt des Unterverzeichnisses wird der Inhalt der **root** des `gh-pages`-Zweiges

**Wichtiger Hinweis**:
Es gibt ein bekanntes [Problem](https://github.com/tschaub/gh-pages/issues/354) mit gh-pages Versionen >3.0.0 mit der Konfiguration eines temporären Verzeichnisses, wenn es keine package.json gibt (also mit dem global installierten Paket), das mit `The "path" argument must be of type string. Received undefined` endet. In diesem Fall musst du sicherstellen, dass du genau die Version 3.0.0 von gh-pages in einer globalen Installation verwendest (oder eine package.json in deinem Projekt mit gh-pages in den Entwicklungsabhängigkeiten hast). Um von einer anderen installierten Version auf genau 3.0.0 zu wechseln, gib in deinem Terminal `npm install gh-pages@3.0.0 -g` ein.
