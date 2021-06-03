![Cloudogu logo](https://cloudogu.com/images/logo.png)

[![GitHub license](https://img.shields.io/github/license/cloudogu/warp-menu.svg)](https://github.com/cloudogu/warp-menu/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/cloudogu/warp-menu.svg)](https://github.com/cloudogu/warp-menu/releases)

# Warp-menu
https://cloudogu.com

Inside this repository lies the code for the Cloudogu warp-menu used to switch between single Dōgus in the browser.

### Quick start
* Install dependencies with [npm](https://www.npmjs.com/) `npm install`
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
* Install dependencies with [npm](https://www.npmjs.com/) `npm install`
* start web server with livereload on port 8000 with `gulp serve`
* execute jshint by typing `gulp jshint`
* release build with `gulp`

---
### What is the Cloudogu EcoSystem?
The Cloudogu EcoSystem is an open platform, which lets you choose how and where your team creates great software. Each service or tool is delivered as a Dogu, a Docker container. Each Dogu can easily be integrated in your environment just by pulling it from our registry. We have a growing number of ready-to-use Dogus, e.g. SCM-Manager, Jenkins, Nexus, SonarQube, Redmine and many more. Every Dogu can be tailored to your specific needs. Take advantage of a central authentication service, a dynamic navigation, that lets you easily switch between the web UIs and a smart configuration magic, which automatically detects and responds to dependencies between Dogus. The Cloudogu EcoSystem is open source and it runs either on-premises or in the cloud. The Cloudogu EcoSystem is developed by Cloudogu GmbH under [MIT License](https://cloudogu.com/license.html).

### How to get in touch?
Want to talk to the Cloudogu team? Need help or support? There are several ways to get in touch with us:

* [Website](https://cloudogu.com)
* [myCloudogu-Forum](https://forum.cloudogu.com/topic/34?ctx=1)
* [Email hello@cloudogu.com](mailto:hello@cloudogu.com)

---
&copy; 2020 Cloudogu GmbH - MADE WITH :heart:&nbsp;FOR DEV ADDICTS. [Legal notice / Impressum](https://cloudogu.com/imprint.html)
