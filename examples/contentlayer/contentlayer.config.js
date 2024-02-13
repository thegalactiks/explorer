import {
  ArticleDocumentType,
  OrganizationDocumentType,
  PageDocumentType,
  PersonDocumentType,
  PlaceDocumentType,
  ProductDocumentType,
  WebsiteDocumentType,
  WebpageElementDocumentType,
} from '@galactiks/contentlayer';
import { makeSource } from 'contentlayer/source-files';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [
    ArticleDocumentType,
    OrganizationDocumentType,
    PageDocumentType,
    PersonDocumentType,
    PlaceDocumentType,
    ProductDocumentType,
    WebsiteDocumentType,
    WebpageElementDocumentType,
  ],
  mdx: {},
  disableImportAliasWarning: true,
});

export default contentLayerConfig;
