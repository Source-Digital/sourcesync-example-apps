import { buildActivation } from "sourcesync-sdk/render-activation-web"

export function createActivation(opts: {
  id: string,
  label: string,
  templateType?: 'display' | 'action'
  // TODO export a better type for this
  instance: Parameters<(ReturnType<typeof buildActivation>)['addInstance']>[0]
}) {
  const templateType = opts.templateType ?? 'display'
  const template = templateType === 'display' ? {
    name: 'display',
    settings: {
      label: {
        text: opts.label
      }
    }
  } : {
    name: 'action',
    settings: {
      title: opts.label
    }
  }
  return buildActivation()
    .id(opts.id)
    .preview.template([template])
    .addInstance(opts.instance)
  .build()
}