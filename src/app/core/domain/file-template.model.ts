
// type anyOption = {
//     [key: string]: string | boolean | undefined
// }
export interface TemplateModel {
  name: string;
  required: string;
  type: string;
  businessRules: string;
  edit: boolean;
  check: boolean;
}
