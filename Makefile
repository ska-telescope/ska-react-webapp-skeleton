## The following should be standard includes
# include core makefile targets for release management

-include .make/base.mk
-include .make/oci.mk
-include .make/helm.mk
-include .make/k8s.mk
-include .make/js.mk

LOCAL_DEPLOYMENT?=false
ifeq ($(strip $(CI)),)
LOCAL_DEPLOYMENT:=true
endif

LOCAL_IMAGE_TAG?=$(VERSION)-local.c$(shell git rev-parse --short HEAD)

# Override unit test commands to use cypress
JS_TEST_COMMAND=cypress run
JS_TEST_DEFAULT_SWITCHES=\
	--component \
	--headless \
	--config video=false \
	--reporter junit \
	--reporter-options mochaFile=$(JS_BUILD_TESTS_DIRECTORY)/unit-tests-[hash].xml

K8S_WAIT_LABEL_FILTER_ARGS = -l app.kubernetes.io/instance=$(HELM_RELEASE)

ifeq ($(strip $(LOCAL_DEPLOYMENT)),true)
K8S_INGRESS_HOST:=http://localhost
JS_E2E_TEST_BASE_URL:=$(K8S_INGRESS_HOST)/$(KUBE_NAMESPACE)
js-pre-e2e-test: k8s-install-chart-minikube k8s-wait
else
# https is required to use for MSAL to work
JS_E2E_TEST_BASE_URL:=$(patsubst http://%,https://%,$(K8S_INGRESS_HOST))/$(KUBE_NAMESPACE)
K8S_CHART_PARAMS = \
	--set image.repository=$(CI_REGISTRY)/$(CI_PROJECT_NAMESPACE)/$(CI_PROJECT_NAME)/$(CI_PROJECT_NAME) \
	--set image.tag=$(VERSION)-dev.c$(CI_COMMIT_SHORT_SHA)
endif

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
	@rm -f public/env.js src/env.ts
	@export REACT_APP_VERSION=$(VERSION); \
	ENV_TYPE_FILE=env_config/env.conf \
	ENV_JS_OUTPUT_LOCATION=public/env.js \
	/bin/bash env_config/generate_env.sh js; \
	ENV_TYPE_FILE=env_config/env.conf \
	ENV_JS_OUTPUT_LOCATION=src/env.ts \
	bash env_config/generate_env.sh ts;
