## The following should be standard includes
# include core makefile targets for release management

-include .make/base.mk
-include .make/oci.mk
-include .make/helm.mk
-include .make/k8s.mk
-include .make/js.mk

JS_TEST_COMMAND=cypress run
JS_TEST_DEFAULT_SWITCHES=--component --headless --browser chrome --config video=false --reporter junit --reporter-options mochaFile=$(JS_BUILD_TESTS_DIRECTORY)/unit-tests-[hash].xml

ifneq ($(findstring $(CI_JOB_NAME),js-e2e-deploy k8s-test),)
K8S_CHART_PARAMS = \
	--set image.repository=$(CI_REGISTRY)/ska-telescope/ska-react-webapp-skeleton \
	--set image.tag=$(VERSION)-dev.c$(CI_COMMIT_SHORT_SHA)
endif

k8s-do-test: js-do-test

LOCAL_IMAGE_TAG?=$(VERSION)-local.c$(shell git rev-parse --short HEAD)
# Build and deploy in the local minikube cluster
k8s-do-install-chart-minikube:
	@KUBECTL_CONTEXT=$$(kubectl config view -o json | jq -r '.["current-context"]'); \
	if [ "$$KUBECTL_CONTEXT" != "minikube" ]; then \
		echo "Not running against a minikube cluster. Exiting ..."; \
		exit 1; \
	fi
	@eval $$(minikube docker-env); \
	$(MAKE) \
	OCI_SKIP_PUSH=true \
	OCI_BUILD_ADDITIONAL_ARGS="-t $(OCI_IMAGE):$(LOCAL_IMAGE_TAG)" \
	oci-build-all;
	@$(MAKE) \
	K8S_CHART_PARAMS="--set image.repository=$(OCI_IMAGE) --set image.tag=$(LOCAL_IMAGE_TAG)" \
	k8s-install-chart

k8s-install-chart-minikube: k8s-pre-install-chart k8s-do-install-chart-minikube k8s-post-install-chart

dev-local-env:
	-rm public/env.js src/env.ts
	ENV_TYPE_FILE=env_scripts/env_config \
	ENV_JS_OUTPUT_LOCATION=public/env.js \
		bash env_scripts/env_config.sh js
	ENV_TYPE_FILE=env_scripts/env_config \
	ENV_JS_OUTPUT_LOCATION=src/env.ts \
		bash env_scripts/env_config.sh ts
