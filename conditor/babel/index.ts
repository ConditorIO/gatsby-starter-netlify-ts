import * as BabelTypes from "@babel/types";
import * as Babel from "@babel/core";
import * as fs from "fs";
import * as path from "path";

const fieldNames = [
  "Boolean",
  "Collection",
  "Date",
  "DateTime",
  "File",
  "Hidden",
  "Image",
  "List",
  "Map",
  "Markdown",
  "Number",
  "Object",
  "Select",
  "String",
  "Text"
];

const nestedTypes = ["Collection", "List", "Object"];

interface ImportMapEntry {
  file: string;
  isDefault: boolean;
  origName?: string;
}

interface CMSCollection extends NestedType {
  label?: string;
}

interface NestedType {
  name: string;
  fields: Record<string, FieldType>;
  subComponents: Babel.Node[];
}

interface FieldDecl {
  name: string;
  widget: string;
  label?: string;
}

interface ListDecl extends FieldDecl {
  fields?: Record<string, FieldType>;
}

type FieldType = FieldDecl & ListDecl;

const getStringAttr = (node: BabelTypes.JSXElement, name: string) => {
  const attr = node.openingElement.attributes.find(
    attr => attr.type === "JSXAttribute" && attr.name.name === name
  );
  if (!attr || attr.type === "JSXSpreadAttribute") {
    return undefined;
  }
  if (!attr.value || attr.value.type !== "StringLiteral") {
    return undefined;
  }
  return attr.value.value;
};

const makeField = (node: BabelTypes.JSXElement): FieldDecl => {
  const name = getStringAttr(node, "name");
  if (!name) {
    throw new Error("Unexpected: missing name on node");
  }
  const ident = node.openingElement.name;
  if (ident.type === "JSXMemberExpression") {
    throw new Error("JSX Expressions for JSX Identifiers are not supported");
  }
  const widget = ident.name.toLowerCase();
  const label = getStringAttr(node, "label");
  return { name, label, widget };
};

const FieldFinder = () => {
  const importMap: {
    [k: string]: ImportMapEntry;
  } = {};
  const topScopeCollection: CMSCollection = {
    name: "",
    fields: {},
    subComponents: []
  };
  const nestingStack: NestedType[] = [];
  const collections: Record<string, CMSCollection> = {};

  return {
    visitor: {
      Program: {
        exit({ node, parent }: Babel.NodePath<BabelTypes.Program>) {
          if (Object.keys(collections).length === 0) {
            return;
          }
          const filename = path.basename(this.file.opts.filename, ".tsx");
          fs.writeFileSync(
            `cms-fields-${filename}.json`,
            JSON.stringify(
              collections,
              (key, value) => {
                if (key === "subComponents") {
                  return undefined;
                }
                return value;
              },
              2
            )
          );
        }
      },
      ImportDeclaration({
        node
      }: Babel.NodePath<BabelTypes.ImportDeclaration>) {
        if (!node.source.value.startsWith(".")) {
          return;
        }
        for (const spec of node.specifiers) {
          if (spec.type === "ImportNamespaceSpecifier") {
            continue;
          }
          const map: ImportMapEntry = {
            file: node.source.value,
            isDefault: spec.type === "ImportDefaultSpecifier"
          };
          if (spec.type !== "ImportDefaultSpecifier") {
            map.origName = spec.imported.name;
          }
          importMap[spec.local.name] = map;
        }
        return;
      },
      JSXElement: {
        enter({ node }: Babel.NodePath<BabelTypes.JSXElement>) {
          const ident = node.openingElement.name;
          if (
            ident.type !== "JSXIdentifier" ||
            !nestedTypes.includes(ident.name)
          ) {
            return;
          }
          const isCollection = ident.name === "Collection";
          const name = getStringAttr(node, "name");
          if (!name) {
            console.warn(`Ignoring ${ident.name} without name`);
            return;
          }
          const field = {
            name,
            fields: {},
            subComponents: []
          };
          if (!isCollection) {
            nestingStack.push(field);
            return;
          }
          if (!(name in collections)) {
            const label = getStringAttr(node, "label");
            collections[name] = {
              ...field,
              label
            };
          }
          nestingStack.push(collections[name]);
        },
        exit({ node }: Babel.NodePath<BabelTypes.JSXElement>) {
          const ident = node.openingElement.name;
          if (
            ident.type !== "JSXIdentifier" ||
            ident.name[0] === ident.name[0].toLowerCase()
          ) {
            return;
          }
          const isCollection = ident.name === "Collection";
          const isNested = nestedTypes.includes(ident.name);
          const isField = fieldNames.includes(ident.name);
          const fieldName = getStringAttr(node, "name");

          if (!isField) {
            const parent =
              nestingStack.length === 0
                ? topScopeCollection
                : nestingStack[nestingStack.length - 1];
            parent.subComponents.push(node);
            return;
          }

          if (!fieldName) {
            console.warn("Ignoring: missing field name");
            return;
          }
          const field: FieldType = makeField(node);

          if (nestingStack.length === 0) {
            if (isNested) {
              console.warn(`Ignoring: Invalid ${ident.name} ending`);
              return;
            }
            topScopeCollection.fields[fieldName] = field;
            return;
          }

          if (isNested) {
            const stackTop = nestingStack.pop();
            if (fieldName !== stackTop!.name) {
              console.warn(
                `Ignoring: Closing wrong nested type. Expected ${
                  stackTop!.name
                }, got ${fieldName}.`
              );
              return;
            }
            if (isCollection) {
              return;
            }
            field.fields = stackTop!.fields;
          }
          const parent = nestingStack[nestingStack.length - 1];
          parent.fields[fieldName] = field;
        }
      }
    }
  };
};

export default FieldFinder;
