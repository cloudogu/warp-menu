# Functions
This documentation explains which configurations can be made on the Warp Menu.

## Add custom defined entries into the Warp Menu
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

### Add own entries to existing categories
If desired, own links can be inserted into already existing categories.
For this purpose, the value of the respective category must be stored in the respecting `"Category"`.

The following (existing) mappings are possible:
* `Development Apps` -> Development Apps
* `Administration Apps` -> Administration Apps
* `Documentation` -> Documentation
* `Support`-> Support

For example:
```bash
etcdctl set config/nginx/externals/cloudogu '{"DisplayName": "This is a custom Link", "Description": "Link to my resource", "Category": "Development Apps", "URL": "https://my.stuff.com/"}'
```

## Hide `Support` category entries
The last group of Warp Menu items is traditionally the Support group. Here you will find a link to external pages like [docs.cloudogu](https://docs.cloudogu.com/) and
[mycloudogu.com](https://my.cloudogu.com/) as well as to the `about` page delivered by the nginx.
By default, all these entries are enabled and stored in `config.yaml`.
If you want to hide some of these entries you can set a key in the `etcd`.   

```bash
etcdctl get /config/_global/disabled_warpmenu_support_entries
```

The key contains, if filled, a json list of tokens which should not be displayed. The name of the tokens can be found in `config.yaml` in the 
nginx.
An example can be used with the command `etcdctl set /config/_global/disabled_warpmenu_support_entries '["myCloudogu", "aboutCloudoguToken"]'`.
the link to [mycloudogu.com](https://my.cloudogu.com/) and to the `about` page should be removed.
If all entries are included in the `etcd` key the `support` group will not be displayed in the warp menu.

Currently, three keys are defined:
* `myCloudogu` - link to the __myCloudogu__ platform.
* `aboutCloudoguToken` - link to the __About__ page of Cloudogu GmbH
* `docsCloudoguComUrl` - link to the documentation space of the Cloudogu ecosystem

> Please note that disabling all regular support entries will make the `Support` entry disappear from the Warp menu.
> I.e. if the above mechanism is used to remap entries into the `Information` category, the remapped entries will no longer be displayed.