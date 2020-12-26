declare module 'slugs' {
    function slug(
        incString: string,
        separator?: string,
        preserved?: string[]
    ): string;

    export = slug;
}
