[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/dZI7lhjO)
# Web Technologien // begleitendes Projekt Sommersemester 2021

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.


## Quick Setup

Für diese Installation wird [Docker Compose](https://docs.docker.com/compose/install/) benötigt.

```
git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2021-JanKoll.git

cd mi-web-technologien-beiboot-ss2021-JanKoll

docker-compose up --build -d
```

`--build` wird nur benötigt, wenn Änderungen am Code vorgenommen wurden. Um die Container wieder zu zerstören, muss der Befehl `docker-compose down` ausgeführt werden.

### Environment Variablen
Die Environment Variablen können für den Client unter `/client/src/env.js` und für den Server unter `/server/.env` angepasst werden.