// @flow

export type EntityFieldType = 'BOOL' | 'CATEGORICAL' | 'ENUM' | 'XREF' |'MREF' |'ONETOMANY' |'INT' | 'DECIMAL' | 'LONG' |
  'TEXT' | 'SCRIPT'| 'HTML' | 'DATE'| 'DATE_TIME'| 'CATEGORICAL_MREF'| 'STRING'| 'HYPERLINK'| 'EMAIL' | 'FILE'

export type HtmlFieldType = 'radio' | 'select' | 'number' | 'text-area' | 'date' | 'date-time' | 'checkboxes' |
  'text' | 'url' | 'email' | 'file'

export type FormField = {
  type: string,
  id: string,
  label: string,
  required: mixed,
  disabled: mixed,
  visible: mixed,
  inputProperties?: mixed,
  validators: Array<mixed>
}
