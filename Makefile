## The following should be standard includes
# include core makefile targets for release management
-include .make/base.mk
-include .make/oci.mk
-include .make/helm.mk
-include .make/k8s.mk
-include .make/js.mk

js-install-pre:
	@echo "xpto"
#@npm config set registry https://registry.npmjs.org/
