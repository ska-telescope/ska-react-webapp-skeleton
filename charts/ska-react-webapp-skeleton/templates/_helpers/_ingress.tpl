{{/*
Ingress annotations
*/}}
{{- define "ska-react-webapp-skeleton.ingress.annotations" -}}
{{- template "merge" (list
  (toYaml .Values.ingress.extraAnnotations)
  (toYaml .Values.ingress.annotations)
) -}}
{{- end -}}
