import "dotenv/config";

import { CONSTANTS } from "../constant.js";

import { Chroma } from "langchain/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";

async function main() {
  const textSplitter = new CharacterTextSplitter({
    separator: "\n",
    chunkSize: 200,
    chunkOverlap: 0,
  });
  const textLoader = new TextLoader("src/facts/facts.txt");
  const docs = await textLoader.loadAndSplit(textSplitter);
  await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: CONSTANTS.COLLECTION_NAME,
  });
}

main().then(() => process.exit(0));
