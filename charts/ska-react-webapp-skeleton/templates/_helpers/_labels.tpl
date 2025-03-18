{{- define "ska-react-webapp-skeleton.labels.helm" -}}
helm.sh/chart: {{ template "ska-react-webapp-skeleton.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "ska-react-webapp-skeleton.labels.version" -}}
app.kubernetes.io/version: {{ template "ska-react-webapp-skeleton.appVersion" . }}
app.kubernetes.io/chartVersion: {{ template "ska-react-webapp-skeleton.chartVersion" . }}
{{- end -}}

{{- define "ska-react-webapp-skeleton.matchLabels" -}}
app.kubernetes.io/part-of: {{ template "ska-react-webapp-skeleton.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "ska-react-webapp-skeleton.labels" -}}
{{- template "merge" (list
  (include "ska-react-webapp-skeleton.labels.helm" .)
  (include "ska-react-webapp-skeleton.labels.version" .)
  (include "ska-react-webapp-skeleton.matchLabels" .)
  (toYaml .Values.labels)
) -}}
{{- end -}}
