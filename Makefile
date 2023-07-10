WARP_MENU_VERSION:=v1.7.3
ZIPFILE_NAME:=warp-$(WARP_MENU_VERSION).zip
SHA_FILE_NAME:=$(ZIPFILE_NAME).sha256

.DEFAULT_GOAL:=package

clean-build:
	rm -rf target/warp

clean-zip:
	rm -rf target/warp-*.zip
	rm -rf target/warp-*.zip.sha256

build: clean-build
	gulp

package: build clean-zip
	cd target; zip -r $(ZIPFILE_NAME) warp

signature: package
	cd target; cat $(ZIPFILE_NAME) | sha256sum  | sed 's/-/target\/$(ZIPFILE_NAME)/' > $(SHA_FILE_NAME)


