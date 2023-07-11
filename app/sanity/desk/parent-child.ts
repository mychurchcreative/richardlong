// ./src/desk-structure/parentChild.js

import { DocumentStore } from 'sanity';
import { SanityDocument } from '@sanity/client';
import { StructureBuilder } from 'sanity/desk';
import { map } from 'rxjs/operators';
import { RiListUnordered } from 'react-icons/ri';
import { apiVersion } from '../projectDetails';

export default function parentChild(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`;
  const query = `*[${filter}]{ _id, title }`;
  const options = apiVersion;

  return S.listItem()
    .title('Categories')
    .icon(RiListUnordered)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title('All Categories')
            .menuItems([
              S.menuItem()
                .title('Add')
                .icon(RiListUnordered)
                .intent({ type: 'create', params: { type: schemaType } }),
            ])
            .items([
              // Create a List Item for all documents
              // Useful for searching
              S.listItem()
                .title('All Categories')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Parent Categories')
                    .filter(filter)
                    // Use this list for displaying from search results
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' && params.type === 'category'
                    )
                    .child((id) =>
                      S.document().documentId(id).schemaType(schemaType)
                    )
                ),
              S.divider(),
              // Create a List Item for Parents
              // To display all documents that do not have parents
              S.listItem()
                .title('Parent Categories')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Parent Categories')
                    .filter(filter)
                    // Use this list for creating from parents menu
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'create' &&
                        params.template === 'category'
                    )
                    .child((id) =>
                      S.document().documentId(id).schemaType(schemaType)
                    )
                ),
              S.divider(),
              // Create a List Item for each parent
              // To display all its child documents
              ...parents.map((parent: SanityDocument) =>
                S.listItem({
                  id: parent._id,
                  title: parent.title,
                  schemaType,
                  child: () =>
                    S.documentTypeList(schemaType)
                      .title('Children Categories')
                      .filter(
                        `_type == $schemaType && parent._ref == $parentId`
                      )
                      .params({ schemaType, parentId: parent._id })
                      // Use this list for creating from child menu
                      .canHandleIntent(
                        (intentName, params) =>
                          intentName === 'create' &&
                          params.template === 'category-child'
                      )
                      .initialValueTemplates([
                        S.initialValueTemplateItem('category-child', {
                          parentId: parent._id,
                        }),
                      ]),
                })
              ),
            ])
        )
      )
    );
}
