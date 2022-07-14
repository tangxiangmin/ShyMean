declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

interface Window {
    INIT_DATA: Record<string, any>;
}
