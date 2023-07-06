# Funktionen
In dieser Dokumentation wird erklärt welche Konfigurationen am Warp Menü vorgenommen werden können.

## Benutzerdefinierte Einträge im Warp Menü
Benutzerdefinierte Einträge können über den externals-Teil von etcd eingefügt werden.
Die Einträge müssen ein json struct der folgenden Form sein:

```json
{
  "DisplayName": "Cloudogu",
  "Description": "Home of Cloudogu",
  "Category": "External Links",
  "URL": "https://cloudogu.com/"
}
```

Die Einträge können z.B. mit etcdctl eingefügt werden:

```bash
etcdctl set config/nginx/externals/cloudogu '{"DisplayName": "Cloudogu","Description": "Home of Cloudogu", "Category": "External Links", "URL": "https://cloudogu.com/"}'
```
### Eigene Einträge in bestehenden Kategorien hinterlegen
Falls dies gewünscht ist können eigene Links in bereits bestehende Kategorien eingefügt werden. 
Dazu muss in dem Schlüssel `"Category"` der Wert der jeweiligen Kategorie hinterlegt werden.

Folgende (bestehende) Mappings sind möglich:
* `Development Apps` -> Entwicklung
* `Administration Apps` -> Administration
* `Documentation` -> Dokumentation
* `Support`-> Support

Bspw:
```bash
etcdctl set config/nginx/externals/cloudogu '{"DisplayName": "This is a custom Link","Description": "Link to my resource", "Category": "Development Apps", "URL": "https://my.stuff.com/"}'
```

## `Support` Kategorie Einträge ausblenden
Die letzte Gruppe der Warp Menü Einträge ist traditionell die Support Gruppe. Hier befindet sich ein Link zu externen Seiten wie [docs.cloudogu](https://docs.cloudogu.com/) und 
[platform.cloudogu.com](https://platform.cloudogu.com/de/) sowie zur `about`-Seite die durch den nginx ausgeliefert wird.
Standardmäßig sind alle diese Einträge aktiviert und in der `config.yaml` hinterlegt.
Sollen nur einzelne dieser Einträge angezeigt werden, kann dafür ein Schlüssel im `etcd` hinterlegt werden.   
```bash
etcdctl get /config/_global/disabled_warpmenu_support_entries
```

Der Schlüssel enthält, sofern gefüllt, eine json-Liste an Tokens die nicht angezeigt werden soll. Wie die Tokens heißen steht in der `config.yaml` im 
nginx.
Beispielsweise kann mit dem Befehl `etcdctl set /config/_global/disabled_warpmenu_support_entries '["platform", "aboutCloudoguToken"]'`
der Link zu [platform.cloudogu.com](https://platform.cloudogu.com/de/) und zur `about`-Seite entfernt werden.
Sind alle Einträge in dem `etcd` Schlüssel enthalten wird die `Support` Gruppe nicht im Warpmenü angezeigt.

Derzeit sind drei Schlüssel definiert:
* `myCloudogu` - Link zur cloudogu platform => Aus Gründen der Kompatibilität beibehalten. My Cloudogu gibt es nicht mehr, es ist jetzt die cloudogu platform 
* `platform` - Link zur cloudogu platform 
* `aboutCloudoguToken` - Link zur __About__ Seite der Cloudogu GmbH 
* `docsCloudoguComUrl` - Link zum Dokumentationsspace des Cloudogu Ecosystems

> Beachten Sie bitte dass das Deaktivieren aller regulären Support Einträge den Eintrag `Support` aus dem Warp Menü verschwinden lässt. 
> D.h. wird der oben genannte Mechanismus zum Umsortieren von Einträgen in der `Informationen` Kategorie verwendet, werden die umsortierten Einträge nicht mehr angezeigt.