![Cloudogu logo](https://cloudogu.com/images/logo.png)
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
### What is Cloudogu?
Cloudogu is an open platform, which lets you choose how and where your team creates great software. Each service or tool is delivered as a [Dōgu](https://translate.google.com/?text=D%26%23x014d%3Bgu#ja/en/%E9%81%93%E5%85%B7), a Docker container, that can be easily integrated in your environment just by pulling it from our registry. We have a growing number of ready-to-use Dōgus, e.g. SCM-Manager, Jenkins, Nexus, SonarQube, Redmine and many more. Every Dōgu can be tailored to your specific needs. You can even bring along your own Dōgus! Take advantage of a central authentication service, a dynamic navigation, that lets you easily switch between the web UIs and a smart configuration magic, which automatically detects and responds to dependencies between Dōgus. Cloudogu is open source and it runs either on-premise or in the cloud. Cloudogu is developed by Cloudogu GmbH under [MIT License](https://cloudogu.com/license.html) and it runs either on-premise or in the cloud.

### How to get in touch?
Want to talk to the Cloudogu team? Need help or support? There are several ways to get in touch with us:

* [Website](https://cloudogu.com)
* [Mailing list](https://groups.google.com/forum/#!forum/cloudogu)
* [Email hello@cloudogu.com](mailto:hello@cloudogu.com)

---
&copy; 2016 Cloudogu GmbH - MADE WITH :heart: FOR DEV ADDICTS. [Legal notice / Impressum](https://cloudogu.com/imprint.html)
