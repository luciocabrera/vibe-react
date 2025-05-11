import { Children, cloneElement, isValidElement, type ReactNode } from "react";

/**
 * Safely inject props into React children elements (ignores fragments, strings, etc.)
 * @param children ReactNode
 * @param injectedProps Props to inject into valid React elements
 * @returns Modified children with injected props
 */
export const injectPropsToChildren = (
    children: ReactNode,
    injectedProps: Record<string, any>
): ReactNode => {
    return Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...injectedProps,
                ...(typeof child.props === "object" && child.props !== null ? child.props : {}), // child props take precedence to avoid overrides
            });
        }
        return child;
    });
}
