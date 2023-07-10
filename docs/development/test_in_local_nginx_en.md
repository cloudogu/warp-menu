# Copy local warp menu into nginx

## Build warp menu artifacts and copy into local ecosystem
execute inside warp-menu repo
- yarn install
- gulp
- cp -r target/warp <ecosystem/root>

## Copy warp menu artifacts into nginx container
- docker cp warp nginx:/var/www/html/
- docker restart nginx
