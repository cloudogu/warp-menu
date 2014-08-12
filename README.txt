# copy this directory to /var/www/warp
# enable mod_substitute
a2enmod substitute
# create substitute configuration
cat > /etc/apache2/conf.d/substitute.conf << EOF
<Location />
  RequestHeader unset Accept-Encoding
  AddOutputFilterByType SUBSTITUTE text/html
  Substitute "s|</body>|<script \"text/javascript\">(function(){var s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.src = '/warp/warp.js';var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();</script>|in
</Location>
EOF
