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
