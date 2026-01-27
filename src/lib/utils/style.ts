import { MarginOptions } from "./types";

export const marginStyles = (options: MarginOptions) => ({
    marginLeft: options.marginLeft ? `${options.marginLeft}%` : undefined,
    marginRight: options.marginRight ? `${options.marginRight}%` : undefined,
    marginTop: options.marginTop ? `${options.marginTop}%` : undefined,
    marginBottom: options.marginBottom ? `${options.marginBottom}%` : undefined,
})