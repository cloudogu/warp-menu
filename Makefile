WARP_MENU_VERSION:=v1.7.3
ZIPFILE_NAME:=warp-$(WARP_MENU_VERSION).zip
SHA_FILE_NAME:=$(ZIPFILE_NAME).sha256
UI_SRC=src
NPM_REGISTRY_RELEASE=https://ecosystem.cloudogu.com/nexus/repository/npm-releases/
NPM_REGISTRY_RC=https://ecosystem.cloudogu.com/nexus/repository/npm-releasecandidates/

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

.PHONY gen-npmrc-release:
gen-npmrc-release: info
	@rm -f ${UI_SRC}/.npmrc
	@echo "email=jenkins@cloudogu.com" >> ${UI_SRC}/.npmrc
	@echo "always-auth=true" >> ${UI_SRC}/.npmrc
	@echo "_auth=$(shell bash -c 'read -p "Username: " usrname;read -s -p "Password: " pwd;echo -n "$$usrname:$$pwd" | openssl base64')" >> ${UI_SRC}/.npmrc
	@echo "@cloudogu:registry=${NPM_REGISTRY_RELEASE}" >> ${UI_SRC}/.npmrc

.PHONY gen-npmrc-prerelease:
gen-npmrc-prerelease: info
	@rm -f ${UI_SRC}/.npmrc
	@echo "email=jenkins@cloudogu.com" >> ${UI_SRC}/.npmrc
	@echo "always-auth=true" >> ${UI_SRC}/.npmrc
	@echo "_auth=$(shell bash -c 'read -p "Username: " usrname;read -s -p "Password: " pwd;echo -n "$$usrname:$$pwd" | openssl base64')" >> ${UI_SRC}/.npmrc
	@echo "@cloudogu:registry=${NPM_REGISTRY_RC}" >> ${UI_SRC}/.npmrc

