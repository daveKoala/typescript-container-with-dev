type OptionKey = "body" | "params" | "query";

export type List<T> = {
  [K in OptionKey]?: T;
};

export type AllowedSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;

export type ValidateFunction =
  | ((req: Request) => AllowedSchema)
  | AllowedSchema;
