interface Compare {
  (version1: string, version2: string): number;
}

declare var compare: Compare;

declare module 'compare-version' {
  export = compare;
}
