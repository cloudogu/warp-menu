# Der Releaseablauf

* Neue NEWVERSION anhand von [semantic versioning](https://semver.org/) ausdenken
* `git checkout develop && git pull`
* `git flow release start NEWVERSION`
    * NEWVERSION ist bspw. v1.15.1
    * ggf. wird noch ein `git flow init` nötig
        * 'production releases' auf master setzen
            * `Branch name for production releases: [] master`
        * default-Werte bei allen anderen Angaben akzeptieren
* WARP_MENU_VERSION=NEWVERSION in Makefile setzen
* `git add Makefile`
* `git commit -m "Bump version"`
* `CHANGELOG.md` pflegen (nach [keepachangelog.com](https://keepachangelog.com/en/1.0.0/))
* `git add CHANGELOG.md && git commit -m "Update changelog"`
* `git flow release finish -s NEWVERSION`
* `git checkout NEWVERSION`
* `git push origin master`
* `git push origin develop --tags`
* Release auf Github mit dem neuen Tag anlegen (Siehe auch hier: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
* `make signature`
* Die `warp-NEWVERSION.zip` und die `warp-NEWVERSION.zip.sha256` an das Release als Anhang hinzufügen