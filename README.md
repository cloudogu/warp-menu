# Warp-menu
https://cloudogu.com

Inside this repository lies the code for the Cloudogu warp-menu used to switch between single Dogus in the browser.

### Quick start
* Install dependencies with [yarn]([https://www.npmjs.com/](https://yarnpkg.com/)) `yarn install` (Node v12.22.9 works)
* Execute [gulp](http://gulpjs.com/) `gulp`
* Copy the target directory to `/var/www/warp`
* Enable mod_substitute with `a2enmod substitute`
* Create the following substitute configuration:
```
cat > /etc/apache2/conf.d/substitute.conf << EOF
<Location />
  AddOutputFilterByType SUBSTITUTE text/html
  Substitute "s|</body>|<script \"text/javascript\">(function(){var s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.src = '/warp/warp.js';var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();</script></body>|in
</Location>
EOF
```

### Development
* Install dependencies with [yarn]([https://www.npmjs.com/](https://yarnpkg.com/)) `yarn install` (Node v12.22.9 works)
* start web server with livereload on [port 8000](http://localhost:8000) with `gulp serve` 
* execute jshint by typing `gulp jshint`
* release build with `gulp`

## What is the Cloudogu EcoSystem?
The Cloudogu EcoSystem is an open platform, which lets you choose how and where your team creates great software. Each service or tool is delivered as a Dogu, a Docker container. Each Dogu can easily be integrated in your environment just by pulling it from our registry.

We have a growing number of ready-to-use Dogus, e.g. SCM-Manager, Jenkins, Nexus Repository, SonarQube, Redmine and many more. Every Dogu can be tailored to your specific needs. Take advantage of a central authentication service, a dynamic navigation, that lets you easily switch between the web UIs and a smart configuration magic, which automatically detects and responds to dependencies between Dogus.

The Cloudogu EcoSystem is open source and it runs either on-premises or in the cloud. The Cloudogu EcoSystem is developed by Cloudogu GmbH under [AGPL-3.0-only](https://spdx.org/licenses/AGPL-3.0-only.html).

## License
Copyright © 2020 - present Cloudogu GmbH
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see https://www.gnu.org/licenses/.
See [LICENSE](LICENSE) for details.


---
MADE WITH :heart:&nbsp;FOR DEV ADDICTS. [Legal notice / Imprint](https://cloudogu.com/en/imprint/?mtm_campaign=ecosystem&mtm_kwd=imprint&mtm_source=github&mtm_medium=link)

