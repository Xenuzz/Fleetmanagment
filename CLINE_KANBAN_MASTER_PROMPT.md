# Cline Kanban Masterprompt: Fuhrparkmanagement-System

## 1. Rolle und Arbeitsmodus

Du arbeitest in diesem Projekt als technischer Orchestrator innerhalb von Cline Kanban. Ziel ist der Aufbau eines professionellen Fuhrparkmanagement-Systems mit Web-Oberfläche, Windows-Client und Android-App sowie sauberem Backend, Dokumentation, GitHub-Repository, CI/CD und langfristig erweiterbarer Architektur.

Wichtig: Implementiere nicht sofort blind. Deine erste Aufgabe ist die vollständige Analyse, Strukturierung und Planung des Gesamtprojekts. Erkenne offene Architektur-, Produkt-, Security-, UX-, Plattform- und Betriebsentscheidungen. Stelle dazu gezielte Rückfragen an den Benutzer, bevor du weitreichende Annahmen triffst.

Arbeite danach das Projekt kontrolliert über Cline Kanban ab. Zerlege das Gesamtprojekt in Epics, Features, Tasks und Subtasks mit Prioritäten, Abhängigkeiten, Akzeptanzkriterien, Tests und Definition of Done.

## 2. Verbindliche Arbeitsreihenfolge

1. Projektanforderungen vollständig analysieren.
2. Offene Fragen und kritische Entscheidungen identifizieren.
4. Agenten-/Subagenten-Strategie planen, sofern unterstützt.
5. Zielarchitektur, Datenmodell, Sicherheitskonzept und Deployment-Konzept entwerfen.
6. Designkonzept, Design Tokens, Komponentenbibliothek, Navigation, Informationsarchitektur und Kernscreen-Wireframes planen.
7. Das Gesamtprojekt in Kanban-Epics, Features, Tasks und Subtasks zerlegen.
8. Prioritäten, Abhängigkeiten, Risiken, Akzeptanzkriterien und Definition of Done dokumentieren.
9. Erst nach Freigabe der Planung schrittweise implementieren.
10. Jede abgeschlossene Umsetzung durch Tests, Dokumentation und Review-/QA-Prüfung absichern.

Wenn eine wichtige Entscheidung mehrere sinnvolle Lösungen hat, erstelle eine kurze Entscheidungsvorlage mit Optionen, Vor- und Nachteilen, Auswirkungen und Empfehlung. Frage den Benutzer, statt ungeprüft eine Richtung festzulegen.

## 3. Zielbild des Systems

Es soll ein vollständiges Fuhrparkmanagement-System entstehen, das Unternehmen, Standorte, Benutzer, Fahrzeuge, Buchungen, Werkstattprozesse, Dokumente, Führerscheinprüfungen, Serviceintervalle, Fahrtenbücher, Arbeitszeiten, Belege, Rechnungen, Benachrichtigungen, Einstellungen, Plugin-Erweiterungen und mehrere Clients integriert.

Das System muss modular, erweiterbar, testbar, wartbar und sauber strukturiert sein. Vermeide unnötige Duplikation. Trenne Konfiguration, Secrets, Anwendungscode, Infrastruktur, Tests und Dokumentation klar voneinander.

## 4. Fachliche Muss-Anforderungen

### 4.1 Firmen, Standorte und Branding

- Firmenweites System mit mehreren Firmen und/oder Standorten planen.
- Standorte anlegen, bearbeiten, verwalten und Fahrzeugen, Benutzern, Buchungen, Werkstattaufträgen und Dokumenten zuordnen.
- Firmendaten verwalten, unter anderem Firmenname, Logo, Farben und relevante Grundeinstellungen.
- Branding muss konfigurierbar sein und sich konsistent auf Web-, Windows- und Android-Client auswirken.
- Cline soll klären, ob Mehrmandantenfähigkeit, Standortrechte, Konzernstruktur oder einfache Standortverwaltung benötigt werden.

### 4.2 Benutzer, Rollen, Rechte und Authentifizierung

- Rollenbasierte Zugriffsberechtigungen umsetzen.
- Lokale Benutzer müssen erstellt und verwaltet werden können.
- Single Sign-On muss möglich sein.
- Windows-Domain-Anbindung muss möglich sein.
- Berechtigungen müssen granular genug sein für Admins, Fuhrparkverwaltung, Werkstatt, Fahrer, Standortverantwortliche und weitere Rollen.
- Benutzer-Onboarding mit Einrichtungswizard vorsehen.
- Der Wizard soll beim ersten Login relevante Profildaten erfassen, insbesondere Name und Führerschein-Upload.
- Cline muss vor Implementierung klären, welche SSO-/Domain-Technologie konkret gewünscht ist, zum Beispiel Active Directory, LDAP, OpenID Connect, SAML oder ein anderer Anbieter.

### 4.3 Fahrzeugkatalog und Fahrzeugverwaltung

- Zentralen Fahrzeugkatalog erstellen.
- Fahrzeuge mit sämtlichen Daten verwalten:
  - Stammdaten
  - technische Daten
  - Ausstattung
  - Fahrzeugklasse
  - Kennzeichen
  - Standort
  - Status
  - Kilometerstand
  - Bilder
  - Dokumente
  - Service- und Werkstatthistorie
  - Buchungs- und Nutzungshistorie
- Fahrzeugbilder hochladen, speichern, anzeigen und Fahrzeugen zuordnen.
- Fahrzeugstatus verwalten, zum Beispiel verfügbar, gebucht, in Werkstatt, außer Betrieb, reserviert oder gesperrt.
- Statuslogik muss bei Buchungen, Werkstattaufträgen, Serviceintervallen und Fahrerzuordnung berücksichtigt werden.

### 4.4 Digitaler Fahrzeugschein

- Bild oder Scan des Fahrzeugscheins hochladen.
- Daraus eine digitale, strukturierte Ansicht erzeugen.
- Die Ansicht soll wie ein echter Fahrzeugschein aufgebaut sein, nicht nur als hochgeladenes Bild.
- Vorderseite und Rückseite müssen unterstützt werden.
- Es soll Ansichten geben für:
  - Vorderseite
  - Rückseite
  - vollständige Darstellung
- Felder des digitalen Fahrzeugscheins sollen als echte Datenfelder modelliert werden.
- Tooltips müssen die Bedeutung der einzelnen Felder erklären.
- Tooltips sollen kurze, verständliche Beschreibungen anzeigen, damit Benutzer verstehen, was die Angaben bedeuten.
- Cline soll klären, ob die Daten automatisch per OCR extrahiert, manuell ergänzt oder kombiniert verarbeitet werden sollen.

### 4.5 Fahrzeugbuchungen, Kalender und Freigabeprozesse

- Fahrzeugbuchungssystem umsetzen.
- Benutzer sollen Fahrzeuge buchen können.
- Buchungen müssen mit Fahrzeugstatus und Verfügbarkeit abgeglichen werden.
- Buchungsfreigaben müssen möglich sein.
- Fahrzeug darf nur buchbar sein, wenn es für den gewünschten Zeitraum verfügbar und geeignet ist.
- Kalenderintegration vorsehen.
- E-Mail-Erinnerungen und Benachrichtigungen für Buchungen vorsehen.
- Buchungen sollen Termine, Zeiträume, Fahrer, Fahrzeug, Zweck, Standort und Status enthalten können.
- Cline soll klären, ob externe Kalender wie Microsoft 365, Outlook, Google Kalender oder reine interne Kalenderfunktion gewünscht sind.

### 4.6 Fahrer, Führerscheinprüfung und Fahrer-Fahrzeug-Kompatibilität

- Führerschein-Upload beim Benutzer-Onboarding ermöglichen.
- Führerscheindokumente als Bild oder Datei hochladen.
- Automatische Extraktion aus den Bildern prüfen und planen.
- Führerscheinklassen automatisch erkennen oder manuell validierbar machen.
- Ablaufdatum und Gültigkeit des Führerscheins erfassen.
- Erinnerungen bei bald ablaufenden Führerscheinen vorsehen.
- Bei Buchung eines Fahrzeugs soll nur ein Fahrer auswählbar sein, der die passende Führerscheinklasse besitzt.
- Fahrer-Fahrzeug-Kompatibilität muss automatisch geprüft werden.
- System soll verhindern oder markieren, wenn ein Fahrer ein Fahrzeug nicht fahren darf.
- Datenschutz, Zugriffsschutz, Aufbewahrungsfristen und manuelle Nachprüfung für Führerscheindaten müssen vor Implementierung geklärt werden.

### 4.7 Werkstattaufträge und Werkstattsystem

- Integriertes Werkstattsystem umsetzen.
- Werkstattaufträge für Fahrzeuge erstellen, bearbeiten und abschließen.
- Pro Fahrzeug sollen Wartungen, offene Arbeiten, Defekte, Baustellen und erledigte Punkte dokumentiert werden.
- Werkstattaufträge sollen Checklisten enthalten.
- Checklistenpunkte sollen abhakebar sein.
- Fortschritt eines Werkstattauftrags soll sichtbar sein.
- Werkstattaufträge müssen mit Fahrzeugstatus, Serviceintervallen, Dokumenten, Rechnungen und Teilen verknüpft werden.
- Offene Werkstattarbeiten sollen in Übersichten und Benachrichtigungen erscheinen.

### 4.8 Teilekatalog und Teilebewertungen

- Angebundenen Teilekatalog umsetzen.
- Teile eintragen, bearbeiten, suchen und Fahrzeugen oder Werkstattaufträgen zuordnen.
- Zu jedem Teil sollen relevante Daten gespeichert werden, zum Beispiel Name, Artikelnummer, Hersteller, Lieferant, Preis, Kompatibilität, Beschreibung und Dokumente.
- Bewertungen für Teile erfassen:
  - Passgenauigkeit
  - Einbaugenauigkeit
  - Einfachheit des Einbaus
  - allgemeine Beschreibung, wie gut Einbau oder Nutzung funktioniert haben
- Teilebewertungen sollen später bei Auswahl und Planung helfen.

### 4.9 Serviceintervalle und Wartungserinnerungen

- Fahrzeug-Service-Intervall-System integrieren.
- Pro Fahrzeug sollen verschiedene Serviceintervalle festgelegt werden können.
- Intervalle können zeitbasiert, kilometerbasiert oder kombiniert sein.
- Erinnerungen bei bald fälligen Services vorsehen.
- Überfällige Services müssen klar sichtbar sein.
- Serviceintervalle sollen mit Werkstattaufträgen und Fahrzeugstatus verknüpft werden können.

### 4.10 Tankbelege, Rechnungen und Dokumente

- Tankbelege hochladen und Fahrzeugen, Fahrten, Benutzern oder Kostenstellen zuordnen können.
- Rechnungen hochladen und Werkstattaufträgen, Teilen, Fahrzeugen oder Firmen zuordnen können.
- Dokumentensystem für Fahrzeugdokumente integrieren.
- Konfigurierbare Speicherpfade vorsehen.
- Dateien müssen strukturiert gespeichert, gesucht, angezeigt und revisionssicher nachvollziehbar verwaltet werden.
- Cline soll klären, ob Speicherung lokal, auf Netzlaufwerken, in S3-kompatiblem Storage, Datenbank, SharePoint oder einem anderen Dokumentenspeicher erfolgen soll.

### 4.11 Fahrtenbuch, Aufträge, Arbeitszeiten und Pausen

- Fahrtenbuchsystem für LKW-Fahrer und andere Fahrer integrieren.
- Fahrer sollen Fahrstrecken und Aufträge eintragen können.
- Arbeitszeit und Pausenzeit sollen erfasst und berechnet werden.
- Kilometerstände, Start, Ziel, Route, Zweck, Auftrag, Fahrer, Fahrzeug und Zeiten sollen abbildbar sein.
- Das System soll Ausgaben ermöglichen:
  - PDF
  - Excel-Tabelle
  - Stundenzettel
  - Ausdrucke
  - gespeicherte Reports
- Cline soll klären, ob gesetzliche Vorgaben, Tachographen-/Lenkzeiten, Arbeitszeitregeln oder nur interne Stundenzettel benötigt werden.

### 4.12 Benachrichtigungssystem

- Zentrales Benachrichtigungssystem planen und umsetzen.
- Benachrichtigungen sollen im System, per Android-App und per E-Mail möglich sein.
- Benachrichtigungen unter anderem für:
  - Fahrzeugbuchungen
  - Buchungsfreigaben
  - Werkstattaufträge
  - offene Checklistenpunkte
  - Serviceintervalle
  - ablaufende Führerscheine
  - Tankbelege und Rechnungen
  - Aufgaben und Admin-Hinweise
- Cline soll klären, welche Kanäle verbindlich sind, zum Beispiel E-Mail, Push, In-App, Desktop-Benachrichtigung oder Kalender-Reminder.

### 4.13 Admin-Dashboard und Einstellungen

- Admin-Dashboard vorsehen.
- Einstellungen-Seite für Systemkonfiguration umsetzen.
- Admins sollen Firmen, Standorte, Rollen, Rechte, Benutzer, Speicherpfade, Branding, Benachrichtigungen, Integrationen, Plugins und Plattformoptionen verwalten können.
- Dashboard soll relevante Übersichten zeigen, zum Beispiel offene Werkstattaufträge, fällige Services, Buchungen, ablaufende Führerscheine, Fahrzeuge im Status "nicht verfügbar", Dokumentenprobleme und Systemzustand.

### 4.14 Plugin-System

- Plugin-System planen und umsetzen.
- Plugins sollen erstellt, hinzugefügt, aktiviert, deaktiviert und dokumentiert werden können.
- Plugin-Schnittstellen müssen sauber, versioniert und sicher sein.
- Cline soll vor Implementierung klären:
  - Welche Erweiterungspunkte benötigt werden.
  - Ob Plugins Backend, Frontend, Automatisierungen, Berichte, Dokumentenimporte oder Integrationen erweitern dürfen.
  - Wie Plugins isoliert, signiert, versioniert und berechtigt werden.
  - Wie inkompatible Plugins erkannt werden.

### 4.15 Plattformen, Clients und Funktionsparität

- Unterstützte Betriebsumgebungen:
  - Linux-basierte Version
  - Windows-basierte Version
  - Windows-Server-basierte Version
  - Docker-Version
- Unterstützte Clients:
  - Web-Oberfläche
  - Windows-Programm
  - Android-App
- Web-, Windows- und Android-Client sollen vollständige Funktionsparität anstreben.
- Android-App muss für Smartphone und Tablet optimiert sein.
- Android-App muss unter anderem können:
  - Werkstattaufträge anzeigen und bearbeiten
  - Fahrzeuge übernehmen
  - gebuchte Fahrzeuge verwalten
  - Fahrzeugübernahmen dokumentieren
  - Bilder hochladen
  - Kilometerstand erfassen
  - digitales Fahrbuch/Fahrtenbuch nutzen
  - Benachrichtigungen erhalten
  - Buchungen, Werkstattaufträge und Serviceintervalle einsehen
- Cline soll klären, ob Offline-Fähigkeit, Synchronisation, Kamera-Upload, Push-Benachrichtigungen und Hintergrundjobs benötigt werden.

### 4.16 GitHub-Repository, Wiki, Dokumentation und CI/CD

- Vollständig strukturiertes GitHub-Repository erstellen.
- Repository soll klar gegliedert sein und langfristige Erweiterung ermöglichen.
- Vollständig erklärtes Wiki oder Dokumentationsbereich erstellen.
- Dokumentation muss jede wichtige Möglichkeit und Einstellung beschreiben:
  - Installation
  - Konfiguration
  - Benutzerverwaltung
  - Rollen und Rechte
  - Firmen und Standorte
  - Fahrzeugverwaltung
  - digitaler Fahrzeugschein
  - Buchungen
  - Werkstatt
  - Teilekatalog
  - Serviceintervalle
  - Führerscheinprüfung
  - Dokumentensystem
  - Speicherpfade
  - Plugins erstellen
  - Plugins hinzufügen
  - Plugins aktivieren/deaktivieren
  - Admin-Dashboard
  - Clients
  - Deployment
  - Troubleshooting
- GitHub Actions einrichten.
- CI/CD soll Tests, Builds, Qualitätsprüfungen und Android-Build-Artefakte abdecken.
- Cline soll klären, ob Releases automatisch erstellt und signiert werden sollen.

## 5. Verbindliches Designkonzept

Das Design muss simple, clean, sehr user-friendly, modern, hochwertig, animationsreich und im blauen Stil sein.

### 5.1 Visuelle Richtung

- Dunkelblau ist die Primärfarbe.
- Abgestufte Blautöne dienen als Akzente, Statusfarben und Hervorhebungen.
- Die Oberfläche soll modern, ruhig, hochwertig und professionell wirken.
- Klare visuelle Hierarchie.
- Großzügige Abstände.
- Gut lesbare Typografie.
- Abgerundete Komponenten.
- Moderne Karten, Popups, Dialoge, Side Panels und Modals.
- Subtile Tiefenwirkung durch Schatten, Ebenen und Fokuszustände.
- Konsistente Icons, Abstände, Zustände und Layoutregeln.

### 5.2 Animationen und Interaktionen

- Animationen sollen flüssig, hochwertig und hilfreich sein.
- Microinteractions für Hover, Fokus, Statuswechsel, Speichern, Fehler, Drag-and-drop, Dialoge, Listen, Kalender, Uploads und Fortschritt vorsehen.
- Animationen dürfen Bedienbarkeit, Barrierefreiheit oder Performance nicht verschlechtern.
- Reduzierte Bewegung muss für Benutzer mit entsprechender Systemeinstellung unterstützt werden.

### 5.3 Responsive und adaptive Umsetzung

- Web, Windows und Android sollen dieselbe Designsprache verwenden.
- Layouts müssen responsive und adaptiv sein.
- Android muss für Handy und Tablet optimiert werden.
- Kernfunktionen müssen auf kleinen Bildschirmen bedienbar bleiben.
- Desktop-Oberflächen dürfen dichter sein, müssen aber weiterhin sauber und übersichtlich bleiben.

### 5.4 Vor Frontend-Implementierung planen

Vor dem Schreiben von Frontend-Code muss Cline Folgendes planen und zur Freigabe vorlegen:

- Design Tokens für Farben, Typografie, Radius, Schatten, Spacing, Animationen und Breakpoints.
- Komponentenbibliothek mit Buttons, Inputs, Tabellen, Kalendern, Karten, Status-Badges, Uploads, Dialogen, Popups, Tooltips, Tabs, Navigation, Checklisten und Benachrichtigungen.
- Navigation und Informationsarchitektur.
- Rollenabhängige Navigation.
- Kernscreen-Wireframes für mindestens:
  - Login und Onboarding
  - Admin-Dashboard
  - Fahrzeugkatalog
  - Fahrzeugdetail
  - digitaler Fahrzeugschein
  - Buchungskalender
  - Buchungsdetail/Freigabe
  - Werkstattauftrag
  - Teilekatalog
  - Führerscheinprüfung
  - Fahrtenbuch
  - Dokumentencenter
  - Einstellungen
  - Plugin-Verwaltung
  - Android-Fahrzeugübernahme
  - Android-Werkstattansicht

## 6. Architektur- und Qualitätsprinzipien

- Modularer Aufbau mit klaren Verantwortlichkeiten.
- Erweiterbare Domänenmodule.
- Saubere API-Schicht.
- Testbare Business-Logik.
- Keine unnötige Duplikation.
- Konfiguration und Secrets strikt trennen.
- Secrets nicht im Repository speichern.
- Umgebungsspezifische Konfiguration über sichere Mechanismen lösen.
- Datenmodell nachvollziehbar dokumentieren.
- Migrationen versionieren.
- Authentifizierung und Autorisierung zentral, konsistent und testbar implementieren.
- Dokumente, Bilder und Belege strukturiert verwalten.
- Logging, Monitoring und Fehlerbehandlung vorsehen.
- Sicherheits-, Datenschutz- und Backup-Konzept planen.
- Import-/Export-Funktionen robust gestalten.
- Plattformübergreifende Funktionen über gemeinsame Kernlogik planen, wo sinnvoll.
- Client-spezifische Besonderheiten bewusst kapseln.

## 7. Offene Entscheidungen, die Cline mit dem Benutzer klären muss

Cline muss diese Themen aktiv durchgehen, bevor verbindlich geplant oder implementiert wird:

- Gewünschter Technologie-Stack für Backend, Frontend, Windows-Client und Android-App.
- Datenbanktyp und Hosting.
- Zielbetrieb: lokal, Server, Cloud, Hybrid oder rein Docker-basiert.
- Multi-Tenant-Modell: eine Firma, mehrere Firmen, mehrere Standorte, Standortrechte.
- Authentifizierungsstandard für SSO und Windows-Domain.
- Rechte- und Rollenkonzept.
- Dokumentenspeicher und Speicherpfade.
- OCR-Strategie für Führerschein und Fahrzeugschein.
- Datenschutz und Aufbewahrung sensibler Dokumente.
- Kalenderintegration und E-Mail-System.
- Push-Benachrichtigungen für Android.
- Offline-Fähigkeit der Android-App.
- Windows-App-Technologie.
- Plugin-Sandbox und erlaubte Erweiterungspunkte.
- Exportformate und rechtliche Anforderungen für Fahrtenbuch, Arbeitszeiten und Stundenzettel.
- CI/CD-Ziel: nur Build/Test oder auch Releases, Signierung und Artefakte.
- Lizenzmodell, Update-Strategie und spätere Erweiterbarkeit.

Wenn der Benutzer Details noch nicht festlegen kann, soll Cline sinnvolle Optionen mit Empfehlung vorbereiten und als Kanban-Entscheidungstask dokumentieren.

## 8. Agenten- und Skill-Strategie

### 8.1 Skills prüfen und nutzen

Vor jeder größeren Phase soll Cline prüfen:

- Welche Skills in der aktuellen Umgebung verfügbar sind.
- Welche Skills für die jeweilige Phase nötig oder hilfreich sind.
- Ob passende Skills installiert oder aktiviert werden können.
- Ob die Umgebung Skill-Installation überhaupt unterstützt.

Wenn Skill-Installation oder Skill-Aktivierung unterstützt wird, soll Cline passende Skills installieren/aktivieren und dokumentieren, wofür sie genutzt werden.

Wenn Skill-Installation oder Skill-Aktivierung nicht unterstützt wird, darf Cline diese Fähigkeit nicht erfinden. Stattdessen soll Cline klar feststellen, dass die Funktion in der aktuellen Umgebung nicht verfügbar ist, und einen kompatiblen Ersatzworkflow vorschlagen.

### 8.2 Agents/Subagents prüfen und nutzen

Cline soll prüfen, ob Cline Kanban bzw. die konfigurierte Umgebung Agent-Spawning, Subagents oder Delegation unterstützt.

Wenn Agent-Spawning unterstützt wird, soll Cline spezialisierte Agents/Subagents mit klar abgegrenzten Aufgaben einsetzen. Jeder Agent muss ein eindeutiges Ziel, Eingaben, Grenzen, erwartete Ergebnisse und Review-Kriterien erhalten.

Wenn Agent-Spawning nicht unterstützt wird, soll Cline nicht so tun, als ob Agents existieren. Stattdessen soll Cline einen Ersatzworkflow mit getrennten Kanban-Aufgaben, Rollenperspektiven und Review-Schritten vorschlagen.

### 8.3 Vorgesehene Agentenrollen

- Architektur-Agent: Zielarchitektur, Modulgrenzen, Integrationsmuster, Skalierbarkeit, Erweiterbarkeit.
- Backend/API-Agent: API-Design, Business-Logik, Auth-Integration, Services, Validierung.
- Datenbank-Agent: Datenmodell, Beziehungen, Migrationen, Indizes, Datenintegrität.
- Security/Auth-Agent: Rollen, Rechte, SSO, Windows-Domain, lokale Benutzer, Datenschutz, Secrets.
- Frontend/UI/UX-Agent: Designsystem, Informationsarchitektur, Wireframes, Web-UI, Accessibility.
- Android-Agent: Smartphone-/Tablet-App, Kamera-Upload, Benachrichtigungen, Fahrzeugübernahme, Offline-/Sync-Fragen.
- Windows/Desktop-Agent: Windows-Client, Plattformintegration, Updates, lokale Einstellungen.
- DevOps/Docker/CI-Agent: Docker, Linux, Windows Server, GitHub Actions, Builds, Releases.
- Testing/QA-Agent: Teststrategie, Akzeptanztests, Regression, Review, Definition of Done.
- Dokumentations-Agent: Wiki, Setup, Admin-Dokumentation, Benutzerhandbuch, Plugin-Dokumentation.

### 8.4 Review-Pflicht

Agents dürfen ihre Ergebnisse nicht ungeprüft als abgeschlossen markieren. Ein Review-/QA-Agent oder ein expliziter Review-Schritt muss prüfen:

- Entspricht das Ergebnis den Anforderungen?
- Sind Akzeptanzkriterien erfüllt?
- Sind Tests vorhanden oder begründet nicht nötig?
- Ist Dokumentation aktualisiert?
- Sind Sicherheits-, Datenschutz- und Architekturvorgaben eingehalten?
- Sind offene Annahmen dokumentiert?

## 9. Kanban-Struktur, die Cline erzeugen soll

Cline soll das Projekt in Kanban-Elemente mit folgender Struktur zerlegen:

### 9.1 Epics

Mindestens diese Epics anlegen oder als Plan vorschlagen:

1. Produktklärung und Architekturentscheidungen
2. Repository, Entwicklungsumgebung und CI/CD
3. Authentifizierung, Rollen und Rechte
4. Firmen, Standorte und Branding
5. Fahrzeugkatalog und Fahrzeugverwaltung
6. Digitaler Fahrzeugschein
7. Fahrzeugbuchung, Status, Kalender und Benachrichtigungen
8. Fahrer, Führerscheinprüfung und Kompatibilitätsprüfung
9. Werkstattaufträge, Checklisten und Serviceintervalle
10. Teilekatalog und Teilebewertungen
11. Dokumente, Speicherpfade, Tankbelege und Rechnungen
12. Fahrtenbuch, Aufträge, Arbeitszeiten, Pausen und Exporte
13. Web-Client
14. Windows-Client
15. Android-App für Handy und Tablet
16. Plugin-System
17. Admin-Dashboard und Einstellungen
18. Testing, QA, Security Review und Performance
19. Wiki, Benutzerhandbuch und technische Dokumentation
20. Release, Deployment und Betrieb

### 9.2 Task-Vorlage

Jeder Task soll mindestens diese Felder enthalten:

- Titel
- Epic
- Ziel
- Kontext
- Fachliche Anforderungen
- Technische Anforderungen
- Abhängigkeiten
- Priorität
- Betroffene Plattformen
- Betroffene Rollen
- Benötigte Skills
- Vorgesehener Agent oder Verantwortungsbereich
- Umsetzungsschritte
- Akzeptanzkriterien
- Tests
- Dokumentationsbedarf
- Definition of Done
- Risiken und offene Fragen

### 9.3 Priorisierung

Cline soll sinnvoll priorisieren:

- P0: Fundament, Architektur, Sicherheit, Datenmodell, Repository, CI/CD, Auth.
- P1: Kernprozesse, die das System nutzbar machen.
- P2: Komfortfunktionen, Erweiterungen, Optimierungen, Animationen, Reports.
- P3: optionale spätere Erweiterungen.

Prioritäten dürfen nicht nur nach Sichtbarkeit im UI vergeben werden. Abhängigkeiten, Risiko und Architektur-Fundament zählen stärker.

## 10. Definition of Done

Ein Task gilt erst als erledigt, wenn:

- die fachlichen Akzeptanzkriterien erfüllt sind,
- relevante Tests erstellt und erfolgreich ausgeführt wurden,
- Fehlerzustände und leere Zustände berücksichtigt wurden,
- Berechtigungen geprüft wurden,
- Datenvalidierung umgesetzt ist,
- UI-Zustände responsive funktionieren,
- Accessibility berücksichtigt ist,
- Dokumentation aktualisiert wurde,
- keine Secrets oder lokalen Pfade ungeschützt im Code liegen,
- Review-/QA-Prüfung abgeschlossen ist,
- offene Annahmen dokumentiert sind,
- der Task im Kanban nachvollziehbar abgeschlossen werden kann.

## 11. Erwartete erste Antwort von Cline

Wenn dieser Masterprompt in Cline Kanban eingefügt wird, soll Cline als erstes nicht implementieren. Die erste Antwort soll enthalten:

1. Eine kurze Zusammenfassung des Projektziels.
2. Eine Liste der erkannten Hauptdomänen.
3. Eine Liste kritischer offener Fragen.
4. Vorschlag für Agenten-/Skill-Strategie passend zur aktuellen Umgebung.
5. Vorschlag für Zielarchitektur und mögliche Technologieoptionen, falls noch nicht entschieden.
6. Vorschlag für das verbindliche Design- und UX-Planungsvorgehen.
7. Erste Kanban-Struktur mit Epics und Abhängigkeiten.
8. Hinweis, welche Entscheidungen vor Implementierung vom Benutzer freigegeben werden müssen.

Erst wenn diese Planung geklärt und freigegeben wurde, soll Cline mit der Umsetzung einzelner Tasks beginnen.

## 12. Wichtige Arbeitsregel

Das Ziel ist nicht, möglichst schnell Code zu erzeugen. Das Ziel ist ein vollständig geplantes, professionell strukturiertes und langfristig erweiterbares Fuhrparkmanagement-System, das anschließend kontrolliert, testbar und nachvollziehbar Task für Task über Cline Kanban umgesetzt werden kann.
