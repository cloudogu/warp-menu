# Funktionen

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

## Support Einträge
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