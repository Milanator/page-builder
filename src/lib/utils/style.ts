import { BackgroundOptions, BorderRadiusOptions, MarginOptions } from "./types";

export const marginStyles = (options: MarginOptions) => ({
    marginLeft: options.marginLeft ? `${options.marginLeft}%` : undefined,
    marginRight: options.marginRight ? `${options.marginRight}%` : undefined,
    marginTop: options.marginTop ? `${options.marginTop}%` : undefined,
    marginBottom: options.marginBottom ? `${options.marginBottom}%` : undefined,
})

export const borderRadiusStyles = (options: BorderRadiusOptions) => ({
    borderBottomLeftRadius: options.borderBottomLeftRadius ? `${options.borderBottomLeftRadius}px` : undefined,
    borderBottomRightRadius: options.borderBottomRightRadius ? `${options.borderBottomRightRadius}px` : undefined,
    borderTopRightRadius: options.borderTopRightRadius ? `${options.borderTopRightRadius}px` : undefined,
    borderTopLeftRadius: options.borderTopLeftRadius ? `${options.borderTopLeftRadius}px` : undefined,
})

export const background = (options: BackgroundOptions) => ({
    backgroundImage: `url(${options.backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
})