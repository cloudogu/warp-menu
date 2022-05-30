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
### Eigene Einträge in `Support` Kategorie hinterlegen
Falls dies gewünscht ist können eigene Links in bereits bestehende `Support` Kategorie eingefügt werden. 
Dazu muss in dem Schlüssel `"Category"` der Wert `Information` hinterlegt werden.
Bspw:
```bash
etcdctl set config/nginx/externals/cloudogu '{"DisplayName": "This is a Support Link","Description": "Link to my Support", "Category": "Information", "URL": "https://my.support.com/"}'
```

## `Support` Kategorie Einträge ausblenden
Die letzte Gruppe der Warp Menü Einträge ist traditionell die Support Gruppe. Hier befindet sich ein Link zu externen Seiten wie [docs.cloudogu](https://docs.cloudogu.com/) und 
[mycloudogu.com](https://my.cloudogu.com/) sowie zur `about`-Seite die durch den nginx ausgeliefert wird.
Standardmäßig sind alle diese Einträge aktiviert und in der `config.yaml` hinterlegt.
Sollen nur einzelne dieser Einträge angezeigt werden, kann dafür ein Schlüssel im `etcd` hinterlegt werden.   
```bash
etcdctl get /config/_global/disabled_warpmenu_support_entries
```

Der Schlüssel enthält, sofern gefüllt, eine json-Liste an Tokens die nicht angezeigt werden soll. Wie die Tokens heißen steht in der `config.yaml` im 
nginx.
Beispielsweise kann mit dem Befehl `etcdctl set /config/_global/disabled_warpmenu_support_entries '["myCloudogu", "aboutCloudoguToken"]'`
der Link zu [mycloudogu.com](https://my.cloudogu.com/) und zur `about`-Seite entfernt werden.
Sind alle Einträge in dem `etcd` Schlüssel enthalten wird die `Support` Gruppe nicht im Warpmenü angezeigt.

Derzeit sind drei Schlüssel definiert:
* `myCloudogu` - Link zur __myCloudogu__ Plattform 
* `aboutCloudoguToken` - Link zur __About__ Seite der Cloudogu GmbH 
* `docsCloudoguComUrl` - Link zum Dokumentationsspace des Cloudogu Ecosystems

> Beachten Sie bitte dass das Deaktivieren aller regulären Support Einträge den Eintrag `Support` aus dem Warp Menü verschwinden lässt. 
> D.h. wird der oben genannte Mechanismus zum Umsortieren von Einträgen in der `Informationen` Kategorie verwendet, werden die umsortierten Einträge nicht mehr angezeigt.