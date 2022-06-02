WARP_MENU_VERSION:=v1.6.0
ZIPFILE_NAME:=warp-$(WARP_MENU_VERSION).zip

.DEFAULT_GOAL:=package

clean-build:
	rm -rf target/warp

clean-zip:
	rm -rf target/warp-*.zip

build: clean-build
	gulp

package: build clean-zip
	cd target; zip -r $(ZIPFILE_NAME) warp

