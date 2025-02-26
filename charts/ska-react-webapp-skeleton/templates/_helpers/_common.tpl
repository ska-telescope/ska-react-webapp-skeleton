{{/*
Chart resource name
*/}}
{{- define "ska-react-webapp-skeleton.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Chart resource full name
*/}}
{{- define "ska-react-webapp-skeleton.fullname" -}}
{{- if .Values.fullnameOverride -}}
  {{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
  {{- $name := default .Chart.Name .Values.nameOverride -}}
  {{- if contains $name .Release.Name -}}
    {{- .Release.Name | trunc 63 | trimSuffix "-" -}}
  {{- else -}}
    {{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
  {{- end -}}
{{- end -}}
{{- end -}}

{{/*
Chart name and version
*/}}
{{- define "ska-react-webapp-skeleton.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Chart version
*/}}
{{- define "ska-react-webapp-skeleton.chartVersion" -}}
{{- .Chart.Version -}}
{{- end -}}

{{/*
Chart app version
*/}}
{{- define "ska-react-webapp-skeleton.appVersion" -}}
{{- .Chart.AppVersion -}}
{{- end -}}

{{/*
Release namespace
*/}}
{{- define "ska-react-webapp-skeleton.namespace" -}}
{{ .Release.Namespace }}
{{- end -}}

{{/*
Image
*/}}
{{- define "ska-react-webapp-skeleton.image" -}}
{{- $tag := coalesce .Values.image.tag (include "ska-react-webapp-skeleton.appVersion" .) -}}
{{- printf "%s:%s" .Values.image.repository $tag  -}}
{{- end -}}

{{/*
Merge util
*/}}
{{- define "merge" -}}
{{- $labels := dict -}}
{{- range . -}}
  {{- $labels = merge $labels (fromYaml .) -}}
{{- end -}}
{{- with $labels -}}
  {{- toYaml $labels -}}
{{- end -}}
{{- end -}}