# Operations

Custom entries can be inserted by using the externals part of etcd.
The entries must be a json struct of the following form:

```json
{
    "DisplayName": "Cloudogu", 
    "Description": "Home of Cloudogu", 
    "Category": "External Links", 
    "URL": "https://cloudogu.com/"
}
```

The entries can be inserted with etcdctl e.g.:

```bash
etcdctl set config/nginx/externals/cloudogu '{"DisplayName": "Cloudogu","Description": "Home of Cloudogu", "Category": "External Links", "URL": "https://cloudogu.com/"}'
```

## Supportgroup entries
The last group of Warp Menu items is traditionally the Support group. Here you will find a link to external pages like [docs.cloudogu](https://docs.cloudogu.com/) and
[mycloudogu.com](https://my.cloudogu.com/) as well as to the `about` page delivered by the nginx.
By default, all these entries are enabled and stored in `config.yaml`.
If you want to **not** show some of these entries you can set a key in the `etcd`.   

```bash
etcdctl get /config/_global/disabled_warpmenu_support_entries
```

The key contains, if filled, a json list of tokens which should not be displayed. The name of the tokens can be found in `config.yaml` in the 
nginx.
An example can be used with the command `etcdctl set /config/_global/disabled_warpmenu_support_entries '["myCloudogu", "aboutCloudoguToken"]'`.
the link to [mycloudogu.com](https://my.cloudogu.com/) and to the `about` page should be removed.
If all entries are included in the `etcd` key the `support` group will not be displayed in the warp menu.