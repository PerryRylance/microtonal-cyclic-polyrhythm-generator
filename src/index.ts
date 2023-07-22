import { writeFileSync } from "fs";
import { File, WriteStream } from "@perry-rylance/midi"

import Generator from "./Generator.js";

const generator: Generator  = new Generator();
const file: File 			= generator.generate();
const stream: WriteStream	= new WriteStream();

file.writeBytes(stream);

const buffer				= Buffer.from(stream.toArrayBuffer());

writeFileSync("output.mid", buffer);