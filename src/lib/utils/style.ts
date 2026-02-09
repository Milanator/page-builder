import { VerticalAlign } from "./blocks/ColumnBlock";
import { BackgroundOptions, BorderRadiusOptions, MarginOptions, PaddingOptions } from "./types";

export const marginStyles = (options: MarginOptions) => ({
    marginLeft: options.marginLeft ? `${options.marginLeft}%` : undefined,
    marginRight: options.marginRight ? `${options.marginRight}%` : undefined,
    marginTop: options.marginTop ? `${options.marginTop}%` : undefined,
    marginBottom: options.marginBottom ? `${options.marginBottom}%` : undefined,
})

export const paddingStyles = (options: PaddingOptions) => ({
    paddingLeft: options.paddingLeft ? `${options.paddingLeft}%` : undefined,
    paddingRight: options.paddingRight ? `${options.paddingRight}%` : undefined,
    paddingTop: options.paddingTop ? `${options.paddingTop}%` : undefined,
    paddingBottom: options.paddingBottom ? `${options.paddingBottom}%` : undefined,
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

export const backgroundColorOverlay = (options: { backgroundColor?: string | null }) => (options?.backgroundColor ? {
    boxShadow: `inset 0 0 0 1000px ${options.backgroundColor}`
} : {})

export const width = (options: { width: string | number | null }) => ({
    width: options?.width ? `${options.width}%` : '100%',
})

export const verticalAlign = (options: { verticalAlign: VerticalAlign }) => ({
    alignItems: options?.verticalAlign ? options?.verticalAlign : 'start',
})