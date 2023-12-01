import { EMAIL_INVALID, EMAIL_REQUIRED, RUC_REQUIRED } from "./messages";
export { RUC_PERU_MAX_LENGTH } from './messages';

export const EMAIL_RULES: Array<(value: string) => boolean | string> = [
    (v: string) => !!v || EMAIL_REQUIRED,
    (v: string) => /.+@.+\..+/.test(v) || EMAIL_INVALID,
];

export const RUC_RULES : Array<(value: string) => boolean | string> = [
    (v: string) => !!v || RUC_REQUIRED,
];

