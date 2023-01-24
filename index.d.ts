declare type Collection = {
  getAll: () => Array<CollectionItem>;
};

declare type CollectionItem = {
  data: CollectionData;
  date: Date;
  filePathStem: string;
  fileSlug: string;
  inputPath: string;
  outputPath: string;
  template: Template;
  templateContent: string;
  url: string;
};

declare type CollectionData = {
  collections: Object;
  images?: Array<PostImage>;
  layout: string;
  metadata: Object;
  navtitle?: string;
  page: Object;
  pkg: Object;
  tags?: Array<string>;
  templateClass: string;
  title: string;
};

declare type PostImage = {
  alt: string;
  imageUrl: string;
  unsplashUrl: string;
};

declare type Template = {
  extraOutputSubdirectory: string;
  filePathStem: string;
  fileSlugStr: string;
  inputContent: string;
  inputDir: string;
  inputPath: string;
  isDryRun: boolean;
  isVerbose: boolean;
  outputDir: string;
  paginationData: Object;
  parsed: Object;
  plugins: Object;
  skippedCount: number;
  wrapWithLayouts: boolean;
  writeCount: number;
};

declare type EleventyConfig = {
  addCollection: (
    name: string,
    collection: Array<string> | ((collection: Collection) => Array<string>),
  ) => void;
  addFilter: (
    name: string,
    filterFunction: (...args: any) => string | string[],
  ) => void;
  addPlugin: (plugin: unknown, options?: Record<string, unknown>) => void;
  addShortcode: (
    name: string,
    shortcodeFunction: (...args: any) => string,
  ) => void;
  addTransform: (
    name: string,
    transformFunction: (content: string, outputPath: string) => string,
  ) => void;
  addLayoutAlias: (alias: string, path: string) => void;
  addPassthroughCopy: (glob: string) => void;
  setDataDeepMerge: (value: boolean) => void;
  setLibrary: (name: string, renderer: any) => void;
  addWatchTarget: (glob: string) => void;
  setBrowserSyncConfig: (config: {
    callbacks: { ready: (error: Error, browserSync: any) => void };
  }) => void;
};

declare type EleventyFinalConfig = {
  templateFormats: Array<string>;
  pathPrefix: string;
  markdownTemplateEngine: string;
  htmlTemplateEngine: string;
  dataTemplateEngine: string;
  passthroughFileCopy: boolean;
  dir: {
    input: string;
    includes: string;
    data: string;
    output: string;
  };
};
