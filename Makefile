WARP_MENU_VERSION:=v2.0.0
ZIPFILE_NAME:=warp-$(WARP_MENU_VERSION).zip
SHA_FILE_NAME:=$(ZIPFILE_NAME).sha256

.DEFAULT_GOAL:=package

clean-build:
	rm -rf target/warp

clean-zip:
	rm -rf target/warp-*.zip
	rm -rf target/warp-*.zip.sha256

build: clean-build
	vite build

package: build clean-zip
	cd target; zip -r $(ZIPFILE_NAME) warp

signature: package
	cd target; cat $(ZIPFILE_NAME) | sha256sum  | sed 's/-/target\/$(ZIPFILE_NAME)/' > $(SHA_FILE_NAME)

NPM_REGISTRY_RELEASE=ecosystem.cloudogu.com/nexus/repository/npm-releases/
NPM_URL_RELEASE=https://${NPM_REGISTRY_RELEASE}
NPM_REGISTRY_RC=ecosystem.cloudogu.com/nexus/repository/npm-releasecandidates/
NPM_URL_RC=https://${NPM_REGISTRY_RC}

.PHONY gen-npmrc-release:
gen-npmrc-release:
	@rm -f .npmrc
	@echo "email=jenkins@cloudogu.com" >> .npmrc
	@echo "always-auth=true" >> .npmrc
	@echo "//${NPM_REGISTRY_RELEASE}:_auth=\"$(shell bash -c 'read -p "Username: " usrname;read -s -p "Password: " pwd;echo -n "$$usrname:$$pwd" | openssl base64')\"" >> .npmrc
	@echo "@cloudogu:registry=${NPM_URL_RELEASE}" >> .npmrc

.PHONY gen-npmrc-prerelease:
gen-npmrc-prerelease:
	@rm -f .npmrc
	@echo "email=jenkins@cloudogu.com" >> .npmrc
	@echo "always-auth=true" >> .npmrc
	@echo "//${NPM_REGISTRY_RC}:_auth= \"$(shell bash -c 'read -p "Username: " usrname;read -s -p "Password: " pwd;echo -n "$$usrname:$$pwd" | openssl base64')\"" >> .npmrc
	@echo "@cloudogu:registry=${NPM_URL_RC}" >> .npmrc

