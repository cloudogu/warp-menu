installation
============

# install dependencies
npm install
# execute gulp
gulp
# copy target directory to /var/www/warp
# enable mod_substitute
a2enmod substitute
# create substitute configuration
cat > /etc/apache2/conf.d/substitute.conf << EOF
<Location />
  AddOutputFilterByType SUBSTITUTE text/html
  Substitute "s|</body>|<script \"text/javascript\">(function(){var s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.src = '/warp/warp.js';var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();</script></body>|in
</Location>
EOF

development
============

# install dependencies
npm install

# start webserver with livereload on port 8000
gulp serve

# execute jshint
gulp jshint

# release build
gulp
