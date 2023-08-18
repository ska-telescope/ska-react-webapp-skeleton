## The following should be standard includes
# include core makefile targets for release management
-include .make/base.mk
-include .make/docs.mk
-include .make/oci.mk

docs-pre-build:
	pip install -r docs/requirements.txt
	
# include your own private variables for custom deployment configuration
-include PrivateRules.mak
